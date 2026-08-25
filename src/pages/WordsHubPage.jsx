import React from 'react';
import { Link } from 'react-router-dom';
import {
    BookOpen,
    Zap,
    Sparkles,
    Briefcase,
    MessageSquare,
    Layers,
    ChevronRight,
    Search
} from 'lucide-react';

const HubCard = ({ to, icon: Icon, label, description, color }) => (
    <Link
        to={to}
        className="glass-card p-5 rounded-[2rem] flex items-center justify-between hover:scale-[1.02] transition-all duration-300 group shadow-sm hover:shadow-xl border border-white/50"
    >
        <div className="flex items-center gap-5">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-white shadow-lg transform group-hover:rotate-6 transition-transform duration-300`}>
                <Icon size={28} />
            </div>
            <div>
                <h3 className="font-black text-slate-800 text-lg tracking-tight">{label}</h3>
                <p className="text-sm text-slate-500 font-medium">{description}</p>
            </div>
        </div>
        <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:text-primary group-hover:bg-primary/5 transition-all">
            <ChevronRight size={20} />
        </div>
    </Link>
);

const WordsHubPage = () => {
    const categories = [
        { to: '/nouns', icon: BookOpen, label: 'İsimlər', description: 'Artikllər və cəm formaları', color: 'from-blue-500 to-indigo-600' },
        { to: '/verbs', icon: Zap, label: 'Fellər', description: 'Zamanlar və qaydasız fellər', color: 'from-rose-500 to-orange-600' },
        { to: '/adjectives', icon: Sparkles, label: 'Sifətlər', description: 'Müqayisə və xüsusiyyətlər', color: 'from-purple-500 to-fuchsia-600' },
        { to: '/professions', icon: Briefcase, label: 'Peşələr', description: 'İş dünyasına dair ifadələr', color: 'from-amber-400 to-orange-500' },
        { to: '/phrases', icon: MessageSquare, label: 'İfadələr', description: 'Gündəlik danışıq qəlibləri', color: 'from-emerald-500 to-teal-600' },
        { to: '/miscellaneous', icon: Layers, label: 'Digər', description: 'Saylar, əvəzliklər və zərflər', color: 'from-slate-600 to-slate-800' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col gap-2">
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">Söz Ehtiyatı</h2>
                <p className="text-slate-500 font-medium text-lg">Alman dilində ən çox istifadə olunan sözlər və ifadələr.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categories.map((cat) => (
                    <HubCard key={cat.to} {...cat} />
                ))}
            </div>

            <div className="p-8 rounded-[2.5rem] bg-gradient-to-r from-primary to-indigo-600 text-white relative overflow-hidden shadow-2xl">
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="text-center md:text-left">
                        <h3 className="text-2xl font-black mb-2 tracking-tight">Hər şeyi axtar</h3>
                        <p className="text-blue-100/80 font-medium">Bütün bölmələr üzrə sürətli axtarış funksiyası çox yaxında!</p>
                    </div>
                    <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                        <Search size={32} className="text-white" />
                    </div>
                </div>
                {/* Decoration */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
            </div>
        </div>
    );
};

export default WordsHubPage;
