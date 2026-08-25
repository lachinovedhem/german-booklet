import React, { useState, useMemo, useCallback } from 'react';
import {
    Volume2, RotateCcw, Check, X, ChevronRight,
    Layers, Brain, Trophy, Sparkles,
} from 'lucide-react';
import { speak } from '../utils/speech';
import { useLanguage } from '../i18n/LanguageContext';
import nounsData from '../data/nouns.json';
import verbsData from '../data/verbs.json';
import adjectivesData from '../data/adjectives.json';

const STATS_KEY = 'german_practice_stats';

// Hər dataseti vahid {de, native, speak} formasına gətiririk. "native" öyrənmə
// dilinə (AZ/EN) görə seçilir.
const pick = (lang, en, az) => (lang === 'en' ? (en || az) : (az || en));

const DATASETS = {
    nouns: {
        labelKey: 'nav_nouns',
        data: nounsData,
        map: (x, lang) => ({ de: `${x.art} ${x.word}`, native: pick(lang, x.en, x.translation), speak: `${x.art} ${x.word}`, priority: x.priority }),
    },
    verbs: {
        labelKey: 'nav_verbs',
        data: verbsData,
        map: (x, lang) => ({ de: x.infinitive, native: pick(lang, x.en, x.meaning), speak: x.infinitive, priority: x.priority }),
    },
    adjectives: {
        labelKey: 'nav_adjectives',
        data: adjectivesData,
        map: (x, lang) => ({ de: x.german, native: pick(lang, x.en, x.meaning), speak: x.german, priority: x.priority }),
    },
};

const shuffle = (arr) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
};

const loadStats = () => {
    try {
        const s = localStorage.getItem(STATS_KEY);
        return s ? JSON.parse(s) : { answered: 0, correct: 0 };
    } catch {
        return { answered: 0, correct: 0 };
    }
};

