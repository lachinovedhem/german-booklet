import React, { useState, useMemo } from 'react';
import SearchBar from '../components/SearchBar';
import DataCard from '../components/DataCard';
import { useIncremental } from '../utils/useIncremental';
import { useLanguage } from '../i18n/LanguageContext';
import verbsData from '../data/verbs.json';
import { Zap } from 'lucide-react';

const VerbsPage = () => {
    const { t } = useLanguage();
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('all'); // all, irregular, modal
    const [priorityFilter, setPriorityFilter] = useState('all');

    const filteredData = useMemo(() => {
        const q = search.toLowerCase();
        return verbsData.filter(item => {
            const matchesSearch =
                item.infinitive.toLowerCase().includes(q) ||
                (item.meaning && item.meaning.toLowerCase().includes(q)) ||
                (item.en && item.en.toLowerCase().includes(q));

            const matchesPriority = priorityFilter === 'all' || item.priority === parseInt(priorityFilter);

            if (filter === 'irregular') return matchesSearch && matchesPriority && item.irregular;
            if (filter === 'modal') return matchesSearch && matchesPriority && item.modal;
            return matchesSearch && matchesPriority;
        });
    }, [search, filter, priorityFilter]);

    const { visible, hasMore, sentinelRef, total } = useIncremental(filteredData);

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Sticky Header and Filters */}
            <div className="sticky top-16 md:top-0 z-20 -mx-4 md:-mx-6 px-4 md:px-6 py-4 bg-slate-50/95 backdrop-blur-md border-b border-slate-200/50">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-4">
                    <div className="space-y-2">
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter">{t('verbs_title')}</h2>
                        <p className="text-slate-500 font-medium max-w-md hidden md:block">{t('verbs_sub')}</p>
                    </div>

                    <div className="flex gap-2 w-full md:w-auto">
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="flex-1 md:flex-none bg-white/50 backdrop-blur-md px-4 py-2.5 rounded-xl shadow-sm border border-white/60 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
                        >
                            <option value="all">{t('all')}</option>
                            <option value="irregular">{t('verbs_filter_irregular')}</option>
                            <option value="modal">{t('verbs_filter_modal')}</option>
                        </select>

                        <select
                            value={priorityFilter}
                            onChange={(e) => setPriorityFilter(e.target.value)}
                            className="flex-1 md:flex-none bg-white/50 backdrop-blur-md px-4 py-2.5 rounded-xl shadow-sm border border-white/60 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
                        >
                            <option value="all">{t('all')}</option>
                            <option value="1">{t('prio_1')}</option>
                            <option value="2">{t('prio_2')}</option>
                            <option value="3">{t('prio_3')}</option>
                            <option value="4">{t('prio_4')}</option>
                        </select>
                    </div>
                </div>

                <div className="relative">
                    <div className="absolute -inset-4 bg-rose-500/5 blur-3xl rounded-full pointer-events-none" />
                    <SearchBar value={search} onChange={setSearch} placeholder={t('verbs_search')} />
                </div>
            </div>


            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {visible.map((item) => (
                    <DataCard
                        key={item.infinitive}
                        type="verb"
                        item={item}
                    />
                ))}
            </div>

            {hasMore && (
                <div ref={sentinelRef} className="flex items-center justify-center py-8 text-xs font-medium text-slate-400">
                    <div className="w-5 h-5 border-2 border-slate-200 border-t-primary rounded-full animate-spin mr-2" />
                    {visible.length} / {total} {t('loading')}
                </div>
            )}

            {filteredData.length === 0 && (
                <div className="text-center py-32 bg-white/50 backdrop-blur-sm rounded-[40px] border-2 border-dashed border-slate-200">
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Zap size={32} className="text-slate-300" />
                    </div>
                    <p className="text-slate-400 font-black uppercase tracking-widest text-sm">{t('no_results_short')}</p>
                </div>
            )}
        </div>
    );
};

export default VerbsPage;
