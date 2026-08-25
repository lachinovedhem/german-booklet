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

// Səsləndirilə bilən kiçik nümunə "çipi"
const SoundChip = ({ de, az }) => (
    <button
        onClick={() => speak(de)}
        className="group inline-flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2 text-left hover:border-primary/40 hover:shadow-sm transition-all"
        title="Tələffüzü dinlə"
    >
        <Volume2 size={14} className="text-slate-300 group-hover:text-primary shrink-0" />
        <span className="text-sm">
            <span className="font-bold text-slate-800">{de}</span>
            {az && <span className="text-slate-400"> — {az}</span>}
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

// --- Məlumat ---
const roadmap = [
    { step: 1, title: 'Əlifba və tələffüz', desc: 'ä, ö, ü, ß və əsas səs qaydaları ilə tanış ol.', to: null },
    { step: 2, title: 'İlk sözlər və saylar', desc: 'Salamlaşma, nəzakət sözləri və 1–10 sayları.', to: null },
    { step: 3, title: 'der / die / das', desc: 'Hər ismi artiklı ilə birlikdə öyrən — bu, ən vacib vərdişdir.', to: '/nouns' },
    { step: 4, title: 'Ən vacib fellər', desc: '“Çox vacib” filtrindən başla: sein, haben, gehen...', to: '/verbs' },
    { step: 5, title: 'Gündəlik ifadələr', desc: 'Hazır cümlə qəlibləri ilə danışmağa başla.', to: '/phrases' },
    { step: 6, title: 'Hər gün məşq et', desc: 'Flashcard və quiz ilə öyrəndiklərini möhkəmləndir.', to: '/practice' },
];

const specialLetters = [
    { letter: 'ä', tip: 'Azərbaycan “e” səsinə yaxın', ex: 'Mädchen', az: 'qız' },
    { letter: 'ö', tip: 'Azərbaycan “ö” ilə eynidir', ex: 'schön', az: 'gözəl' },
    { letter: 'ü', tip: 'Azərbaycan “ü” ilə eynidir', ex: 'Tür', az: 'qapı' },
    { letter: 'ß', tip: '“ss” kimi oxunur (sərt s)', ex: 'Straße', az: 'küçə' },
];

const soundRules = [
    { combo: 'ei', sound: '“ay”', ex: 'nein', az: 'yox' },
    { combo: 'ie', sound: 'uzun “i”', ex: 'Liebe', az: 'sevgi' },
    { combo: 'eu / äu', sound: '“oy”', ex: 'neu', az: 'yeni' },
    { combo: 'sch', sound: '“ş”', ex: 'Schule', az: 'məktəb' },
    { combo: 'ch', sound: 'yumşaq “x”', ex: 'ich', az: 'mən' },
    { combo: 'st / sp', sound: 'söz əvvəlində “şt/şp”', ex: 'Stadt', az: 'şəhər' },
    { combo: 'w', sound: '“v”', ex: 'Wasser', az: 'su' },
    { combo: 'v', sound: '“f”', ex: 'Vater', az: 'ata' },
    { combo: 'z', sound: '“ts”', ex: 'Zeit', az: 'vaxt' },
    { combo: 'j', sound: '“y”', ex: 'ja', az: 'bəli' },
];

const articles = [
    {
        art: 'der', label: 'Kişi cinsi', color: 'text-blue-700 bg-blue-50 border-blue-200',
        hints: ['Peşələr (-er): Lehrer', 'Günlər, aylar, fəsillər', 'Hava halları: Regen, Wind'],
    },
    {
        art: 'die', label: 'Qadın cinsi + bütün cəmlər', color: 'text-rose-700 bg-rose-50 border-rose-200',
        hints: ['-ung, -heit, -keit: Zeitung', '-schaft, -tät, -ion', 'Cəm formada HƏMİŞƏ die'],
    },
    {
        art: 'das', label: 'Orta cins', color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
        hints: ['Kiçiltmə -chen, -lein: Mädchen', '-ment, -um: Dokument', 'Çox dillərin/metalların adı'],
    },
];

const firstWords = [
    { de: 'Hallo!', az: 'Salam!' },
    { de: 'Guten Tag!', az: 'Gününüz xeyir!' },
    { de: 'Tschüss!', az: 'Salamat qal!' },
    { de: 'Danke!', az: 'Təşəkkür!' },
    { de: 'Bitte!', az: 'Buyurun / Zəhmət olmasa' },
    { de: 'Ja / Nein', az: 'Bəli / Xeyr' },
    { de: 'Entschuldigung', az: 'Bağışlayın' },
    { de: 'Ich verstehe nicht.', az: 'Başa düşmürəm.' },
];

const numbers = [
    { de: 'eins', az: '1' }, { de: 'zwei', az: '2' }, { de: 'drei', az: '3' },
    { de: 'vier', az: '4' }, { de: 'fünf', az: '5' }, { de: 'sechs', az: '6' },
    { de: 'sieben', az: '7' }, { de: 'acht', az: '8' }, { de: 'neun', az: '9' },
    { de: 'zehn', az: '10' },
];

const tips = [
    'Hər ismi artiklı (der/die/das) ilə birlikdə əzbərlə — sonradan ayrıca öyrənmək çətindir.',
    'Hər gün 10 söz kifayətdir, amma hər gün! Ardıcıllıq sürətdən vacibdir.',
    'Sözləri cümlə içində öyrən — tək söz tez unudulur.',
    'Yüksək səslə təkrar et: bu səhifədəki səs düyməsindən istifadə et.',
    '“Çox vacib” prioritetli sözlərdən başla — onlar gündəlik danışığın 80%-ni təşkil edir.',
];

const BeginnerGuidePage = () => {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto pb-10">
            {/* Hero */}
            <section className="relative overflow-hidden rounded-3xl bg-slate-900 p-8 text-white shadow-xl">
                <div className="relative z-10 max-w-2xl">
                    <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-3 py-1 text-xs font-bold mb-3">
                        <GraduationCap size={14} /> Yeni başlayanlar üçün
                    </div>
                    <h1 className="text-3xl font-black mb-2 tracking-tight">
                        Sıfırdan <span className="text-primary-light">Alman dilinə</span> başlanğıc
                    </h1>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        Bu bələdçi sənə hardan başlamağı, necə tələffüz etməyi və ilk addımları addım-addım göstərir.
                        Tələffüzü eşitmək üçün <Volume2 size={13} className="inline -mt-0.5" /> işarəsinə toxun.
                    </p>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -mr-32 -mt-32" />
            </section>

            {/* Roadmap */}
            <SectionCard icon={Compass} title="Öyrənmə marşrutu" color="from-indigo-500 to-blue-500">
                <div className="space-y-2">
                    {roadmap.map((r) => {
                        const inner = (
                            <div className="flex items-center gap-4 p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors">
                                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-black text-sm shrink-0">
                                    {r.step}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-slate-800 text-sm">{r.title}</h3>
                                    <p className="text-xs text-slate-500">{r.desc}</p>
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
            <SectionCard icon={Languages} title="Xüsusi hərflər" color="from-rose-500 to-orange-500">
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
                                <p className="text-xs text-slate-500">{l.tip}</p>
                                <p className="text-sm font-bold text-slate-800 flex items-center gap-1">
                                    {l.ex} <span className="text-slate-400 font-normal">— {l.az}</span>
                                    <Volume2 size={12} className="text-slate-300" />
                                </p>
                            </div>
                        </button>
                    ))}
                </div>
            </SectionCard>

            {/* Pronunciation rules */}
            <SectionCard icon={Volume2} title="Tələffüz qaydaları" color="from-purple-500 to-pink-500">
                <p className="text-xs text-slate-500 mb-4">
                    Alman dilində bəzi hərf birləşmələri yazıldığı kimi oxunmur. Ən vaciblər:
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
                                <p className="text-xs text-slate-500">{s.sound}</p>
                                <p className="text-sm font-semibold text-slate-700">{s.ex} <span className="text-slate-400 font-normal">— {s.az}</span></p>
                            </div>
                            <Volume2 size={13} className="text-slate-300 shrink-0" />
                        </button>
                    ))}
                </div>
            </SectionCard>

            {/* Articles */}
            <SectionCard icon={Hash} title="der / die / das — artikllər" color="from-blue-500 to-cyan-500">
                <p className="text-xs text-slate-500 mb-4">
                    Almancada hər ismin cinsi var. Onu sözlə birlikdə öyrənmək vacibdir. 100% qayda yoxdur,
                    amma bu ipucları çox kömək edir:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {articles.map((a) => (
                        <div key={a.art} className={`rounded-2xl border p-4 ${a.color}`}>
                            <div className="flex items-baseline gap-2 mb-2">
                                <span className="text-2xl font-black">{a.art}</span>
                            </div>
                            <p className="text-xs font-bold mb-3 opacity-80">{a.label}</p>
                            <ul className="space-y-1.5">
                                {a.hints.map((h, i) => (
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
                    İsimləri artikllərlə öyrən <ChevronRight size={15} />
                </Link>
            </SectionCard>

            {/* First words */}
            <SectionCard icon={MessageSquare} title="İlk sözlər və ifadələr" color="from-emerald-500 to-teal-500">
                <div className="flex flex-wrap gap-2">
                    {firstWords.map((w) => <SoundChip key={w.de} de={w.de} az={w.az} />)}
                </div>
            </SectionCard>

            {/* Numbers */}
            <SectionCard icon={Hash} title="Saylar 1–10" color="from-amber-500 to-yellow-500">
                <div className="flex flex-wrap gap-2">
                    {numbers.map((n) => <SoundChip key={n.de} de={n.de} az={n.az} />)}
                </div>
            </SectionCard>

            {/* Tips */}
            <SectionCard icon={Lightbulb} title="Qızıl qaydalar" color="from-slate-600 to-slate-800">
                <ul className="space-y-2.5">
                    {tips.map((t, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                            <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center text-xs font-black shrink-0">
                                {i + 1}
                            </span>
                            <span className="leading-relaxed">{t}</span>
                        </li>
                    ))}
                </ul>
            </SectionCard>

            {/* CTA */}
            <div className="rounded-3xl bg-gradient-to-r from-primary to-indigo-600 text-white p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
                <div className="text-center sm:text-left">
                    <h3 className="text-xl font-black flex items-center gap-2 justify-center sm:justify-start">
                        <Rocket size={20} /> Hazırsan?
                    </h3>
                    <p className="text-blue-100/90 text-sm">İndi öyrəndiklərini məşq rejimində sına.</p>
                </div>
                <Link
                    to="/practice"
                    className="bg-white text-primary font-black px-5 py-2.5 rounded-xl hover:scale-105 transition-transform shrink-0"
                >
                    Məşqə başla
                </Link>
            </div>
        </div>
    );
};

export default BeginnerGuidePage;
