/**
 * Canonical member-field script: English/Latin characters.
 * UI language (bn/hi/en) is separate from stored registration data.
 */

const NON_LATIN_LETTER =
  /[\u0900-\u097F\u0980-\u09FF\u0A00-\u0A7F\u0A80-\u0AFF\u0B00-\u0B7F\u0B80-\u0BFF\u0C00-\u0C7F\u0C80-\u0CFF\u0D00-\u0D7F]/;

/** True when the string has no Indic-script letters (Latin/punct/digits OK). */
export function isLatinScriptText(value: string): boolean {
  return !NON_LATIN_LETTER.test(value);
}

export const LATIN_SCRIPT_MESSAGE_BN =
  "এই ঘরে ইংরেজি/ল্যাটিন অক্ষরে লিখুন (উদাহরণ: Buddhadeb Patra)। বাংলা বা হিন্দি লিপি ব্যবহার করবেন না।";

export const LATIN_SCRIPT_MESSAGE_EN =
  "Use English/Latin letters for this field (e.g. Buddhadeb Patra). Do not use Bengali or Hindi script.";

export const LATIN_SCRIPT_MESSAGE_HI =
  "इस फ़ील्ड में अंग्रेज़ी/लैटिन अक्षर लिखें (जैसे Buddhadeb Patra)। बाংলা या हिंदी लिपि न लिखें।";
