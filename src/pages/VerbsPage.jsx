import React, { useState, useMemo } from 'react';
import SearchBar from '../components/SearchBar';
import DataCard from '../components/DataCard';
import verbsData from '../data/verbs.json';
import { Zap } from 'lucide-react';

const VerbsPage = () => {
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('all'); // all, irregular, modal
    const [priorityFilter, setPriorityFilter] = useState('all');

    const filteredData = useMemo(() => {
        return verbsData.filter(item => {
            const matchesSearch =
                item.infinitive.toLowerCase().includes(search.toLowerCase()) ||
                item.meaning.toLowerCase().includes(search.toLowerCase());

            const matchesPriority = priorityFilter === 'all' || item.priority === parseInt(priorityFilter);

            if (filter === 'irregular') return matchesSearch && matchesPriority && item.irregular;
            if (filter === 'modal') return matchesSearch && matchesPriority && item.modal;
            return matchesSearch && matchesPriority;
        });
    }, [search, filter, priorityFilter]);

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Sticky Header and Filters */}
            <div className="sticky top-16 md:top-0 z-20 -mx-4 md:-mx-6 px-4 md:px-6 py-4 bg-slate-50/95 backdrop-blur-md border-b border-slate-200/50">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-4">
                    <div className="space-y-2">
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter">Fellər</h2>
                        <p className="text-slate-500 font-medium max-w-md hidden md:block">Zaman formaları, köməkçi fellər və nümunə cümlələr.</p>
                    </div>

                    <div className="flex gap-2 w-full md:w-auto">
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="flex-1 md:flex-none bg-white/50 backdrop-blur-md px-4 py-2.5 rounded-xl shadow-sm border border-white/60 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
                        >
                            <option value="all">Hamısı</option>
                            <option value="irregular">Qaydasız</option>
                            <option value="modal">Modal</option>
                        </select>

                        <select
                            value={priorityFilter}
                            onChange={(e) => setPriorityFilter(e.target.value)}
                            className="flex-1 md:flex-none bg-white/50 backdrop-blur-md px-4 py-2.5 rounded-xl shadow-sm border border-white/60 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
                        >
                            <option value="all">Hamısı</option>
                            <option value="1">Çox vacib</option>
                            <option value="2">Vacib</option>
                            <option value="3">Orta</option>
                            <option value="4">Nadir</option>
                        </select>
                    </div>
                </div>

                <div className="relative">
                    <div className="absolute -inset-4 bg-rose-500/5 blur-3xl rounded-full pointer-events-none" />
                    <SearchBar value={search} onChange={setSearch} placeholder="Fel və ya məna axtar..." />
                </div>
            </div>


            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredData.map((item, idx) => (
                    <DataCard
                        key={idx}
                        type="verb"
                        item={item}
                    />
                ))}
            </div>

            {filteredData.length === 0 && (
                <div className="text-center py-32 bg-white/50 backdrop-blur-sm rounded-[40px] border-2 border-dashed border-slate-200">
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Zap size={32} className="text-slate-300" />
                    </div>
                    <p className="text-slate-400 font-black uppercase tracking-widest text-sm">Heç bir nəticə tapılmadı</p>
                </div>
            )}
        </div>
    );
};

export default VerbsPage;
