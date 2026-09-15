"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import { getDistrictCatalog } from "@/lib/district-members/catalog";
import { LATIN_SCRIPT_MESSAGE_BN } from "@/lib/district-members/latin-script";
import { DEFAULT_DISTRICT_ID } from "@/lib/district-members/types";
import type { DistrictStatus } from "@/content/presence/districts";

type AdminMember = {
  id: string;
  district_id: string;
  slug: string;
  full_name: string;
  photo_path: string | null;
  designation: string | null;
  village: string | null;
  block: string | null;
  area: string | null;
  bio: string | null;
  category: string | null;
  display_order: number;
  is_published: boolean;
  is_archived: boolean;
};

type FormState = {
  full_name: string;
  designation: string;
  village: string;
  block: string;
  area: string;
  bio: string;
  category: string;
  is_published: boolean;
};

const EMPTY_FORM: FormState = {
  full_name: "",
  designation: "",
  village: "",
  block: "",
  area: "",
  bio: "",
  category: "",
  is_published: false,
};

const KEY_STORAGE = "bks-admin-key";
const DISTRICT_STORAGE = "bks-admin-district-id";
const keyListeners = new Set<() => void>();

function keySubscribe(cb: () => void) {
  keyListeners.add(cb);
  return () => {
    keyListeners.delete(cb);
  };
}

function keySnapshot(): string {
  try {
    return window.sessionStorage.getItem(KEY_STORAGE) ?? "";
  } catch {
    return "";
  }
}

function writeStoredKey(value: string) {
  try {
    if (value) window.sessionStorage.setItem(KEY_STORAGE, value);
    else window.sessionStorage.removeItem(KEY_STORAGE);
  } catch {
    /* ignore */
  }
  for (const cb of keyListeners) cb();
}

function readStoredDistrict(): string {
  try {
    return window.sessionStorage.getItem(DISTRICT_STORAGE) || DEFAULT_DISTRICT_ID;
  } catch {
    return DEFAULT_DISTRICT_ID;
  }
}

function writeStoredDistrict(id: string) {
  try {
    window.sessionStorage.setItem(DISTRICT_STORAGE, id);
  } catch {
    /* ignore */
  }
}

function memberToForm(m: AdminMember): FormState {
  return {
    full_name: m.full_name,
    designation: m.designation ?? "",
    village: m.village ?? "",
    block: m.block ?? "",
    area: m.area ?? "",
    bio: m.bio ?? "",
    category: m.category ?? "",
    is_published: m.is_published,
  };
}

const catalog = getDistrictCatalog();

