import React, { useState, useEffect, useRef } from 'react';
import grammarData from '../data/grammar.json';
import { FileText, ChevronRight, List } from 'lucide-react';

const GrammarPage = () => {
    const [activeSection, setActiveSection] = useState(grammarData.sections[0]?.id);
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
    const observer = useRef(null);

    useEffect(() => {
        observer.current = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, {
            rootMargin: '-20% 0px -70% 0px'
        });

        grammarData.sections.forEach(section => {
            const el = document.getElementById(section.id);
            if (el) observer.current.observe(el);
        });

        return () => observer.current.disconnect();
    }, []);

    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (el) {
            const offset = 100;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = el.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
        setIsMobileNavOpen(false);
    };

    const renderContent = (content) => {
        return content.map((item, idx) => {
            switch (item.type) {
                case 'h3':
                    return <h3 key={idx} className="grammar-h3">{item.text}</h3>;
                case 'p':
                    return <p key={idx} className="text-base text-slate-600 mb-3 leading-relaxed" dangerouslySetInnerHTML={{ __html: item.text }} />;
                case 'table':
                    return (
                        <div key={idx} className="overflow-x-auto my-4">
                            <table className="grammar-table">
                                <thead>
                                    <tr>
                                        {item.rows[0].map((cell, i) => (
                                            <th key={i} dangerouslySetInnerHTML={{ __html: cell }} />
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {item.rows.slice(1).map((row, i) => (
                                        <tr key={i}>
                                            {row.map((cell, j) => (
                                                <td key={j} dangerouslySetInnerHTML={{ __html: cell }} />
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    );
                case 'example-box':
                case 'grid':
                    const boxes = item.type === 'example-box' ? [{ ...item }] : item.boxes;
                    return (
                        <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                            {boxes.map((box, i) => (
                                <div key={i} className={`example-box ${box.class?.includes('warning') ? 'warning' :
                                    box.class?.includes('success') ? 'success' :
                                        box.class?.includes('hotel') ? 'hotel' : ''
                                    }`}>
                                    {box.title && <h4 className="font-bold text-slate-800 text-sm mb-2">{box.title}</h4>}
                                    {box.p?.map((p, j) => <p key={j} className="text-xs text-slate-600 mb-2" dangerouslySetInnerHTML={{ __html: p }} />)}
                                    <div className="space-y-1.5">
                                        {box.items?.map((li, j) => (
                                            <div key={j} className="example-item" dangerouslySetInnerHTML={{ __html: li }} />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    );
                case 'tip':
                    return (
                        <div key={idx} className="tip" dangerouslySetInnerHTML={{ __html: item.text }} />
                    );
                case 'rule':
                    return (
                        <div key={idx} className="rule" dangerouslySetInnerHTML={{ __html: item.text }} />
                    );
                case 'html':
                    return <div key={idx} dangerouslySetInnerHTML={{ __html: item.html }} />;
                default:
                    return null;
            }
        });
    };

    return (
        <div className="flex flex-col lg:flex-row gap-6 relative">
            {/* Mobile Quick Nav Trigger */}
            <div className="lg:hidden sticky top-16 z-30 -mx-4 px-4 py-2 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Mövzular</span>
                <button
                    onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-rose-50 text-rose-600 rounded-lg text-xs font-bold transition-all active:scale-95"
                >
                    <List size={14} />
                    {grammarData.sections.find(s => s.id === activeSection)?.title.split('.')[1]?.trim() || 'Seçin'}
                </button>
            </div>

            {/* Mobile Nav Overlay */}
            {isMobileNavOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setIsMobileNavOpen(false)}
                />
            )}

            {/* Mobile Nav Menu */}
            <div className={`fixed inset-x-0 bottom-0 z-50 lg:hidden bg-white rounded-t-3xl shadow-2xl transition-transform duration-300 transform ${isMobileNavOpen ? 'translate-y-0' : 'translate-y-full'}`}>
                <div className="p-6 max-h-[70vh] overflow-y-auto">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-slate-800">Mövzular</h2>
                        <button onClick={() => setIsMobileNavOpen(false)} className="p-2 hover:bg-slate-100 rounded-full">
                            <ChevronRight size={20} className="rotate-90" />
                        </button>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                        {grammarData.sections.map(section => (
                            <button
                                key={section.id}
                                onClick={() => scrollToSection(section.id)}
                                className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all ${activeSection === section.id
                                    ? 'bg-rose-600 text-white font-bold shadow-lg'
                                    : 'text-slate-600 hover:bg-slate-50 border border-slate-100'
                                    }`}
                            >
                                {section.title}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick Nav - Desktop */}
            <aside className="hidden lg:block w-64 shrink-0 sticky top-24 self-start space-y-1">
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-3 mb-3">Mövzular</h2>
                {grammarData.sections.map(section => (
                    <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${activeSection === section.id
                            ? 'bg-rose-600 text-white font-bold shadow-md'
                            : 'text-slate-600 hover:bg-slate-100'
                            }`}
                    >
                        {section.title.split('.')[1]?.trim() || section.title}
                    </button>
                ))}
            </aside>

            {/* Content */}
            <div className="flex-1 space-y-8">
                {grammarData.sections.map(section => (
                    <section key={section.id} id={section.id} className="grammar-section scroll-mt-24">
                        <h2 className="grammar-h2">{section.title}</h2>
                        <div>
                            {renderContent(section.content)}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
};

export default GrammarPage;
