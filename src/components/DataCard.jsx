import React, { useState } from 'react';
import { Volume2, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { speak } from '../utils/speech';

const DataCard = ({ item, type }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const getArticleColor = (art) => {
        switch (art?.toLowerCase()) {
            case 'der': return 'text-blue-600 bg-blue-50 border-blue-100';
            case 'die': return 'text-rose-600 bg-rose-50 border-rose-100';
            case 'das': return 'text-emerald-600 bg-emerald-50 border-emerald-100';
            default: return 'text-slate-600 bg-slate-50 border-slate-100';
        }
    };

    return (
        <div className="glass-card rounded-xl overflow-hidden transition-all duration-200 hover:shadow-md">
            <div className="p-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                    {type === 'noun' && item.art && (
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border uppercase shrink-0 ${getArticleColor(item.art)}`}>
                            {item.art}
                        </span>
                    )}
                    <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-slate-800 text-sm break-words">
                            {type === 'noun' ? item.word : (item.infinitive || item.german || item.word)}
                        </h3>
                        <p className="text-xs text-slate-500 break-words">
                            {item.translation || item.meaning || item.comp || item.trans || item.azeri}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                    <button
                        onClick={() => speak(type === 'noun' ? `${item.art} ${item.word}` : (item.infinitive || item.german || item.word || item.phrase))}
                        className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                        title="Tələffüz"
                    >
                        <Volume2 size={16} />
                    </button>
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                </div>
            </div>

            {isExpanded && (
                <div className="px-3 pb-3 pt-1 border-t border-slate-50 bg-slate-50/50 animate-in slide-in-from-top-2 duration-200">
                    <div className="grid grid-cols-2 gap-3 text-[11px]">
                        {type === 'noun' && item.plural && (
                            <div>
                                <p className="text-slate-400 font-medium mb-0.5">Cəm forması</p>
                                <p className="text-slate-700 font-bold">{item.plural}</p>
                            </div>
                        )}
                        {type === 'verb' && item.partizip && (
                            <div>
                                <p className="text-slate-400 font-medium mb-0.5">Partizip II</p>
                                <p className="text-slate-700 font-bold">{item.partizip}</p>
                            </div>
                        )}
                        {type === 'adjective' && item.comparative && (
                            <div>
                                <p className="text-slate-400 font-medium mb-0.5">Müqayisə</p>
                                <p className="text-slate-700 font-bold">{item.comparative}</p>
                            </div>
                        )}
                        {item.cat && (
                            <div>
                                <p className="text-slate-400 font-medium mb-0.5">Kateqoriya</p>
                                <p className="text-slate-700 font-bold">{item.cat}</p>
                            </div>
                        )}
                    </div>

                    {(item.example || item.sentence) && (
                        <div className="mt-3 p-2 bg-white rounded-lg border border-slate-100">
                            <div className="flex items-center justify-between mb-1">
                                <p className="text-[10px] font-bold text-primary uppercase tracking-wider">Nümunə</p>
                                <button
                                    onClick={() => speak(item.example || item.sentence)}
                                    className="text-slate-300 hover:text-primary transition-colors"
                                >
                                    <Volume2 size={12} />
                                </button>
                            </div>
                            <p className="text-xs text-slate-700 font-medium italic leading-relaxed">
                                "{item.example || item.sentence}"
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default DataCard;
