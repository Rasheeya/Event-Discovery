import fs from 'fs';
import path from 'path';

const eventsDir = path.resolve('public', 'images', 'events');
const speakersDir = path.resolve('public', 'images', 'speakers');
const avatarsDir = path.resolve('public', 'images', 'avatars');

fs.mkdirSync(eventsDir, { recursive: true });
fs.mkdirSync(speakersDir, { recursive: true });
fs.mkdirSync(avatarsDir, { recursive: true });

// 14 unique event photo IDs on Unsplash (real workshops, tech conferences, design studios)
const eventPhotos = [
  { id: 'event-1', url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87' }, // Conference hall
  { id: 'event-2', url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee' }, // Code / react
  { id: 'event-3', url: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e' }, // Figma / UI design
  { id: 'event-4', url: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7' }, // Startup pitch
  { id: 'event-5', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71' }, // Data analytics
  { id: 'event-6', url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97' }, // Developers coding
  { id: 'event-7', url: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12' }, // Product whiteboard
  { id: 'event-8', url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa' }, // Cloud network
  { id: 'event-9', url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7' }, // Classroom STEM
  { id: 'event-10', url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998' }, // Design thinking
  { id: 'event-11', url: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247' }, // FinTech blockchain
  { id: 'event-12', url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3' }, // Cyber defense
  { id: 'event-13', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe' }, // Generative art
  { id: 'event-14', url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c' }, // Web dev collab
];

// 14 unique real-life speaker portraits
const speakerPhotos = [
  { id: 'speaker-1', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2' },
  { id: 'speaker-2', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d' },
  { id: 'speaker-3', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb' },
  { id: 'speaker-4', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e' },
  { id: 'speaker-5', url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e' },
  { id: 'speaker-6', url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956' },
  { id: 'speaker-7', url: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61' },
  { id: 'speaker-8', url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2' },
  { id: 'speaker-9', url: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e' },
  { id: 'speaker-10', url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d' },
  { id: 'speaker-11', url: 'https://images.unsplash.com/photo-1573496799652-408c2ac9fe98' },
  { id: 'speaker-12', url: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea' },
  { id: 'speaker-13', url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7' },
  { id: 'speaker-14', url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6' },
];

async function downloadAll() {
  console.log('Downloading unique WebP images under 99KB...');
  
  for (const item of eventPhotos) {
    const dest = path.join(eventsDir, `${item.id}.webp`);
    try {
      const resp = await fetch(`${item.url}?auto=format&fit=crop&w=720&q=75&fm=webp`);
      const buffer = Buffer.from(await resp.arrayBuffer());
      fs.writeFileSync(dest, buffer);
      console.log(`Saved ${dest} (${(buffer.length / 1024).toFixed(1)} KB)`);
    } catch (e) {
      console.error(`Error downloading ${item.id}`, e.message);
    }
  }

  for (const item of speakerPhotos) {
    const dest = path.join(speakersDir, `${item.id}.webp`);
    try {
      const resp = await fetch(`${item.url}?auto=format&fit=crop&w=320&q=75&fm=webp`);
      const buffer = Buffer.from(await resp.arrayBuffer());
      fs.writeFileSync(dest, buffer);
      console.log(`Saved ${dest} (${(buffer.length / 1024).toFixed(1)} KB)`);
    } catch (e) {
      console.error(`Error downloading ${item.id}`, e.message);
    }
  }

  console.log('Finished downloading all assets!');
}

downloadAll();
