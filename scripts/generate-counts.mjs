// Ana səhifədəki sayları kiçik bir counts.json faylına yığır.
// Beləliklə Home.jsx ağır data fayllarını (≈700 KB) import etməyə məcbur olmur.
// Datanı dəyişdikdən sonra işə salın:  npm run counts
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, '..', 'src', 'data');
const read = (f) => JSON.parse(fs.readFileSync(path.join(dataDir, f), 'utf8'));

const professions = read('professions.json');
const phrases = read('phrases.json');

const counts = {
    grammar: read('grammar.json').sections.length,
    nouns: read('nouns.json').length,
    verbs: read('verbs.json').length,
    adjectives: read('adjectives.json').length,
    professions: Object.values(professions.phrases).reduce((s, arr) => s + arr.length, 0),
    phrases: phrases.reduce((s, g) => s + g.items.length, 0),
    miscellaneous: read('miscellaneous.json').length,
};

const out = path.join(dataDir, 'counts.json');
fs.writeFileSync(out, JSON.stringify(counts, null, 2) + '\n');
console.log('counts.json yeniləndi:', counts);
