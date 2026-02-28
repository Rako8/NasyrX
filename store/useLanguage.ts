import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { translations, Locale, TranslationKey } from '@/lib/translations';

interface LanguageStore {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    t: (key: TranslationKey) => string;
}

export const useLanguage = create<LanguageStore>()(
    persist(
        (set, get) => ({
            locale: 'ru',
            setLocale: (locale) => set({ locale }),
            t: (key) => translations[get().locale][key] as string,
        }),
        {
            name: 'luxe-locale',
        }
    )
);
