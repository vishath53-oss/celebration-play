/**
 * Centralized Media Data Manifest
 * Lists all uploaded photos and videos for Savitha's Birthday Website.
 * 
 * Sources:
 * - savitha alone/   -> public/media/alone/  (3 items, .jpeg)
 * - savitha grp photo/ -> public/media/group/  (46 items, .jpg)
 * - savtiha videos/   -> public/media/videos/ (8 items, .mp4)
 */

export interface MediaItem {
  id: string;
  title: string;
  filename: string;
  url: string;
  category: 'alone' | 'group' | 'video';
  caption: string;
  type: 'image' | 'video';
  orientation?: 'landscape' | 'portrait';
}

// 1. Individual photos of Savitha
export const SAVITHA_ALONE_PHOTOS: MediaItem[] = [
  {
    id: 'alone-1',
    title: 'Savitha — Birthday Star',
    filename: 'WhatsApp Image 2026-10-20 at 9.03.04 PM.jpeg',
    url: '/media/alone/WhatsApp Image 2026-10-20 at 9.03.04 PM.jpeg',
    category: 'alone',
    caption: 'Savitha in her element ✨',
    type: 'image',
    orientation: 'portrait',
  },
  {
    id: 'alone-2',
    title: 'Radiant Smile',
    filename: 'WhatsApp Image 2026-10-20 at 9.03.05 PM.jpeg',
    url: '/media/alone/WhatsApp Image 2026-10-20 at 9.03.05 PM.jpeg',
    category: 'alone',
    caption: 'That signature warm smile 🌸',
    type: 'image',
    orientation: 'portrait',
  },
  {
    id: 'alone-3',
    title: 'Birthday Portrait',
    filename: 'WhatsApp Image 2026-10-20 at 9.03.06 PM.jpeg',
    url: '/media/alone/WhatsApp Image 2026-10-20 at 9.03.06 PM.jpeg',
    category: 'alone',
    caption: 'The one and only thangaveluuuuuuu 💜',
    type: 'image',
    orientation: 'portrait',
  },
];

// 2. Group photos with friends (all 46 verified files from savitha grp photo)
const GROUP_FILENAMES: string[] = [
  '1782491718879.jpg',
  '1782491718985.jpg',
  '1782491719053.jpg',
  '1782491719065.jpg',
  '20260612_133612.jpg',
  '20260612_133617.jpg',
  '20260629_150659.jpg',
  '20260629_150859.jpg',
  '20260807_190016.jpg',
  '20260926_133336.jpg',
  '20260926_143726.jpg',
  '20260926_143738.jpg',
  '20261014_061538.jpg',
  '20261014_061612.jpg',
  '20261014_061628.jpg',
  '20261014_061959.jpg',
  '20261014_064527.jpg',
  '20261014_195929.jpg',
  '20261014_195931.jpg',
  '20261014_195934.jpg',
  'IMG-20260626-WA0082.jpg',
  'IMG-20260801-WA0015.jpg',
  'IMG-20260919-WA0020.jpg',
  'IMG-20260930-WA0041.jpg',
  'IMG-20260930-WA0050.jpg',
  'IMG-20260930-WA0054.jpg',
  'IMG-20261015-WA0052.jpg',
  'IMG-20261015-WA0053.jpg',
  'IMG-20261015-WA0065.jpg',
  'IMG-20261015-WA0068.jpg',
  'IMG-20261015-WA0072.jpg',
  'IMG-20261019-WA0059.jpg',
  'IMG-20261019-WA0061.jpg',
  'IMG-20261019-WA0066.jpg',
  'IMG-20261019-WA0068.jpg',
  'IMG-20261019-WA0070.jpg',
  'Screenshot_20260930_235351_WhatsApp.jpg',
  'WIN_20260731_12_13_31_Pro.jpg',
  'WIN_20260731_12_13_49_Pro.jpg',
  'WIN_20260731_12_14_49_Pro.jpg',
  'WIN_20260731_12_14_50_Pro.jpg',
  'WIN_20260731_12_15_55_Pro.jpg',
  'WIN_20260731_12_17_53_Pro.jpg',
  'WIN_20260731_12_17_55_Pro.jpg',
  'WIN_20260731_12_17_56_Pro.jpg',
  'WIN_20260731_12_18_03_Pro.jpg',
  'WhatsApp Image 2026-10-21 at 7.51.36 PM.jpeg',
  'WhatsApp Image 2026-10-21 at 7.53.06 PM.jpeg',
  'WhatsApp Image 2026-10-23 at 9.28.49 PM.jpeg',
];

