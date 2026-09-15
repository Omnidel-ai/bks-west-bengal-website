import type { Metadata } from "next";
import DistrictMembersAdmin from "@/components/admin/DistrictMembersAdmin";

export const metadata: Metadata = {
  title: "পশ্চিম মেদিনীপুর — সদস্য পরিচালনা",
  robots: { index: false, follow: false },
};

export default function DistrictMembersAdminPage() {
  return <DistrictMembersAdmin />;
}
