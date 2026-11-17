import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const HERO_IMAGES = [
  {
    name: 'hero-home.webp',
    url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1000&auto=format&fit=crop&q=65&fm=webp'
  },
  {
    name: 'hero-explore.webp',
    url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1000&auto=format&fit=crop&q=65&fm=webp'
  },
  {
    name: 'hero-registrations.webp',
    url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=850&auto=format&fit=crop&q=50&fm=webp'
  },
  {
    name: 'hero-404.webp',
    url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=45&fm=webp'
  }
];

const destDir = path.join(__dirname, '..', 'public', 'images', 'hero');

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Status ${res.statusCode} for ${url}`));
      }
      const fileStream = fs.createWriteStream(dest);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close(() => {
          const stats = fs.statSync(dest);
          resolve(stats.size);
        });
      });
    }).on('error', reject);
  });
}

async function run() {
  console.log('Downloading background hero WebP images...');
  for (const img of HERO_IMAGES) {
    const dest = path.join(destDir, img.name);
    try {
      const size = await download(img.url, dest);
      console.log(`Downloaded ${img.name}: ${(size / 1024).toFixed(1)} KB`);
      if (size > 90 * 1024) {
        console.warn(`WARNING: ${img.name} is ${(size / 1024).toFixed(1)} KB which is > 90 KB!`);
      }
    } catch (err) {
      console.error(`Failed ${img.name}:`, err.message);
    }
  }
}

run();