export const SAVITHA_GROUP_PHOTOS: MediaItem[] = GROUP_FILENAMES.map((filename, index) => ({
  id: `group-${index + 1}`,
  title: `Memory #${index + 1}`,
  filename,
  url: `/media/group/${filename}`,
  category: 'group',
  caption: `Friendship moment #${index + 1} with Savitha`,
  type: 'image',
  orientation: (filename === 'IMG-20261015-WA0053.jpg' || filename === 'IMG-20260930-WA0050.jpg' || filename === 'IMG-20261015-WA0065.jpg') ? 'portrait' : 'landscape',
}));

// Curated 7 photos for Mystery Moment Cards
export const SAVITHA_MYSTERY_PHOTOS: MediaItem[] = [
  {
    id: 'mystery-1',
    title: 'Mystery Memory #1: Spontaneous Outing',
    filename: '20260629_150659.jpg',
    url: '/media/group/20260629_150659.jpg',
    category: 'group',
    caption: 'Classic squad chaos and genuine smiles ✨',
    type: 'image',
    orientation: 'landscape',
  },
  {
    id: 'mystery-2',
    title: 'Mystery Memory #2: Candid Friendship Glow',
    filename: 'IMG-20260930-WA0050.jpg',
    url: '/media/group/IMG-20260930-WA0050.jpg',
    category: 'group',
    caption: 'The brightest smile in the room 🌸',
    type: 'image',
    orientation: 'portrait',
  },
  {
    id: 'mystery-3',
    title: 'Mystery Memory #3: Gang Smiles Unlocked',
    filename: 'IMG-20260930-WA0054.jpg',
    url: '/media/group/IMG-20260930-WA0054.jpg',
    category: 'group',
    caption: 'Together through every adventure and giggle 💖',
    type: 'image',
    orientation: 'landscape',
  },
  {
    id: 'mystery-4',
    title: 'Mystery Memory #4: Festive Vibes & Fun',
    filename: 'IMG-20261015-WA0065.jpg',
    url: '/media/group/IMG-20261015-WA0065.jpg',
    category: 'group',
    caption: 'Celebration energy with the best people 🎉',
    type: 'image',
    orientation: 'portrait',
  },
  {
    id: 'mystery-5',
    title: 'Mystery Memory #5: WhatsApp Late Night Story',
    filename: 'Screenshot_20260930_235351_WhatsApp.jpg',
    url: '/media/group/Screenshot_20260930_235351_WhatsApp.jpg',
    category: 'group',
    caption: 'Caught in 4K — the late night banter 📱',
    type: 'image',
    orientation: 'landscape',
  },
  {
    id: 'mystery-6',
    title: 'Mystery Memory #6: Unfiltered Laughter in 4K',
    filename: 'WhatsApp Image 2026-10-21 at 7.51.36 PM.jpeg',
    url: '/media/group/WhatsApp Image 2026-10-21 at 7.51.36 PM.jpeg',
    category: 'group',
    caption: '100% wholesome laughter & pure gold moments 🌟',
    type: 'image',
    orientation: 'landscape',
  },
  {
    id: 'mystery-7',
    title: 'Mystery Memory #7: Memories That Last Forever',
    filename: 'WhatsApp Image 2026-10-21 at 7.53.06 PM.jpeg',
    url: '/media/group/WhatsApp Image 2026-10-21 at 7.53.06 PM.jpeg',
    category: 'group',
    caption: 'Friendship that grows sweeter with time 💜',
    type: 'image',
    orientation: 'landscape',
  },
  {
    id: 'mystery-8',
    title: 'Mystery Memory #8: Classroom Presentation Squad',
    filename: 'IMG-20260801-WA0015.jpg',
    url: '/media/group/IMG-20260801-WA0015.jpg',
    category: 'group',
    caption: 'Classroom presentations & squad energy forever 🎓✨',
    type: 'image',
    orientation: 'landscape',
  },
];

// Specific photo for the Birthday Invoice Section
export const INVOICE_PHOTO: MediaItem = {
  id: 'invoice-photo',
  title: 'Treasured Squad Memory',
  filename: 'IMG-20261019-WA0070.jpg',
  url: '/media/group/IMG-20261019-WA0070.jpg',
  category: 'group',
  caption: 'Unconditional friendship and unforgettable laughs ✨',
  type: 'image',
  orientation: 'landscape',
};

// Specific photo for the Guess the Moment Trivia
export const GUESS_MOMENT_PHOTO: MediaItem = {
  id: 'guess-moment-photo',
  title: 'Our First Group Pic',
  filename: 'IMG-20260626-WA0082.jpg',
  url: '/media/group/IMG-20260626-WA0082.jpg',
  category: 'group',
  caption: 'The unforgettable first group photo in the classroom ✨',
  type: 'image',
  orientation: 'landscape',
};


