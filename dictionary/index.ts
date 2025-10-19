import en from "./en.json";
import ge from "./ge.json";

export const dictionaries: Record<string, any> = {
  en,
  ge,
};

export const getDictionary = (lang: string) => {
  return dictionaries[lang] || dictionaries["en"];
};
