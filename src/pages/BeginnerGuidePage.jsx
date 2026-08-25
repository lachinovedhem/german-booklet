import React from 'react';
import { Link } from 'react-router-dom';
import {
    Rocket,
    Volume2,
    Compass,
    Languages,
    Hash,
    MessageSquare,
    Lightbulb,
    ChevronRight,
    GraduationCap,
} from 'lucide-react';
import { speak } from '../utils/speech';
import { useLanguage } from '../i18n/LanguageContext';

// Səsləndirilə bilən kiçik nümunə "çipi"
const SoundChip = ({ de, native, title }) => (
    <button
        onClick={() => speak(de)}
        className="group inline-flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2 text-left hover:border-primary/40 hover:shadow-sm transition-all"
        title={title}
    >
        <Volume2 size={14} className="text-slate-300 group-hover:text-primary shrink-0" />
        <span className="text-sm">
            <span className="font-bold text-slate-800">{de}</span>
            {native && <span className="text-slate-400"> — {native}</span>}
        </span>
    </button>
);

const SectionCard = ({ icon: Icon, title, color, children }) => (
    <section className="glass-card rounded-3xl p-5 md:p-6">
        <div className="flex items-center gap-3 mb-4">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white shadow-sm shrink-0`}>
                <Icon size={20} />
            </div>
            <h2 className="text-lg md:text-xl font-black text-slate-900 tracking-tight">{title}</h2>
        </div>
        {children}
    </section>
);

// --- Məlumat (iki dildə) ---
const roadmap = [
    { step: 1, az: 'Əlifba və tələffüz', en: 'Alphabet & pronunciation', descAz: 'ä, ö, ü, ß və əsas səs qaydaları ilə tanış ol.', descEn: 'Get familiar with ä, ö, ü, ß and the basic sound rules.', to: null },
    { step: 2, az: 'İlk sözlər və saylar', en: 'First words & numbers', descAz: 'Salamlaşma, nəzakət sözləri və 1–10 sayları.', descEn: 'Greetings, polite words and the numbers 1–10.', to: null },
    { step: 3, az: 'der / die / das', en: 'der / die / das', descAz: 'Hər ismi artiklı ilə birlikdə öyrən — bu, ən vacib vərdişdir.', descEn: 'Learn every noun together with its article — this is the most important habit.', to: '/nouns' },
    { step: 4, az: 'Ən vacib fellər', en: 'The most important verbs', descAz: '“Çox vacib” filtrindən başla: sein, haben, gehen...', descEn: 'Start with the "Essential" filter: sein, haben, gehen...', to: '/verbs' },
    { step: 5, az: 'Gündəlik ifadələr', en: 'Everyday phrases', descAz: 'Hazır cümlə qəlibləri ilə danışmağa başla.', descEn: 'Start speaking with ready-made sentence patterns.', to: '/phrases' },
    { step: 6, az: 'Hər gün məşq et', en: 'Practice every day', descAz: 'Flashcard və quiz ilə öyrəndiklərini möhkəmləndir.', descEn: 'Reinforce what you learned with flashcards and quizzes.', to: '/practice' },
];

const specialLetters = [
    { letter: 'ä', tipAz: 'Azərbaycan “e” səsinə yaxın', tipEn: 'Like the "e" in "bed"', ex: 'Mädchen', az: 'qız', en: 'girl' },
    { letter: 'ö', tipAz: 'Azərbaycan “ö” ilə eynidir', tipEn: 'Like "u" in British "fur" (rounded)', ex: 'schön', az: 'gözəl', en: 'beautiful' },
    { letter: 'ü', tipAz: 'Azərbaycan “ü” ilə eynidir', tipEn: 'Like "ee" said with rounded lips', ex: 'Tür', az: 'qapı', en: 'door' },
    { letter: 'ß', tipAz: '“ss” kimi oxunur (sərt s)', tipEn: 'Read like "ss" (a sharp s)', ex: 'Straße', az: 'küçə', en: 'street' },
];

const soundRules = [
    { combo: 'ei', az: '“ay”', en: 'like "eye"', ex: 'nein', wAz: 'yox', wEn: 'no' },
    { combo: 'ie', az: 'uzun “i”', en: 'long "ee"', ex: 'Liebe', wAz: 'sevgi', wEn: 'love' },
    { combo: 'eu / äu', az: '“oy”', en: 'like "oy" in "boy"', ex: 'neu', wAz: 'yeni', wEn: 'new' },
    { combo: 'sch', az: '“ş”', en: 'like "sh"', ex: 'Schule', wAz: 'məktəb', wEn: 'school' },
    { combo: 'ch', az: 'yumşaq “x”', en: 'soft "kh/h"', ex: 'ich', wAz: 'mən', wEn: 'I' },
    { combo: 'st / sp', az: 'söz əvvəlində “şt/şp”', en: 'at word start "sht/shp"', ex: 'Stadt', wAz: 'şəhər', wEn: 'city' },
    { combo: 'w', az: '“v”', en: 'like "v"', ex: 'Wasser', wAz: 'su', wEn: 'water' },
    { combo: 'v', az: '“f”', en: 'like "f"', ex: 'Vater', wAz: 'ata', wEn: 'father' },
    { combo: 'z', az: '“ts”', en: 'like "ts"', ex: 'Zeit', wAz: 'vaxt', wEn: 'time' },
    { combo: 'j', az: '“y”', en: 'like "y"', ex: 'ja', wAz: 'bəli', wEn: 'yes' },
];

const articles = [
    {
        art: 'der', labelAz: 'Kişi cinsi', labelEn: 'Masculine', color: 'text-blue-700 bg-blue-50 border-blue-200',
        hintsAz: ['Peşələr (-er): Lehrer', 'Günlər, aylar, fəsillər', 'Hava halları: Regen, Wind'],
        hintsEn: ['Professions (-er): Lehrer', 'Days, months, seasons', 'Weather: Regen, Wind'],
    },
    {
        art: 'die', labelAz: 'Qadın cinsi + bütün cəmlər', labelEn: 'Feminine + all plurals', color: 'text-rose-700 bg-rose-50 border-rose-200',
        hintsAz: ['-ung, -heit, -keit: Zeitung', '-schaft, -tät, -ion', 'Cəm formada HƏMİŞƏ die'],
        hintsEn: ['-ung, -heit, -keit: Zeitung', '-schaft, -tät, -ion', 'Plural is ALWAYS die'],
    },
    {
        art: 'das', labelAz: 'Orta cins', labelEn: 'Neuter', color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
        hintsAz: ['Kiçiltmə -chen, -lein: Mädchen', '-ment, -um: Dokument', 'Çox dillərin/metalların adı'],
        hintsEn: ['Diminutives -chen, -lein: Mädchen', '-ment, -um: Dokument', 'Many languages / metals'],
    },
];

const firstWords = [
    { de: 'Hallo!', az: 'Salam!', en: 'Hello!' },
    { de: 'Guten Tag!', az: 'Gününüz xeyir!', en: 'Good day!' },
    { de: 'Tschüss!', az: 'Salamat qal!', en: 'Bye!' },
    { de: 'Danke!', az: 'Təşəkkür!', en: 'Thanks!' },
    { de: 'Bitte!', az: 'Buyurun / Zəhmət olmasa', en: "You're welcome / Please" },
    { de: 'Ja / Nein', az: 'Bəli / Xeyr', en: 'Yes / No' },
    { de: 'Entschuldigung', az: 'Bağışlayın', en: 'Excuse me / Sorry' },
    { de: 'Ich verstehe nicht.', az: 'Başa düşmürəm.', en: "I don't understand." },
];

const numbers = [
    { de: 'eins', n: '1' }, { de: 'zwei', n: '2' }, { de: 'drei', n: '3' },
    { de: 'vier', n: '4' }, { de: 'fünf', n: '5' }, { de: 'sechs', n: '6' },
    { de: 'sieben', n: '7' }, { de: 'acht', n: '8' }, { de: 'neun', n: '9' },
    { de: 'zehn', n: '10' },
];

const goldenTips = [
    { az: 'Hər ismi artiklı (der/die/das) ilə birlikdə əzbərlə — sonradan ayrıca öyrənmək çətindir.', en: 'Memorize every noun together with its article (der/die/das) — learning it separately later is hard.' },
    { az: 'Hər gün 10 söz kifayətdir, amma hər gün! Ardıcıllıq sürətdən vacibdir.', en: '10 words a day is enough, but every day! Consistency matters more than speed.' },
    { az: 'Sözləri cümlə içində öyrən — tək söz tez unudulur.', en: 'Learn words inside sentences — isolated words are forgotten quickly.' },
    { az: 'Yüksək səslə təkrar et: bu səhifədəki səs düyməsindən istifadə et.', en: 'Repeat out loud: use the audio button on this page.' },
    { az: '“Çox vacib” prioritetli sözlərdən başla — onlar gündəlik danışığın 80%-ni təşkil edir.', en: 'Start with "Essential" priority words — they make up 80% of everyday speech.' },
];

const BeginnerGuidePage = () => {
    const { t, lang } = useLanguage();
    const L = (obj, azKey, enKey) => (lang === 'en' ? (obj[enKey] || obj[azKey]) : obj[azKey]);

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto pb-10">
            {/* Hero */}
            <section className="relative overflow-hidden rounded-3xl bg-slate-900 p-8 text-white shadow-xl">
                <div className="relative z-10 max-w-2xl">
                    <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-3 py-1 text-xs font-bold mb-3">
                        <GraduationCap size={14} /> {t('bg_badge')}
                    </div>
                    <h1 className="text-3xl font-black mb-2 tracking-tight">
                        {t('bg_title_1')} <span className="text-primary-light">{t('bg_title_hl')}</span> {t('bg_title_2')}
                    </h1>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        {t('bg_hero_sub_1')} <Volume2 size={13} className="inline -mt-0.5" /> {t('bg_hero_sub_2')}
                    </p>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -mr-32 -mt-32" />
            </section>

            {/* Roadmap */}
            <SectionCard icon={Compass} title={t('bg_roadmap')} color="from-indigo-500 to-blue-500">
                <div className="space-y-2">
                    {roadmap.map((r) => {
                        const inner = (
                            <div className="flex items-center gap-4 p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors">
                                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-black text-sm shrink-0">
                                    {r.step}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-slate-800 text-sm">{L(r, 'az', 'en')}</h3>
                                    <p className="text-xs text-slate-500">{L(r, 'descAz', 'descEn')}</p>
                                </div>
                                {r.to && <ChevronRight size={16} className="text-slate-300 shrink-0" />}
                            </div>
                        );
                        return r.to
                            ? <Link key={r.step} to={r.to} className="block">{inner}</Link>
                            : <div key={r.step}>{inner}</div>;
                    })}
                </div>
            </SectionCard>

            {/* Alphabet */}
            <SectionCard icon={Languages} title={t('bg_letters')} color="from-rose-500 to-orange-500">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {specialLetters.map((l) => (
                        <button
                            key={l.letter}
                            onClick={() => speak(l.ex)}
                            className="flex items-center gap-3 p-3 rounded-2xl border border-slate-100 hover:border-primary/30 hover:shadow-sm transition-all text-left"
                        >
                            <span className="w-11 h-11 rounded-xl bg-gradient-to-br from-rose-500 to-orange-500 text-white flex items-center justify-center text-2xl font-black shrink-0">
                                {l.letter}
                            </span>
                            <div className="min-w-0">
                                <p className="text-xs text-slate-500">{L(l, 'tipAz', 'tipEn')}</p>
                                <p className="text-sm font-bold text-slate-800 flex items-center gap-1">
                                    {l.ex} <span className="text-slate-400 font-normal">— {L(l, 'az', 'en')}</span>
                                    <Volume2 size={12} className="text-slate-300" />
                                </p>
                            </div>
                        </button>
                    ))}
                </div>
            </SectionCard>

            {/* Pronunciation rules */}
            <SectionCard icon={Volume2} title={t('bg_pron_rules')} color="from-purple-500 to-pink-500">
                <p className="text-xs text-slate-500 mb-4">
                    {t('bg_pron_intro')}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {soundRules.map((s) => (
                        <button
                            key={s.combo}
                            onClick={() => speak(s.ex)}
                            className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors text-left"
                        >
                            <span className="font-mono font-bold text-primary bg-white border border-slate-200 rounded-lg px-2 py-1 text-sm min-w-[58px] text-center shrink-0">
                                {s.combo}
                            </span>
                            <div className="min-w-0 flex-1">
                                <p className="text-xs text-slate-500">{L(s, 'az', 'en')}</p>
                                <p className="text-sm font-semibold text-slate-700">{s.ex} <span className="text-slate-400 font-normal">— {L(s, 'wAz', 'wEn')}</span></p>
                            </div>
                            <Volume2 size={13} className="text-slate-300 shrink-0" />
                        </button>
                    ))}
                </div>
            </SectionCard>

            {/* Articles */}
            <SectionCard icon={Hash} title={t('bg_articles')} color="from-blue-500 to-cyan-500">
                <p className="text-xs text-slate-500 mb-4">
                    {t('bg_articles_intro')}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {articles.map((a) => (
                        <div key={a.art} className={`rounded-2xl border p-4 ${a.color}`}>
                            <div className="flex items-baseline gap-2 mb-2">
                                <span className="text-2xl font-black">{a.art}</span>
                            </div>
                            <p className="text-xs font-bold mb-3 opacity-80">{L(a, 'labelAz', 'labelEn')}</p>
                            <ul className="space-y-1.5">
                                {(lang === 'en' ? a.hintsEn : a.hintsAz).map((h, i) => (
                                    <li key={i} className="text-xs flex items-start gap-1.5">
                                        <span className="mt-1 w-1 h-1 rounded-full bg-current opacity-60 shrink-0" />
                                        <span className="text-slate-600">{h}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <Link to="/nouns" className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline">
                    {t('bg_articles_link')} <ChevronRight size={15} />
                </Link>
            </SectionCard>

            {/* First words */}
            <SectionCard icon={MessageSquare} title={t('bg_first_words')} color="from-emerald-500 to-teal-500">
                <div className="flex flex-wrap gap-2">
                    {firstWords.map((w) => <SoundChip key={w.de} de={w.de} native={L(w, 'az', 'en')} title={t('bg_listen')} />)}
                </div>
            </SectionCard>

            {/* Numbers */}
            <SectionCard icon={Hash} title={t('bg_numbers')} color="from-amber-500 to-yellow-500">
                <div className="flex flex-wrap gap-2">
                    {numbers.map((n) => <SoundChip key={n.de} de={n.de} native={n.n} title={t('bg_listen')} />)}
                </div>
            </SectionCard>

            {/* Tips */}
            <SectionCard icon={Lightbulb} title={t('bg_golden')} color="from-slate-600 to-slate-800">
                <ul className="space-y-2.5">
                    {goldenTips.map((tip, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                            <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center text-xs font-black shrink-0">
                                {i + 1}
                            </span>
                            <span className="leading-relaxed">{L(tip, 'az', 'en')}</span>
                        </li>
                    ))}
                </ul>
            </SectionCard>

            {/* CTA */}
            <div className="rounded-3xl bg-gradient-to-r from-primary to-indigo-600 text-white p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
                <div className="text-center sm:text-left">
                    <h3 className="text-xl font-black flex items-center gap-2 justify-center sm:justify-start">
                        <Rocket size={20} /> {t('bg_ready')}
                    </h3>
                    <p className="text-blue-100/90 text-sm">{t('bg_ready_sub')}</p>
                </div>
                <Link
                    to="/practice"
                    className="bg-white text-primary font-black px-5 py-2.5 rounded-xl hover:scale-105 transition-transform shrink-0"
                >
                    {t('bg_ready_cta')}
                </Link>
            </div>
        </div>
    );
};

export default BeginnerGuidePage;