export const SAVITHA_FUN_ZONE_PHOTOS: MediaItem[] = [
  {
    id: 'fun-1',
    title: 'The Unfiltered Squad Vibes',
    filename: 'WIN_20260731_12_18_03_Pro.jpg',
    url: '/media/group/WIN_20260731_12_18_03_Pro.jpg',
    category: 'group',
    caption: '100% candid smiles & pure squad madness 📸',
    type: 'image',
    orientation: 'landscape',
  },
  {
    id: 'fun-2',
    title: 'Classroom & Lab Shenanigans',
    filename: 'IMG-20261019-WA0068.jpg',
    url: '/media/group/IMG-20261019-WA0068.jpg',
    category: 'group',
    caption: 'Making memories even in serious times 🤣',
    type: 'image',
    orientation: 'landscape',
  },
  {
    id: 'fun-3',
    title: 'Gorgeous Traditional Celebration',
    filename: 'IMG-20261015-WA0053.jpg',
    url: '/media/group/IMG-20261015-WA0053.jpg',
    category: 'group',
    caption: 'Radiant festive glow with besties 🌸',
    type: 'image',
    orientation: 'portrait',
  },
  {
    id: 'fun-4',
    title: 'Sunny Campus Hangouts',
    filename: 'IMG-20260919-WA0020.jpg',
    url: '/media/group/IMG-20260919-WA0020.jpg',
    category: 'group',
    caption: 'Sunlit afternoon stories & endless laughs ☀️',
    type: 'image',
    orientation: 'landscape',
  },
  {
    id: 'fun-5',
    title: 'Classic Friendship Pose',
    filename: '1782491719065.jpg',
    url: '/media/group/1782491719065.jpg',
    category: 'group',
    caption: 'The gang that laughs together stays together 💖',
    type: 'image',
    orientation: 'landscape',
  },
  {
    id: 'fun-6',
    title: 'Night Out Energy & Bonding',
    filename: '20261014_195931.jpg',
    url: '/media/group/20261014_195931.jpg',
    category: 'group',
    caption: 'Late evening meetups that felt like 5 minutes ✨',
    type: 'image',
    orientation: 'landscape',
  },
  {
    id: 'fun-7',
    title: 'Front Bench Champions',
    filename: '20260612_133612.jpg',
    url: '/media/group/20260612_133612.jpg',
    category: 'group',
    caption: 'Unstoppable gang energy forever 👑',
    type: 'image',
    orientation: 'landscape',
  },
  {
    id: 'fun-8',
    title: 'Unforgettable Squad Moments',
    filename: 'WhatsApp Image 2026-10-23 at 9.28.49 PM.jpeg',
    url: '/media/group/WhatsApp Image 2026-10-23 at 9.28.49 PM.jpeg',
    category: 'group',
    caption: 'More laughter, more fun, and endless memories with Savitha ✨',
    type: 'image',
    orientation: 'landscape',
  },
];

