import React, { useState, useEffect } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import {
    Home,
    BookOpen,
    Zap,
    Star,
    Briefcase,
    FileText,
    MessageSquare,
    Layers,
    Menu,
    X,
    Sparkles,
    Search,
    GraduationCap,
    Brain
} from 'lucide-react';
import logo from '../assets/logo.png';

const NavItem = ({ to, icon: Icon, label, active, onClick }) => (
    <Link
        to={to}
        onClick={onClick}
        className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 group ${active
            ? 'bg-primary text-white shadow-md'
            : 'text-slate-600 hover:bg-slate-100'
            }`}
    >
        <Icon size={18} className={active ? 'text-white' : 'text-slate-400 group-hover:text-primary'} />
        <span className="font-medium text-sm">{label}</span>
    </Link>
);

const Layout = () => {
    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { to: '/', icon: Home, label: 'Ana Səhifə' },
        { to: '/start', icon: GraduationCap, label: 'Başlanğıc' },
        { to: '/practice', icon: Brain, label: 'Məşq' },
        { to: '/grammar', icon: FileText, label: 'Qrammatika' },
        { to: '/favorites', icon: Star, label: 'Seçilmişlər' },
        { to: '/nouns', icon: BookOpen, label: 'İsimlər' },
        { to: '/verbs', icon: Zap, label: 'Fellər' },
        { to: '/adjectives', icon: Sparkles, label: 'Sifətlər' },
        { to: '/professions', icon: Briefcase, label: 'Peşələr' },
        { to: '/phrases', icon: MessageSquare, label: 'İfadələr' },
        { to: '/miscellaneous', icon: Layers, label: 'Digər' },
    ];

    const mobileNavItems = [
        { to: '/', icon: Home, label: 'Ana Səhifə' },
        { to: '/start', icon: GraduationCap, label: 'Başlanğıc' },
        { to: '/words', icon: Search, label: 'Sözlər' },
        { to: '/practice', icon: Brain, label: 'Məşq' },
        { to: '/favorites', icon: Star, label: 'Seçilmişlər' },
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex w-56 flex-col fixed inset-y-0 left-0 bg-white border-r border-slate-200 z-50">
                <div className="p-2 border-b border-slate-100 flex items-center justify-center">
                    <img src={logo} alt="alida logo" className="h-14 w-auto object-contain" />
                </div>

                <nav className="flex-1 p-3 space-y-1 overflow-y-auto no-scrollbar">
                    {navItems.map((item) => (
                        <NavItem
                            key={item.to}
                            {...item}
                            active={location.pathname === item.to}
                        />
                    ))}
                </nav>
            </aside>

            {/* Mobile Header */}
            <header className={`md:hidden fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass-nav py-2 shadow-sm' : 'bg-white py-3 border-b border-slate-100'
                }`}>
                <div className="px-4 flex items-center justify-between">
                    <div className="flex items-center justify-center w-full">
                        <img src={logo} alt="alida logo" className="h-10 w-auto object-contain" />
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 md:ml-56 pb-20 md:pb-0">
                <div className="max-w-[1440px] mx-auto px-4 pt-20 md:pt-6 md:px-8">
                    <Outlet />
                </div>
            </main>

            {/* Mobile Bottom Nav */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 glass-nav border-t border-slate-200 px-2 py-1 z-50">
                <div className="flex justify-around items-center px-2">
                    {mobileNavItems.map((item) => {
                        const isActive = location.pathname === item.to || (item.to === '/words' && [
                            '/nouns', '/verbs', '/adjectives', '/professions', '/phrases', '/miscellaneous'
                        ].includes(location.pathname));

                        return (
                            <Link
                                key={item.to}
                                to={item.to}
                                className={`flex flex-col items-center p-2 rounded-xl transition-all min-w-[64px] ${isActive ? 'text-primary scale-110' : 'text-slate-400'
                                    }`}
                            >
                                <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                                <span className={`text-[10px] font-bold mt-1 ${isActive ? 'text-primary' : 'text-slate-500'}`}>
                                    {item.label}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </nav>
        </div>
    );
};

export default Layout;
