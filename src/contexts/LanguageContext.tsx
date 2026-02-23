import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { es } from '@/i18n/es';
import { en } from '@/i18n/en';

type Language = 'en' | 'es';
type Translations = typeof es;

const translations: Record<Language, Translations> = { es, en };

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string | string[];
  tDoc: (field: { en: string; es: string }) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((acc, part) => acc?.[part], obj);
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(
    () => (localStorage.getItem('portal-language') as Language) || 'es'
  );

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => {
      const next = prev === 'es' ? 'en' : 'es';
      localStorage.setItem('portal-language', next);
      return next;
    });
  }, []);

  const t = useCallback(
    (key: string): string | string[] => {
      const value = getNestedValue(translations[language], key);
      return value ?? key;
    },
    [language]
  );

  const tDoc = useCallback(
    (field: { en: string; es: string }) => field[language],
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t, tDoc }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