// 3. Videos of Savitha & friends (all 13 verified files from savtiha videos)
// Missing videos kept at the FRONT as requested
export const SAVITHA_VIDEOS: MediaItem[] = [
  // --- 5 PREVIOUSLY MISSING VIDEOS (PLACED AT THE VERY FRONT) ---
  {
    id: 'video-yy',
    title: 'Special Birthday Reel (yy)',
    filename: 'yy.mp4',
    url: '/media/videos/yy.mp4',
    category: 'video',
    caption: 'Unforgettable moments with Savitha ✨',
    type: 'video',
    orientation: 'landscape',
  },
  {
    id: 'video-wa-94733',
    title: 'Squad Gathering & Cheers',
    filename: 'WhatsApp Video 2026-10-22 at 9.47.33 PM.mp4',
    url: '/media/videos/WhatsApp Video 2026-10-22 at 9.47.33 PM.mp4',
    category: 'video',
    caption: 'The whole crew together celebrating 🌟',
    type: 'video',
    orientation: 'landscape',
  },
  {
    id: 'video-wa-94731',
    title: 'Unfiltered Joy & Fun',
    filename: 'WhatsApp Video 2026-10-22 at 9.47.31 PM.mp4',
    url: '/media/videos/WhatsApp Video 2026-10-22 at 9.47.31 PM.mp4',
    category: 'video',
    caption: 'Smiles that light up the entire room 💖',
    type: 'video',
    orientation: 'landscape',
  },
  {
    id: 'video-wa-94732',
    title: 'Sweet Memories Recorded',
    filename: 'WhatsApp Video 2026-10-22 at 9.47.32 PM.mp4',
    url: '/media/videos/WhatsApp Video 2026-10-22 at 9.47.32 PM.mp4',
    category: 'video',
    caption: 'Treasured candid friendship clip 🎬',
    type: 'video',
    orientation: 'landscape',
  },
  {
    id: 'video-wa-94255',
    title: 'Laughter & Little Surprises',
    filename: 'WhatsApp Video 2026-10-22 at 9.42.55 PM.mp4',
    url: '/media/videos/WhatsApp Video 2026-10-22 at 9.42.55 PM.mp4',
    category: 'video',
    caption: 'Spontaneous happiness in motion 🥳',
    type: 'video',
    orientation: 'landscape',
  },

  // --- EXISTING 8 VIDEOS ---
  {
    id: 'video-1',
    title: 'Fun Times & Laughs 1',
    filename: 'WIN_20260731_12_16_01_Pro.mp4',
    url: '/media/videos/WIN_20260731_12_16_01_Pro.mp4',
    category: 'video',
    caption: 'Unfiltered laughter and candid moments 🎥',
    type: 'video',
    orientation: 'landscape',
  },
  {
    id: 'video-2',
    title: 'Fun Times & Laughs 2',
    filename: 'WIN_20260731_12_16_41_Pro.mp4',
    url: '/media/videos/WIN_20260731_12_16_41_Pro.mp4',
    category: 'video',
    caption: 'Memories frozen in motion 🎬',
    type: 'video',
    orientation: 'landscape',
  },
  {
    id: 'video-3',
    title: 'Celebration Clip 1',
    filename: 'WhatsApp Video 2026-10-20 at 8.48.03 PM.mp4',
    url: '/media/videos/WhatsApp Video 2026-10-20 at 8.48.03 PM.mp4',
    category: 'video',
    caption: 'Cherished friendship clip ✨',
    type: 'video',
    orientation: 'landscape',
  },
  {
    id: 'video-4',
    title: 'Celebration Reel 1',
    filename: 'WhatsApp Video 2026-10-20 at 8.51.18 PM.mp4',
    url: '/media/videos/WhatsApp Video 2026-10-20 at 8.51.18 PM.mp4',
    category: 'video',
    caption: 'Good vibes and smiles 🌟',
    type: 'video',
    orientation: 'portrait',
  },
  {
    id: 'video-5',
    title: 'Celebration Reel 2',
    filename: 'WhatsApp Video 2026-10-20 at 8.51.19 PM.mp4',
    url: '/media/videos/WhatsApp Video 2026-10-20 at 8.51.19 PM.mp4',
    category: 'video',
    caption: 'Moments we will always remember 💖',
    type: 'video',
    orientation: 'portrait',
  },
  {
    id: 'video-6',
    title: 'Celebration Reel 3',
    filename: 'WhatsApp Video 2026-10-20 at 8.51.20 PM.mp4',
    url: '/media/videos/WhatsApp Video 2026-10-20 at 8.51.20 PM.mp4',
    category: 'video',
    caption: 'Pure happiness recorded 🥳',
    type: 'video',
    orientation: 'portrait',
  },
  {
    id: 'video-7',
    title: 'Special Memory (mm)',
    filename: 'mm.mp4',
    url: '/media/videos/mm.mp4',
    category: 'video',
    caption: 'Short & sweet candid memory 📹',
    type: 'video',
    orientation: 'landscape',
  },
  {
    id: 'video-8',
    title: 'Special Memory Reel (ss)',
    filename: 'ss.mp4',
    url: '/media/videos/ss.mp4',
    category: 'video',
    caption: 'Classic Savitha vibe 🎈',
    type: 'video',
    orientation: 'portrait',
  },
];

export const ALL_MEDIA: MediaItem[] = [
  ...SAVITHA_ALONE_PHOTOS,
  ...SAVITHA_GROUP_PHOTOS,
  ...SAVITHA_VIDEOS,
];

// 51 Image Photos split into 2 halves:
// 1. First 26 photos for Mosaic Wall (Section 3)
export const MOSAIC_WALL_PHOTOS: MediaItem[] = [
  ...SAVITHA_ALONE_PHOTOS,
  ...SAVITHA_GROUP_PHOTOS,
].slice(0, 26);

// 2. Next 25 photos for Cinematic Reel (after the letter)
export const CINEMATIC_REEL_PHOTOS: MediaItem[] = [
  ...SAVITHA_ALONE_PHOTOS,
  ...SAVITHA_GROUP_PHOTOS,
].slice(26);

// Special Hidden Picture Surprise (WhatsApp Image 2026-10-22 at 9.39.45 PM.jpeg)
export const SPECIAL_SURPRISE_PHOTO: MediaItem = {
  id: 'special-cake-surprise',
  title: 'One Little Picture, A Million Memories',
  filename: 'WhatsApp Image 2026-10-22 at 9.39.45 PM.jpeg',
  url: '/media/special/WhatsApp Image 2026-10-22 at 9.39.45 PM.jpeg',
  category: 'alone',
  caption: 'One little picture, a million memories. 💗',
  type: 'image',
  orientation: 'portrait',
};

