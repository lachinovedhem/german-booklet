import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Home as HomeIcon,
    BookOpen,
    Zap,
    Star,
    Briefcase,
    Grid,
    FileText,
    MessageSquare,
    ChevronRight,
    GraduationCap,
    Brain
} from 'lucide-react';
import tipsData from '../data/tips.json';
// Saylar əvvəlcədən hesablanmış kiçik fayldan gəlir (ağır data fayllarını
// ana səhifəyə import etməmək üçün). Yeniləmək: npm run counts
import counts from '../data/counts.json';

const CategoryCard = ({ to, icon: Icon, label, count, color }) => (
    <Link
        to={to}
        className="glass-card p-4 rounded-2xl flex items-center justify-between hover:scale-[1.02] transition-all duration-200 group"
    >
        <div className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white shadow-sm`}>
                <Icon size={20} />
            </div>
            <div>
                <h3 className="font-bold text-slate-800 text-sm">{label}</h3>
                <p className="text-xs text-slate-500">{count} məlumat</p>
            </div>
        </div>
        <ChevronRight size={16} className="text-slate-300 group-hover:text-primary transition-colors" />
    </Link>
);

const Home = () => {
    // Komponent ilk render olunanda təsadüfi məsləhət seçilir (effektsiz, lazy init).
    const [randomTip] = useState(() => tipsData[Math.floor(Math.random() * tipsData.length)]);

    const categories = [
        { to: '/grammar', icon: FileText, label: 'Qrammatika', count: counts.grammar, color: 'from-indigo-500 to-blue-500' },
        { to: '/nouns', icon: BookOpen, label: 'İsimlər', count: counts.nouns, color: 'from-blue-500 to-cyan-500' },
        { to: '/verbs', icon: Zap, label: 'Fellər', count: counts.verbs, color: 'from-rose-500 to-orange-500' },
        { to: '/adjectives', icon: Star, label: 'Sifətlər', count: counts.adjectives, color: 'from-purple-500 to-pink-500' },
        { to: '/professions', icon: Briefcase, label: 'Peşələr', count: counts.professions, color: 'from-amber-500 to-yellow-500' },
        { to: '/phrases', icon: MessageSquare, label: 'İfadələr', count: counts.phrases, color: 'from-indigo-500 to-purple-500' },
        { to: '/miscellaneous', icon: Grid, label: 'Digər', count: counts.miscellaneous, color: 'from-emerald-500 to-teal-500' },
    ];

    return (
        <div className="space-y-6">
            {/* Compact Hero Section */}
            <section className="relative overflow-hidden rounded-3xl bg-slate-900 p-8 text-white shadow-xl">
                <div className="relative z-10 max-w-2xl">
                    <h1 className="text-3xl font-black mb-2 tracking-tight">
                        Alman Dilini <span className="text-primary-light">Daha Sürətli</span> Öyrən
                    </h1>
                    <p className="text-slate-400 text-sm leading-relaxed mb-0">
                        Bütün lüğət və qrammatika qaydaları bir yerdə. Kompakt və effektiv öyrənmə təcrübəsi.
                    </p>
                </div>

                {/* Abstract Background Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -mr-32 -mt-32" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/10 rounded-full blur-3xl -ml-24 -mb-24" />
            </section>

            {/* Beginner CTA */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link to="/start" className="glass-card p-5 rounded-2xl flex items-center gap-4 hover:scale-[1.02] transition-all duration-200 border-l-4 border-emerald-500">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white shadow-sm shrink-0">
                        <GraduationCap size={24} />
                    </div>
                    <div>
                        <h3 className="font-black text-slate-800">Yeni başlayırsan?</h3>
                        <p className="text-xs text-slate-500">A1 başlanğıc bələdçisi — hardan başlamalı, tələffüz, artikllər.</p>
                    </div>
                </Link>
                <Link to="/practice" className="glass-card p-5 rounded-2xl flex items-center gap-4 hover:scale-[1.02] transition-all duration-200 border-l-4 border-primary">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-sm shrink-0">
                        <Brain size={24} />
                    </div>
                    <div>
                        <h3 className="font-black text-slate-800">Sözləri möhkəmləndir</h3>
                        <p className="text-xs text-slate-500">Flashcard və quiz ilə məşq et, nəticəni izlə.</p>
                    </div>
                </Link>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((cat) => (
                    <CategoryCard key={cat.to} {...cat} />
                ))}
            </div>

            {/* Random Tip - Compact */}
            {randomTip && (
                <div className="glass-card p-4 rounded-2xl border-l-4 border-primary">
                    <div className="flex items-start gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg text-2xl">
                            {randomTip.icon}
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-800 text-sm mb-1">{randomTip.title}</h4>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                {randomTip.description}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
