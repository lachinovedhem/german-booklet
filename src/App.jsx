import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';

// Ana səhifə dərhal lazımdır, qalan səhifələr tələb olunduqda yüklənir (code-splitting).
import Home from './pages/Home';

const NounsPage = lazy(() => import('./pages/NounsPage'));
const VerbsPage = lazy(() => import('./pages/VerbsPage'));
const AdjectivesPage = lazy(() => import('./pages/AdjectivesPage'));
const ProfessionsPage = lazy(() => import('./pages/ProfessionsPage'));
const MiscellaneousPage = lazy(() => import('./pages/MiscellaneousPage'));
const FavoritesPage = lazy(() => import('./pages/FavoritesPage'));
const WordsHubPage = lazy(() => import('./pages/WordsHubPage'));
const GrammarPage = lazy(() => import('./pages/GrammarPage'));
const PhrasesPage = lazy(() => import('./pages/PhrasesPage'));
const BeginnerGuidePage = lazy(() => import('./pages/BeginnerGuidePage'));
const PracticePage = lazy(() => import('./pages/PracticePage'));

const PageLoader = () => (
    <div className="flex items-center justify-center py-32">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-primary rounded-full animate-spin" />
    </div>
);

function App() {
    return (
        <Router basename={import.meta.env.BASE_URL}>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="start" element={<Suspense fallback={<PageLoader />}><BeginnerGuidePage /></Suspense>} />
                    <Route path="practice" element={<Suspense fallback={<PageLoader />}><PracticePage /></Suspense>} />
                    <Route path="nouns" element={<Suspense fallback={<PageLoader />}><NounsPage /></Suspense>} />
                    <Route path="verbs" element={<Suspense fallback={<PageLoader />}><VerbsPage /></Suspense>} />
                    <Route path="adjectives" element={<Suspense fallback={<PageLoader />}><AdjectivesPage /></Suspense>} />
                    <Route path="professions" element={<Suspense fallback={<PageLoader />}><ProfessionsPage /></Suspense>} />
                    <Route path="grammar" element={<Suspense fallback={<PageLoader />}><GrammarPage /></Suspense>} />
                    <Route path="phrases" element={<Suspense fallback={<PageLoader />}><PhrasesPage /></Suspense>} />
                    <Route path="miscellaneous" element={<Suspense fallback={<PageLoader />}><MiscellaneousPage /></Suspense>} />
                    <Route path="favorites" element={<Suspense fallback={<PageLoader />}><FavoritesPage /></Suspense>} />
                    <Route path="words" element={<Suspense fallback={<PageLoader />}><WordsHubPage /></Suspense>} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
