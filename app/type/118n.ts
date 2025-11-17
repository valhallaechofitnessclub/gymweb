export type Locale = 'en' | 'ge';

export const locales: readonly Locale[] = ['en', 'ge'] as const;
export const defaultLocale: Locale = 'en';