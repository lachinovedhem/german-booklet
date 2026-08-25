// PWA ikonlarını mənbə şəkildən (src/assets/favicon.png — kvadrat) yaradır.
// İşə salmaq: npm run pwa-icons
import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const src = path.join(root, 'src', 'assets', 'favicon.png');
const pub = path.join(root, 'public');

const WHITE = { r: 255, g: 255, b: 255, alpha: 1 };

// Adi ikon: şəkli ağ fonda kvadrata yerləşdir.
async function icon(size, out) {
    await sharp(src)
        .resize(size, size, { fit: 'contain', background: WHITE })
        .flatten({ background: WHITE })
        .png()
        .toFile(path.join(pub, out));
    console.log('✓', out, `${size}x${size}`);
}

// Maskable: təhlükəsiz zona üçün ~20% kənar boşluq saxla (logo ~76%).
async function maskable(size, out) {
    const inner = Math.round(size * 0.76);
    const pad = Math.round((size - inner) / 2);
    const logo = await sharp(src)
        .resize(inner, inner, { fit: 'contain', background: WHITE })
        .flatten({ background: WHITE })
        .toBuffer();
    await sharp({ create: { width: size, height: size, channels: 4, background: WHITE } })
        .composite([{ input: logo, top: pad, left: pad }])
        .png()
        .toFile(path.join(pub, out));
    console.log('✓', out, `${size}x${size} (maskable)`);
}

await icon(192, 'pwa-192x192.png');
await icon(512, 'pwa-512x512.png');
await icon(180, 'apple-touch-icon.png');
await maskable(512, 'maskable-512x512.png');
console.log('PWA ikonları hazırdır → public/');
