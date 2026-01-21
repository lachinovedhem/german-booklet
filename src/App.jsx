import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import NounsPage from './pages/NounsPage';
import VerbsPage from './pages/VerbsPage';
import AdjectivesPage from './pages/AdjectivesPage';
import ProfessionsPage from './pages/ProfessionsPage';
import MiscellaneousPage from './pages/MiscellaneousPage';
import GrammarPage from './pages/GrammarPage';
import PhrasesPage from './pages/PhrasesPage';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="nouns" element={<NounsPage />} />
          <Route path="verbs" element={<VerbsPage />} />
          <Route path="adjectives" element={<AdjectivesPage />} />
          <Route path="professions" element={<ProfessionsPage />} />
          <Route path="grammar" element={<GrammarPage />} />
          <Route path="phrases" element={<PhrasesPage />} />
          <Route path="miscellaneous" element={<MiscellaneousPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
