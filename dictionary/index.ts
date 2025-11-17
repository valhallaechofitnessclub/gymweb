import en from './en.json';
import ge from './ge.json';
import type { Locale } from '@/app/type/118n';

const dictionaries = {
  en,
  ge,
} as const;

export type Dictionary = typeof en;

export function getDictionary(locale: string): Dictionary {
  return dictionaries[locale as Locale] || dictionaries.en;
}