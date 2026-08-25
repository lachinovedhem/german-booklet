import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { strings } from './strings';
import labels from './labels.json';

const LanguageContext = createContext(null);
const STORAGE_KEY = 'alida_lang';

const isLang = (v) => v === 'az' || v === 'en';

export const LanguageProvider = ({ children }) => {
    const [lang, setLangState] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (isLang(saved)) return saved;
        } catch { /* ignore */ }
        return 'az';
    });

    const setLang = useCallback((next) => {
        if (!isLang(next)) return;
        setLangState(next);
        try { localStorage.setItem(STORAGE_KEY, next); } catch { /* ignore */ }
    }, []);

    const toggleLang = useCallback(() => {
        setLang(lang === 'az' ? 'en' : 'az');
    }, [lang, setLang]);

    useEffect(() => {
        document.documentElement.lang = lang;
    }, [lang]);

    // UI string lookup: falls back to Azerbaijani, then to the key itself.
    const t = useCallback((key) => {
        const dict = strings[lang] || strings.az;
        return dict[key] ?? strings.az[key] ?? key;
    }, [lang]);

    // Learning translation for a data item (which native language the German maps to).
    const tr = useCallback((item) => {
        if (!item) return '';
        if (lang === 'en') {
            return item.en || item.translation || item.meaning || item.trans || item.azeri || item.comp || '';
        }
        return item.translation || item.meaning || item.trans || item.azeri || item.comp || item.en || '';
    }, [lang]);

    // Category / label translation. kind is one of the maps in labels.json.
    // The Azerbaijani value is always used as the stable internal key; only the
    // displayed text changes with language.
    const tCat = useCallback((kind, azValue) => {
        if (lang !== 'en' || azValue == null) return azValue;
        const map = labels[kind];
        return (map && map[azValue]) || azValue;
    }, [lang]);

    // Generic label lookup that searches every category map — handy when the
    // caller does not know which map an Azerbaijani label belongs to.
    const tLabel = useCallback((azValue) => {
        if (lang !== 'en' || azValue == null) return azValue;
        for (const kind of ['nounCats', 'phraseSubcats', 'phraseCats', 'miscTypes', 'profContexts']) {
            const map = labels[kind];
            if (map && map[azValue]) return map[azValue];
        }
        return azValue;
    }, [lang]);

    // Object-map lookup for labels keyed by id (e.g. profession categories).
    const tObj = useCallback((kind, key, field, fallback) => {
        if (lang !== 'en') return fallback;
        const map = labels[kind];
        const entry = map && map[key];
        return (entry && entry[field]) || fallback;
    }, [lang]);

    const value = useMemo(
        () => ({ lang, setLang, toggleLang, t, tr, tCat, tLabel, tObj }),
        [lang, setLang, toggleLang, t, tr, tCat, tLabel, tObj]
    );

    return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
    const ctx = useContext(LanguageContext);
    if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider');
    return ctx;
};
