import * as languages from "@/assets/data.json";

export const getFlagEmoji = (countryCode: string) =>
  String.fromCodePoint(
    ...[...countryCode.toUpperCase()].map((x) => 0x1f1a5 + x.charCodeAt(0))
  );

export const getLanguageFromLangCode = (langCode: string): string => {
  return Object.values(languages).find((lang) => lang.alpha2Code === langCode)!
    .demonym;
};

export const getLanguageQualification = (
  percent: number
): string | undefined => {
  let qualification;
  if (percent >= 0 && percent < 20) {
    qualification = "A1";
  } else if (percent >= 20 && percent < 40) {
    qualification = "A2";
  } else if (percent >= 40 && percent < 60) {
    qualification = "B1";
  } else if (percent >= 60 && percent < 80) {
    qualification = "B2";
  } else if (percent >= 80 && percent < 95) {
    qualification = "C1";
  } else if (percent >= 95 && percent <= 100) {
    qualification = "C2";
  }
  return qualification ?? undefined;
};