const PracticePage = () => {
    const { t, lang } = useLanguage();
    const [dataset, setDataset] = useState('nouns');
    const [mode, setMode] = useState('flashcard'); // flashcard | quiz
    const [direction, setDirection] = useState('de-native'); // de-native | native-de
    const [onlyImportant, setOnlyImportant] = useState(true);
    const [started, setStarted] = useState(false);

    // Sessiya vəziyyəti
    const [index, setIndex] = useState(0);
    const [flipped, setFlipped] = useState(false);
    const [score, setScore] = useState({ correct: 0, wrong: 0 });
    const [answered, setAnswered] = useState(null); // quiz: seçilmiş cavab
    const [lifetime, setLifetime] = useState(loadStats);

    // Parametrlər (dataset/rejim/istiqamət/əhatə/dil) dəyişəndə sessiyanı render zamanı sıfırla.
    const configKey = `${dataset}|${mode}|${direction}|${onlyImportant}|${lang}`;
    const [prevConfig, setPrevConfig] = useState(configKey);
    if (configKey !== prevConfig) {
        setPrevConfig(configKey);
        setStarted(false);
        setIndex(0);
        setFlipped(false);
        setScore({ correct: 0, wrong: 0 });
        setAnswered(null);
    }

    // Seçilmiş datadan göyərtə (deck) qururuq
    const deck = useMemo(() => {
        const cfg = DATASETS[dataset];
        let items = cfg.data.map((x) => cfg.map(x, lang)).filter((x) => x.de && x.native);
        if (onlyImportant) {
            const important = items.filter((x) => x.priority === 1 || x.priority === 2);
            if (important.length >= 8) items = important;
        }
        return shuffle(items).slice(0, 30);
    }, [dataset, onlyImportant, lang]);

    const current = deck[index];
    const isFinished = started && index >= deck.length;

    // Cari sual üçün "ön" və "arxa" tərəfi istiqamətə görə təyin edirik
    const front = current ? (direction === 'de-native' ? current.de : current.native) : '';
    const back = current ? (direction === 'de-native' ? current.native : current.de) : '';

    // Quiz variantları
    const options = useMemo(() => {
        if (mode !== 'quiz' || !current) return [];
        const correctVal = back;
        const pool = deck
            .map((x) => (direction === 'de-native' ? x.native : x.de))
            .filter((v) => v && v !== correctVal);
        const distractors = shuffle([...new Set(pool)]).slice(0, 3);
        return shuffle([correctVal, ...distractors]);
    }, [mode, deck, direction, current, back]);

    const persist = useCallback((wasCorrect) => {
        setLifetime((prev) => {
            const next = { answered: prev.answered + 1, correct: prev.correct + (wasCorrect ? 1 : 0) };
            try { localStorage.setItem(STATS_KEY, JSON.stringify(next)); } catch { /* ignore */ }
            return next;
        });
    }, []);

    const startSession = () => {
        setStarted(true);
        setIndex(0);
        setFlipped(false);
        setScore({ correct: 0, wrong: 0 });
        setAnswered(null);
    };

    const reset = () => {
        setStarted(false);
        setIndex(0);
        setFlipped(false);
        setScore({ correct: 0, wrong: 0 });
        setAnswered(null);
    };

    const advance = () => {
        setIndex((i) => i + 1);
        setFlipped(false);
        setAnswered(null);
    };

    const recordFlashcard = (wasCorrect) => {
        setScore((s) => ({ correct: s.correct + (wasCorrect ? 1 : 0), wrong: s.wrong + (wasCorrect ? 0 : 1) }));
        persist(wasCorrect);
        advance();
    };

    const recordQuiz = (option) => {
        if (answered) return;
        const wasCorrect = option === back;
        setAnswered(option);
        setScore((s) => ({ correct: s.correct + (wasCorrect ? 1 : 0), wrong: s.wrong + (wasCorrect ? 0 : 1) }));
        persist(wasCorrect);
    };

    // Almanca səs həmişə alman sözünü söyləsin (istiqamətdən asılı olmayaraq)
    const sayGerman = () => current && speak(current.speak);

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl mx-auto pb-10">
            {/* Başlıq */}
            <div className="flex items-center justify-between gap-3">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tighter flex items-center gap-2">
                        <Brain size={28} className="text-primary" /> {t('practice_title')}
                    </h1>
                    <p className="text-slate-500 text-sm">{t('practice_sub')}</p>
                </div>
                <div className="text-right shrink-0">
                    <div className="text-xs text-slate-400 font-medium">{t('practice_total_correct')}</div>
                    <div className="text-lg font-black text-emerald-600">{lifetime.correct}</div>
                </div>
            </div>

            {/* Parametrlər */}
            <div className="glass-card rounded-3xl p-5 space-y-4">
                <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{t('practice_what')}</p>
                    <div className="grid grid-cols-3 gap-2">
                        {Object.entries(DATASETS).map(([key, cfg]) => (
                            <button
                                key={key}
                                onClick={() => setDataset(key)}
                                className={`py-2.5 rounded-xl text-sm font-bold transition-all ${dataset === key ? 'bg-primary text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                            >
                                {t(cfg.labelKey)}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{t('practice_mode')}</p>
                        <div className="grid grid-cols-2 gap-2">
                            <button
                                onClick={() => setMode('flashcard')}
                                className={`py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-all ${mode === 'flashcard' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                            >
                                <Layers size={14} /> {t('practice_card')}
                            </button>
                            <button
                                onClick={() => setMode('quiz')}
                                className={`py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-all ${mode === 'quiz' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                            >
                                <Sparkles size={14} /> {t('practice_quiz')}
                            </button>
                        </div>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{t('practice_direction')}</p>
                        <button
                            onClick={() => setDirection((d) => (d === 'de-native' ? 'native-de' : 'de-native'))}
                            className="w-full py-2 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all"
                        >
                            {direction === 'de-native' ? t('practice_dir_de_native') : t('practice_dir_native_de')}
                        </button>
                    </div>
                </div>

                <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer select-none">
                    <input
                        type="checkbox"
                        checked={onlyImportant}
                        onChange={(e) => setOnlyImportant(e.target.checked)}
                        className="w-4 h-4 accent-primary"
                    />
                    {t('practice_only_important')}
                </label>

                {!started && (
                    <button
                        onClick={startSession}
                        className="w-full py-3 rounded-xl bg-primary text-white font-black hover:bg-primary-dark transition-colors shadow-md"
                    >
                        {t('practice_start')} ({deck.length} {t('practice_words')})
                    </button>
                )}
            </div>

            {/* Sessiya */}
            {started && !isFinished && current && (
                <div className="space-y-4">
                    {/* Tərəqqi + hesab */}
                    <div className="flex items-center justify-between text-sm">
                        <span className="font-bold text-slate-500">{index + 1} / {deck.length}</span>
                        <div className="flex items-center gap-3 font-bold">
                            <span className="text-emerald-600 flex items-center gap-1"><Check size={15} /> {score.correct}</span>
                            <span className="text-rose-500 flex items-center gap-1"><X size={15} /> {score.wrong}</span>
                        </div>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-primary transition-all duration-300" style={{ width: `${(index / deck.length) * 100}%` }} />
                    </div>

                    {/* FLASHCARD */}
                    {mode === 'flashcard' && (
                        <div className="glass-card rounded-3xl p-8 min-h-[260px] flex flex-col items-center justify-center text-center relative">
                            <button
                                onClick={sayGerman}
                                className="absolute top-3 right-3 p-2 text-slate-300 hover:text-primary transition-colors"
                                title={t('card_pronounce')}
                                aria-label={t('card_pronounce_do')}
                            >
                                <Volume2 size={20} />
                            </button>

                            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-3">
                                {flipped ? t('practice_answer') : t('practice_question')}
                            </p>
                            <h2 className="text-3xl font-black text-slate-900 mb-2">{flipped ? back : front}</h2>
                            {flipped && <p className="text-slate-400 text-sm">{front}</p>}

                            {!flipped ? (
                                <button
                                    onClick={() => setFlipped(true)}
                                    className="mt-6 px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors"
                                >
                                    {t('practice_show_answer')}
                                </button>
                            ) : (
                                <div className="mt-6 flex gap-3 w-full max-w-xs">
                                    <button
                                        onClick={() => recordFlashcard(false)}
                                        className="flex-1 py-2.5 rounded-xl bg-rose-50 text-rose-600 font-bold hover:bg-rose-100 transition-colors flex items-center justify-center gap-1"
                                    >
                                        <X size={16} /> {t('practice_didnt_know')}
                                    </button>
                                    <button
                                        onClick={() => recordFlashcard(true)}
                                        className="flex-1 py-2.5 rounded-xl bg-emerald-50 text-emerald-600 font-bold hover:bg-emerald-100 transition-colors flex items-center justify-center gap-1"
                                    >
                                        <Check size={16} /> {t('practice_knew')}
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {/* QUIZ */}
                    {mode === 'quiz' && (
                        <div className="glass-card rounded-3xl p-6">
                            <div className="flex items-center justify-center gap-2 mb-6">
                                <h2 className="text-2xl font-black text-slate-900 text-center">{front}</h2>
                                <button onClick={sayGerman} className="p-1.5 text-slate-300 hover:text-primary" title={t('card_pronounce')} aria-label={t('card_pronounce_do')}>
                                    <Volume2 size={18} />
                                </button>
                            </div>
                            <div className="grid grid-cols-1 gap-2">
                                {options.map((opt) => {
                                    let cls = 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-transparent';
                                    if (answered) {
                                        if (opt === back) cls = 'bg-emerald-50 text-emerald-700 border-emerald-300';
                                        else if (opt === answered) cls = 'bg-rose-50 text-rose-700 border-rose-300';
                                        else cls = 'bg-slate-50 text-slate-400 border-transparent';
                                    }
                                    return (
                                        <button
                                            key={opt}
                                            onClick={() => recordQuiz(opt)}
                                            disabled={!!answered}
                                            className={`py-3 px-4 rounded-xl border-2 text-sm font-bold text-left transition-all flex items-center justify-between ${cls}`}
                                        >
                                            {opt}
                                            {answered && opt === back && <Check size={16} />}
                                            {answered && opt === answered && opt !== back && <X size={16} />}
                                        </button>
                                    );
                                })}
                            </div>
                            {answered && (
                                <button
                                    onClick={advance}
                                    className="mt-4 w-full py-2.5 rounded-xl bg-primary text-white font-bold hover:bg-primary-dark transition-colors flex items-center justify-center gap-1"
                                >
                                    {t('practice_next')} <ChevronRight size={16} />
                                </button>
                            )}
                        </div>
                    )}

                    <button onClick={reset} className="w-full text-xs text-slate-400 hover:text-slate-600 font-medium py-2">
                        {t('practice_stop')}
                    </button>
                </div>
            )}

            {/* Nəticə */}
            {isFinished && (
                <div className="glass-card rounded-3xl p-8 text-center space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-full bg-amber-100 text-amber-500 flex items-center justify-center">
                        <Trophy size={32} />
                    </div>
                    <h2 className="text-2xl font-black text-slate-900">{t('practice_finished')}</h2>
                    <div className="flex justify-center gap-6">
                        <div>
                            <div className="text-3xl font-black text-emerald-600">{score.correct}</div>
                            <div className="text-xs text-slate-400 font-bold uppercase">{t('practice_correct')}</div>
                        </div>
                        <div>
                            <div className="text-3xl font-black text-rose-500">{score.wrong}</div>
                            <div className="text-xs text-slate-400 font-bold uppercase">{t('practice_wrong')}</div>
                        </div>
                        <div>
                            <div className="text-3xl font-black text-slate-700">
                                {deck.length ? Math.round((score.correct / deck.length) * 100) : 0}%
                            </div>
                            <div className="text-xs text-slate-400 font-bold uppercase">{t('practice_result')}</div>
                        </div>
                    </div>
                    <button
                        onClick={startSession}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-black hover:bg-primary-dark transition-colors"
                    >
                        <RotateCcw size={18} /> {t('practice_restart')}
                    </button>
                </div>
            )}
        </div>
    );
};

export default PracticePage;