export default function DistrictMembersAdmin() {
  const key = useSyncExternalStore(keySubscribe, keySnapshot, () => "");
  const [keyInput, setKeyInput] = useState("");
  const [districtId, setDistrictId] = useState<string>(DEFAULT_DISTRICT_ID);
  const [districtStatus, setDistrictStatus] = useState<DistrictStatus>("upcoming");
  const [items, setItems] = useState<AdminMember[] | null>(null);
  const [counts, setCounts] = useState({ total: 0, published: 0, draft: 0 });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");
  const [mode, setMode] = useState<"list" | "create" | "edit">("list");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [dbConfigured, setDbConfigured] = useState(true);

  useEffect(() => {
    setDistrictId(readStoredDistrict());
  }, []);

  const selectedDistrict = useMemo(
    () => catalog.find((d) => d.id === districtId) ?? catalog[0],
    [districtId],
  );

  const loadPresence = useCallback(
    async (adminKey: string, id: string) => {
      try {
        const res = await fetch("/api/admin/district-presence", {
          headers: { "x-admin-key": adminKey },
        });
        if (!res.ok) return;
        const body = (await res.json()) as {
          items: { district_id: string; status: DistrictStatus }[];
        };
        const row = body.items?.find((x) => x.district_id === id);
        if (row?.status) setDistrictStatus(row.status);
        else {
          const fallback = catalog.find((d) => d.id === id)?.status;
          if (fallback) setDistrictStatus(fallback);
        }
      } catch {
        /* ignore */
      }
    },
    [],
  );

  const load = useCallback(
    async (adminKey: string, id: string) => {
      setLoading(true);
      setError("");
      try {
        const params = new URLSearchParams({
          district_id: id,
          status: statusFilter,
        });
        if (search.trim()) params.set("q", search.trim());
        const res = await fetch(`/api/admin/district-members?${params}`, {
          headers: { "x-admin-key": adminKey },
        });
        if (res.status === 401) {
          writeStoredKey("");
          throw new Error("অ্যাডমিন কী সঠিক নয়।");
        }
        if (res.status === 503) {
          setDbConfigured(false);
          setItems([]);
          setCounts({ total: 0, published: 0, draft: 0 });
          const body = await res.json().catch(() => ({}));
          setError(
            body?.messageBn ||
              "ডাটাবেস এখনো সংযুক্ত নয়। মাইগ্রেশন প্রয়োগের পর কাজ করবে।",
          );
          return;
        }
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body?.messageBn || body?.error || "তথ্য লোড করা যায়নি।");
        }
        setDbConfigured(true);
        const body = (await res.json()) as {
          items: AdminMember[];
          counts: { total: number; published: number; draft: number };
        };
        setItems(body.items);
        setCounts(body.counts);
        await loadPresence(adminKey, id);
      } catch (err) {
        setError(err instanceof Error ? err.message : "তথ্য লোড করা যায়নি। আবার চেষ্টা করুন।");
      } finally {
        setLoading(false);
      }
    },
    [search, statusFilter, loadPresence],
  );

  useEffect(() => {
    if (!key) return;
    const t = setTimeout(() => void load(key, districtId), 0);
    return () => clearTimeout(t);
  }, [key, load, districtId]);

  useEffect(() => {
    if (!photoFile) {
      setPhotoPreview(null);
      return;
    }
    const url = URL.createObjectURL(photoFile);
    setPhotoPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [photoFile]);

  const sorted = useMemo(() => items ?? [], [items]);

  function submitKey() {
    const value = keyInput.trim();
    if (!value) return;
    setKeyInput("");
    writeStoredKey(value);
  }

  function changeDistrict(id: string) {
    writeStoredDistrict(id);
    setDistrictId(id);
    setMode("list");
    setEditingId(null);
    setForm(EMPTY_FORM);
    setSuccess("");
    setError("");
  }

  function openCreate() {
    setMode("create");
    setEditingId(null);
    setForm(EMPTY_FORM);
    setPhotoFile(null);
    setSuccess("");
    setError("");
  }

  function openEdit(m: AdminMember) {
    setMode("edit");
    setEditingId(m.id);
    setForm(memberToForm(m));
    setPhotoFile(null);
    setSuccess("");
    setError("");
  }

  function cancelForm() {
    setMode("list");
    setEditingId(null);
    setForm(EMPTY_FORM);
    setPhotoFile(null);
  }

  async function saveDistrictStatus(next: DistrictStatus) {
    if (!key) return;
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/api/admin/district-presence", {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          "x-admin-key": key,
        },
        body: JSON.stringify({ district_id: districtId, status: next }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(body?.messageBn || body?.error || "স্থিতি হালনাগাদ ব্যর্থ।");
      }
      setDistrictStatus(next);
      setSuccess("জেলার Presence স্থিতি হালনাগাদ হয়েছে।");
    } catch (err) {
      setError(err instanceof Error ? err.message : "স্থিতি হালনাগাদ ব্যর্থ।");
    } finally {
      setSaving(false);
    }
  }

  async function saveMember() {
    if (!key) return;
    if (!form.full_name.trim()) {
      setError("নামটি লিখুন।");
      return;
    }
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      const payload = {
        district_id: districtId,
        full_name: form.full_name.trim(),
        designation: form.designation.trim() || null,
        village: form.village.trim() || null,
        block: form.block.trim() || null,
        area: form.area.trim() || null,
        bio: form.bio.trim() || null,
        category: form.category.trim() || null,
        is_published: form.is_published,
      };

      let memberId = editingId;
      if (mode === "create") {
        const res = await fetch("/api/admin/district-members", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            "x-admin-key": key,
          },
          body: JSON.stringify(payload),
        });
        const body = await res.json().catch(() => ({}));
        if (!res.ok) {
          throw new Error(body?.messageBn || body?.error || "সংরক্ষণ ব্যর্থ।");
        }
        memberId = body.item.id as string;
      } else if (editingId) {
        const res = await fetch(`/api/admin/district-members/${editingId}`, {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
            "x-admin-key": key,
          },
          body: JSON.stringify(payload),
        });
        const body = await res.json().catch(() => ({}));
        if (!res.ok) {
          throw new Error(body?.messageBn || body?.error || "হালনাগাদ ব্যর্থ।");
        }
      }

      if (photoFile && memberId) {
        const fd = new FormData();
        fd.set("photo", photoFile);
        const photoRes = await fetch(
          `/api/admin/district-members/${memberId}/photo`,
          {
            method: "POST",
            headers: { "x-admin-key": key },
            body: fd,
          },
        );
        const photoBody = await photoRes.json().catch(() => ({}));
        if (!photoRes.ok) {
          throw new Error(
            photoBody?.messageBn || photoBody?.error || "ছবি আপলোড ব্যর্থ।",
          );
        }
      }

      setSuccess("সদস্যের তথ্য সফলভাবে সংরক্ষণ হয়েছে।");
      setMode("list");
      setEditingId(null);
      setForm(EMPTY_FORM);
      setPhotoFile(null);
      await load(key, districtId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "সংরক্ষণ করা যায়নি।");
    } finally {
      setSaving(false);
    }
  }

  async function patchMember(id: string, patch: Record<string, unknown>) {
    if (!key) return;
    setSaving(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/district-members/${id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          "x-admin-key": key,
        },
        body: JSON.stringify(patch),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(body?.messageBn || body?.error || "কাজটি ব্যর্থ হয়েছে।");
      }
      setSuccess("হালনাগাদ হয়েছে।");
      await load(key, districtId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "কাজটি ব্যর্থ হয়েছে।");
    } finally {
      setSaving(false);
    }
  }

  async function archiveMember(id: string, name: string) {
    if (!key) return;
    const ok = window.confirm(
      `আপনি কি "${name}" সদস্যকে সক্রিয় তালিকা থেকে সরাতে চান?\n\nDelete/Remove = সংরক্ষণাগার (soft).\nডাটাবেস থেকে স্থায়ীভাবে মুছে ফেলা হবে না।`,
    );
    if (!ok) return;
    setSaving(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/district-members/${id}`, {
        method: "DELETE",
        headers: { "x-admin-key": key },
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(body?.messageBn || body?.error || "সরানো যায়নি।");
      }
      setSuccess("সদস্যকে প্রকাশ থেকে সরানো হয়েছে।");
      await load(key, districtId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "সরানো যায়নি।");
    } finally {
      setSaving(false);
    }
  }

  async function moveOrder(id: string, direction: "up" | "down") {
    if (!items || !key) return;
    const idx = items.findIndex((m) => m.id === id);
    if (idx < 0) return;
    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= items.length) return;
    const a = items[idx];
    const b = items[swapIdx];
    setSaving(true);
    try {
      await Promise.all([
        fetch(`/api/admin/district-members/${a.id}`, {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
            "x-admin-key": key,
          },
          body: JSON.stringify({ display_order: b.display_order }),
        }),
        fetch(`/api/admin/district-members/${b.id}`, {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
            "x-admin-key": key,
          },
          body: JSON.stringify({ display_order: a.display_order }),
        }),
      ]);
      await load(key, districtId);
    } finally {
      setSaving(false);
    }
  }

  if (!key) {
    return (
      <main className="wrap admin-district-members" style={{ maxWidth: 480, padding: "4rem 1.25rem" }}>
        <p className="kicker" style={{ color: "var(--paddy-gold)" }}>
          পশ্চিমবঙ্গ — সব জেলা
        </p>
        <h1 style={{ fontFamily: "var(--font-display)", color: "var(--field-green)", marginTop: 0 }}>
          BKS সদস্য পরিচালনা
        </h1>
        <p style={{ color: "var(--ink-soft)" }}>
          অনুমোদিত অ্যাডমিন কী দিয়ে প্রবেশ করুন। কী ব্রাউজারে শুধু এই ট্যাবে মনে রাখা হয়।
        </p>
        <label className="admin-field">
          অ্যাডমিন কী
          <input
            type="password"
            value={keyInput}
            autoComplete="off"
            onChange={(e) => setKeyInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") submitKey();
            }}
          />
        </label>
        {error ? <p className="admin-msg error" role="alert">{error}</p> : null}
        <button
          type="button"
          className="admin-btn primary"
          onClick={submitKey}
          disabled={!keyInput.trim()}
        >
          প্রবেশ করুন
        </button>
      </main>
    );
  }

  return (
    <main className="wrap admin-district-members" style={{ padding: "2rem 1.25rem 4rem" }}>
      <div className="admin-header-row">
        <div>
          <p className="kicker" style={{ color: "var(--paddy-gold)", marginBottom: 0 }}>
            পশ্চিমবঙ্গ
          </p>
          <h1 style={{ fontFamily: "var(--font-display)", color: "var(--field-green)", margin: "0.25rem 0" }}>
            BKS সদস্য পরিচালনা
          </h1>
        </div>
        <button
          type="button"
          className="admin-btn ghost"
          onClick={() => {
            writeStoredKey("");
            setItems(null);
          }}
        >
          প্রস্থান
        </button>
      </div>

      <label className="admin-field">
        জেলা নির্বাচন
        <select
          value={districtId}
          onChange={(e) => changeDistrict(e.target.value)}
        >
          {catalog.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name.bn} / {d.officialName}
            </option>
          ))}
        </select>
      </label>

      <div className="admin-toolbar" style={{ marginBottom: "1rem" }}>
        <label className="admin-field inline">
          Presence স্থিতি
          <select
            value={districtStatus}
            disabled={!dbConfigured || saving}
            onChange={(e) => void saveDistrictStatus(e.target.value as DistrictStatus)}
          >
            <option value="upcoming">Upcoming</option>
            <option value="indicated">Indicated</option>
            <option value="active">Active</option>
          </select>
        </label>
        <p style={{ margin: 0, color: "var(--ink-mute)", fontSize: "0.9rem" }}>
          {selectedDistrict.name.bn} — মানচিত্রে এই স্থিতি দেখাবে (সদস্য তালিকা থেকে আলাদা)।
        </p>
      </div>

      {!dbConfigured ? (
        <p className="note-block" role="status">
          ডাটাবেস এখনো সংযুক্ত নয়। পাবলিক পৃষ্ঠায় স্থির (static) সদস্য তালিকা দেখাবে যতক্ষণ না
          মাইগ্রেশন প্রয়োগ ও পরিবেশ ভেরিয়েবল সেট করা হয়। বিস্তারিত:{" "}
          <code>docs/DISTRICT-MEMBERS.md</code>
        </p>
      ) : null}

      <div className="admin-stats" aria-label="সদস্য সংখ্যা">
        <div>
          <strong>{counts.total}</strong>
          <span>মোট সদস্য</span>
        </div>
        <div>
          <strong>{counts.published}</strong>
          <span>প্রকাশিত</span>
        </div>
        <div>
          <strong>{counts.draft}</strong>
          <span>খসড়া</span>
        </div>
      </div>

      {mode === "list" ? (
        <>
          <div className="admin-toolbar">
            <button type="button" className="admin-btn primary" onClick={openCreate} disabled={!dbConfigured}>
              + নতুন সদস্য যোগ করুন
            </button>
            <label className="admin-search">
              <span className="sr-only">খুঁজুন</span>
              <input
                type="search"
                placeholder="নাম / গ্রাম / এলাকা দিয়ে খুঁজুন"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </label>
            <label className="admin-field inline">
              ফিল্টার
              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value as "all" | "published" | "draft")
                }
              >
                <option value="all">সব</option>
                <option value="published">প্রকাশিত</option>
                <option value="draft">খসড়া</option>
              </select>
            </label>
          </div>

          {loading ? <p role="status">সদস্যদের তথ্য লোড হচ্ছে...</p> : null}
          {error ? <p className="admin-msg error" role="alert">{error}</p> : null}
          {success ? <p className="admin-msg ok" role="status">{success}</p> : null}

          {!loading && sorted.length === 0 ? (
            <p className="note-block">এখনও কোনো সদস্যের তথ্য নেই। নতুন সদস্য যোগ করুন।</p>
          ) : (
            <ul className="admin-member-list">
              {sorted.map((m, index) => (
                <li key={m.id} className="admin-member-row">
                  <div className="admin-member-main">
                    <strong>{m.full_name}</strong>
                    <span className={`admin-pill ${m.is_published ? "pub" : "draft"}`}>
                      {m.is_published ? "প্রকাশিত" : "খসড়া"}
                    </span>
                    <p>
                      {[m.designation, m.village, m.area].filter(Boolean).join(" · ") ||
                        "অতিরিক্ত তথ্য নেই"}
                    </p>
                  </div>
                  <div className="admin-member-actions">
                    <button type="button" className="admin-btn" onClick={() => openEdit(m)} disabled={saving}>
                      সম্পাদনা
                    </button>
                    <button
                      type="button"
                      className="admin-btn"
                      onClick={() =>
                        void patchMember(m.id, { is_published: !m.is_published })
                      }
                      disabled={saving}
                    >
                      {m.is_published ? "লুকিয়ে রাখুন" : "প্রকাশ করুন"}
                    </button>
                    <button
                      type="button"
                      className="admin-btn"
                      onClick={() => void moveOrder(m.id, "up")}
                      disabled={saving || index === 0}
                      aria-label="উপরে সরান"
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      className="admin-btn"
                      onClick={() => void moveOrder(m.id, "down")}
                      disabled={saving || index === sorted.length - 1}
                      aria-label="নিচে সরান"
                    >
                      ↓
                    </button>
                    <button
                      type="button"
                      className="admin-btn danger"
                      onClick={() => void archiveMember(m.id, m.full_name)}
                      disabled={saving}
                    >
                      মুছে ফেলুন / সরান
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </>
      ) : (
        <div className="admin-form-panel">
          <h2 style={{ fontFamily: "var(--font-display)", color: "var(--field-green)" }}>
            {mode === "create" ? "নতুন সদস্য যোগ করুন" : "সদস্য সম্পাদনা"} — {selectedDistrict.name.bn}
          </h2>
          <p className="note-block" style={{ marginTop: 0 }}>
            {LATIN_SCRIPT_MESSAGE_BN}
          </p>
          {error ? <p className="admin-msg error" role="alert">{error}</p> : null}

          <label className="admin-field">
            নাম * (English/Latin)
            <input
              value={form.full_name}
              onChange={(e) => setForm((f) => ({ ...f, full_name: e.target.value }))}
              placeholder="Buddhadeb Patra"
              lang="en"
              required
            />
          </label>
          <label className="admin-field">
            পরিচয় / দায়িত্ব (English/Latin)
            <input
              value={form.designation}
              onChange={(e) => setForm((f) => ({ ...f, designation: e.target.value }))}
              lang="en"
            />
          </label>
          <label className="admin-field">
            গ্রাম (English/Latin)
            <input
              value={form.village}
              onChange={(e) => setForm((f) => ({ ...f, village: e.target.value }))}
              lang="en"
            />
          </label>
          <label className="admin-field">
            ব্লক (English/Latin)
            <input
              value={form.block}
              onChange={(e) => setForm((f) => ({ ...f, block: e.target.value }))}
              lang="en"
            />
          </label>
          <label className="admin-field">
            এলাকা (English/Latin)
            <input
              value={form.area}
              onChange={(e) => setForm((f) => ({ ...f, area: e.target.value }))}
              lang="en"
            />
          </label>
          <label className="admin-field">
            সংক্ষিপ্ত পরিচিতি (English/Latin)
            <textarea
              rows={4}
              value={form.bio}
              onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
              lang="en"
            />
          </label>
          <label className="admin-field">
            বিভাগ (ঐচ্ছিক, English/Latin)
            <input
              value={form.category}
              onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
              lang="en"
            />
          </label>

          <fieldset className="admin-photo-field">
            <legend>ছবি</legend>
            {photoPreview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={photoPreview} alt="নির্বাচিত ছবির প্রিভিউ" className="admin-photo-preview" />
            ) : null}
            <div className="admin-photo-actions">
              <label className="admin-btn">
                ছবি তুলুন
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  hidden
                  onChange={(e) => setPhotoFile(e.target.files?.[0] ?? null)}
                />
              </label>
              <label className="admin-btn">
                ছবি নির্বাচন করুন
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  hidden
                  onChange={(e) => setPhotoFile(e.target.files?.[0] ?? null)}
                />
              </label>
            </div>
          </fieldset>

          <label className="admin-check">
            <input
              type="checkbox"
              checked={form.is_published}
              onChange={(e) =>
                setForm((f) => ({ ...f, is_published: e.target.checked }))
              }
            />
            এখনই প্রকাশ করুন
          </label>

          <div className="admin-form-actions">
            <button type="button" className="admin-btn primary" onClick={() => void saveMember()} disabled={saving}>
              সংরক্ষণ করুন
            </button>
            <button type="button" className="admin-btn" onClick={cancelForm} disabled={saving}>
              বাতিল
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
