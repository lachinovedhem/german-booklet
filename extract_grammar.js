import fs from 'fs';
import { JSDOM } from 'jsdom';

const html = fs.readFileSync('c:/Users/Administrator/Desktop/deutsch/example/online.htm', 'utf8');
const dom = new JSDOM(html);
const document = dom.window.document;

const sections = [];
const phrases = [];
const sectionElements = document.querySelectorAll('section');

sectionElements.forEach(section => {
    const id = section.id;
    const title = section.querySelector('h2')?.textContent.trim() || '';
    const content = [];

    // Skip daily and hotel sections for grammar.json, they go to phrases.json
    if (id === 'daily' || id === 'hotel') {
        const category = id === 'daily' ? 'Gündəlik' : 'Hotel';
        const boxes = section.querySelectorAll('.example-box');
        boxes.forEach(box => {
            const boxTitle = box.querySelector('h4')?.textContent.trim() || '';
            const items = Array.from(box.querySelectorAll('.example-item')).map(item => {
                const german = item.querySelector('.german')?.textContent.trim() || '';
                const azeri = item.querySelector('.azeri')?.textContent.trim() || '';
                return { german, azeri };
            });
            if (items.length > 0) {
                phrases.push({
                    category,
                    subcategory: boxTitle,
                    items
                });
            }
        });
        return;
    }

    const children = Array.from(section.children);
    children.forEach(child => {
        if (child.tagName === 'H2') return;

        if (child.tagName === 'H3') {
            content.push({ type: 'h3', text: child.textContent.trim() });
        } else if (child.tagName === 'P') {
            content.push({ type: 'p', text: child.textContent.trim() });
        } else if (child.tagName === 'TABLE' || (child.tagName === 'DIV' && child.querySelector('table'))) {
            const table = child.tagName === 'TABLE' ? child : child.querySelector('table');
            const rows = [];
            const trs = table.querySelectorAll('tr');
            trs.forEach(tr => {
                const cells = Array.from(tr.querySelectorAll('th, td')).map(c => c.innerHTML.trim());
                rows.push(cells);
            });
            content.push({ type: 'table', rows });
        } else if (child.classList.contains('example-box')) {
            const items = Array.from(child.querySelectorAll('.example-item')).map(i => i.innerHTML.trim());
            const title = child.querySelector('h4')?.textContent.trim() || '';
            content.push({ type: 'example-box', title, items, class: child.className });
        } else if (child.classList.contains('grid')) {
            const boxes = Array.from(child.querySelectorAll('.example-box, .verb-conjugation')).map(box => {
                const title = box.querySelector('h4')?.textContent.trim() || '';
                const items = Array.from(box.querySelectorAll('.example-item')).map(i => i.innerHTML.trim());
                const p = Array.from(box.querySelectorAll('p')).map(p => p.innerHTML.trim());
                return { title, items, p, class: box.className };
            });
            content.push({ type: 'grid', boxes });
        } else if (child.classList.contains('tip')) {
            content.push({ type: 'tip', text: child.innerHTML.trim() });
        } else if (child.classList.contains('rule')) {
            content.push({ type: 'rule', text: child.innerHTML.trim() });
        }
    });

    sections.push({ id, title, content });
});

fs.writeFileSync('c:/Users/Administrator/Desktop/deutsch/german-booklet/src/data/grammar.json', JSON.stringify({ sections }, null, 2));
fs.writeFileSync('c:/Users/Administrator/Desktop/deutsch/german-booklet/src/data/phrases.json', JSON.stringify(phrases, null, 2));
console.log('Grammar and Phrases data extracted successfully!');
