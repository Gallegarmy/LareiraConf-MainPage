import es from "./es.json";
import gl from "./gl.json";

export type Locale = "es" | "gl";

export const locales = {
  es,
  gl,
};

export const defaultLocale: Locale = "es";

export function getTranslations(locale: Locale) {
  return locales[locale] || locales[defaultLocale];
}

export function getLangFromUrl(url: URL): Locale {
  const [, lang] = url.pathname.split("/");
  if (lang === "gl") return "gl";
  return "es";
}

export function useTranslations(locale: Locale) {
  const t = getTranslations(locale);

  return (key: string): any => {
    const keys = key.split(".");
    let value: any = t;

    for (const k of keys) {
      if (value && typeof value === "object") {
        value = value[k];
      } else {
        return key;
      }
    }

    return value !== undefined ? value : key;
  };
}
