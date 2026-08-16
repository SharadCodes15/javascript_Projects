import { Category, Quote } from '../types';

export const WALLPAPER_PRESETS = [
  {
    id: 'himalayan_highway',
    name: 'Himalayan Highway Cabin (Default)',
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2070&q=85',
    category: 'Truck POV',
    desc: 'Winding road through snow-capped pine peaks, warm vintage sunlight'
  },
  {
    id: 'mountain_pass',
    name: 'Manali-Leh High Mountain Pass',
    url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2070&q=85',
    category: 'Mountains',
    desc: 'Majestic mountain ridges with vast open sky and serene valleys'
  },
  {
    id: 'kerala_monsoon',
    name: 'Kerala Monsoon Train & Road',
    url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=2070&q=85',
    category: 'Monsoon',
    desc: 'Lush green misty wet highway with raindrops on the glass'
  },
  {
    id: 'mumbai_marine_drive',
    name: 'Mumbai Queen\'s Necklace Night',
    url: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=2070&q=85',
    category: 'City Night',
    desc: 'Glowing golden streetlamps by the Arabian Sea at midnight'
  },
  {
    id: 'rajasthan_sunset',
    name: 'Golden Desert Highway',
    url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=2070&q=85',
    category: 'Sunset',
    desc: 'Warm amber sunset highway with lone acacia trees and endless road'
  },
  {
    id: 'cyber_cafe_y2k',
    name: 'Cyber Cafe 2000s CRT Vibe',
    url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=2070&q=85',
    category: 'Retro Tech',
    desc: 'CRT glow, Windows XP blues, early 2000s nostalgic internet room'
  }
];

export const NOSTALGIC_QUOTES: Quote[] = [
  {
    id: '1',
    hindi: 'बुरी नज़र वाले तेरा मुंह काला • देखो मगर प्यार से',
    english: 'Highway dhabas at 2:00 AM with piping hot ginger chai and Sonu Nigam on full blast.',
    authorOrVibe: 'NH-44 Trucker Wisdom'
  },
  {
    id: '2',
    hindi: 'हंस मत पगली, प्यार हो जाएगा',
    english: 'Rewinding magnetic cassette tapes using a Nataraj pencil to save Walkman batteries.',
    authorOrVibe: '90s Cassette Era'
  },
  {
    id: '3',
    hindi: 'चलती है गाड़ी, उड़ती है धूल • जलते हैं दुश्मन, खिलते हैं फूल',
    english: 'Rolling down the non-AC car window as monsoon breeze hits the face.',
    authorOrVibe: 'Road Trip Memories'
  },
  {
    id: '4',
    hindi: 'माँ का आशीर्वाद • धीरे चलोगे तो बार-बार मिलेंगे',
    english: 'Sitting at the roadside tapri waiting for the rain to slow down while Kishore Kumar plays on radio.',
    authorOrVibe: 'Monsoon Dhaba'
  },
  {
    id: '5',
    hindi: 'हंसता हुआ चेहरा, तन्हा दिल और लंबा सफर',
    english: 'Listening to Lucky Ali with earphones on the school bus return journey.',
    authorOrVibe: 'Y2K School Days'
  },
  {
    id: '6',
    hindi: 'सफर खूबसूरत है मंज़िल से भी',
    english: 'The scent of wet petrichor and the rhythmic thumping of wheels over highway expansion joints.',
    authorOrVibe: 'Late Night Drives'
  }
];

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat_highway_dhaba',
    name: 'Highway Dhaba Classics',
    hindiName: 'ट्रक वाला ढाबा',
    tagline: 'Loud speakers, dholak beats & late night tandoor aromas',
    description: 'High energy 90s & 2000s road trip anthems that made every Indian truck journey legendary.',
    coverUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
    wallpaperUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2070&q=85',
    themeColor: '#f97316', // amber-orange
    tags: ['Highway', 'Bollywood 90s', 'Dhaba', 'High Energy'],
    isDefault: true,
    createdAt: Date.now() - 500000,
    songs: [
      {
        id: 's_ramjaane',
        title: 'Ram Jaane (Title Track)',
        artist: 'Udit Narayan, Sonu Nigam • Red Chillies',
        youtubeUrl: 'https://www.youtube.com/watch?v=B_kPjKqf8z0',
        youtubeId: 'B_kPjKqf8z0',
        duration: 427,
        thumbnail: 'https://img.youtube.com/vi/B_kPjKqf8z0/hqdefault.jpg',
        addedAt: Date.now() - 50000,
        categoryId: 'cat_highway_dhaba',
        note: 'Classic Shah Rukh Khan title track on the truck radio'
      },
      {
        id: 's_chaiyya',
        title: 'Chaiyya Chaiyya',
        artist: 'Sukhwinder Singh, Sapna Awasthi • Dil Se',
        youtubeUrl: 'https://www.youtube.com/watch?v=YOYN9qNXmAw',
        youtubeId: 'YOYN9qNXmAw',
        duration: 395,
        thumbnail: 'https://img.youtube.com/vi/YOYN9qNXmAw/hqdefault.jpg',
        addedAt: Date.now() - 40000,
        categoryId: 'cat_highway_dhaba',
        note: 'The ultimate train rooftop rhythm by A.R. Rahman'
      },
      {
        id: 's_o_jaana',
        title: 'O O Jaane Jaana',
        artist: 'Kamaal Khan • Pyaar Kiya To Darna Kya',
        youtubeUrl: 'https://www.youtube.com/watch?v=x_elT6zkqN0',
        youtubeId: 'x_elT6zkqN0',
        duration: 346,
        thumbnail: 'https://img.youtube.com/vi/x_elT6zkqN0/hqdefault.jpg',
        addedAt: Date.now() - 30000,
        categoryId: 'cat_highway_dhaba',
        note: 'The shirtless acoustic guitar youth anthem'
      },
      {
        id: 's_sandese',
        title: 'Sandese Aate Hai',
        artist: 'Sonu Nigam, Roop Kumar Rathod • Border',
        youtubeUrl: 'https://www.youtube.com/watch?v=g7Q4yQy0K_M',
        youtubeId: 'g7Q4yQy0K_M',
        duration: 440,
        thumbnail: 'https://img.youtube.com/vi/g7Q4yQy0K_M/hqdefault.jpg',
        addedAt: Date.now() - 20000,
        categoryId: 'cat_highway_dhaba',
        note: 'Soulful patriotic masterpiece that echoes across valleys'
      }
    ]
  },
  {
    id: 'cat_himalayan_drive',
    name: 'Late Night Himalayan Drive',
    hindiName: 'पहाड़ों का सफर',
    tagline: 'Winding roads, mist over pine valleys & acoustic guitars',
    description: 'Soulful acoustic ballads and wanderlust tracks for drifting through mountain fog.',
    coverUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    wallpaperUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2070&q=85',
    themeColor: '#0ea5e9', // sky blue
    tags: ['Mountains', 'Acoustic', 'Road Trip', 'Wanderlust'],
    isDefault: true,
    createdAt: Date.now() - 400000,
    songs: [
      {
        id: 's_yunchala',
        title: 'Yun Hi Chala Chal',
        artist: 'Udit Narayan, Hariharan, Kailash Kher • Swades',
        youtubeUrl: 'https://www.youtube.com/watch?v=mC17u_gY9bM',
        youtubeId: 'mC17u_gY9bM',
        duration: 448,
        thumbnail: 'https://img.youtube.com/vi/mC17u_gY9bM/hqdefault.jpg',
        addedAt: Date.now() - 45000,
        categoryId: 'cat_himalayan_drive',
        note: 'The greatest Indian journey song of all time'
      },
      {
        id: 's_dilchahta',
        title: 'Dil Chahta Hai',
        artist: 'Shankar Mahadevan • Dil Chahta Hai',
        youtubeUrl: 'https://www.youtube.com/watch?v=5t_7b4wM-4E',
        youtubeId: '5t_7b4wM-4E',
        duration: 311,
        thumbnail: 'https://img.youtube.com/vi/5t_7b4wM-4E/hqdefault.jpg',
        addedAt: Date.now() - 35000,
        categoryId: 'cat_himalayan_drive',
        note: 'Goa road trip convertible classic'
      },
      {
        id: 's_safarnama',
        title: 'Safarnama',
        artist: 'Lucky Ali • Tamasha',
        youtubeUrl: 'https://www.youtube.com/watch?v=6BAmE9c8k10',
        youtubeId: '6BAmE9c8k10',
        duration: 251,
        thumbnail: 'https://img.youtube.com/vi/6BAmE9c8k10/hqdefault.jpg',
        addedAt: Date.now() - 25000,
        categoryId: 'cat_himalayan_drive',
        note: 'Deep introspective travel poetry'
      },
      {
        id: 's_ilahi',
        title: 'Ilahi',
        artist: 'Arijit Singh • Yeh Jawaani Hai Deewani',
        youtubeUrl: 'https://www.youtube.com/watch?v=fdubeMFwuGs',
        youtubeId: 'fdubeMFwuGs',
        duration: 228,
        thumbnail: 'https://img.youtube.com/vi/fdubeMFwuGs/hqdefault.jpg',
        addedAt: Date.now() - 15000,
        categoryId: 'cat_himalayan_drive',
        note: 'Bag packed, train catching morning freshness'
      }
    ]
  },
  {
    id: 'cat_90s_cassette',
    name: '90s Cassette Rewind',
    hindiName: 'T-Series कैसेट यादें',
    tagline: 'Side A & Side B gold rewound with Nataraj pencil',
    description: 'Nadeem-Shravan, Alka Yagnik, Kumar Sanu, Udit Narayan timeless golden romance.',
    coverUrl: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=800&q=80',
    wallpaperUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=2070&q=85',
    themeColor: '#ec4899', // pink
    tags: ['90s Love', 'Kumar Sanu', 'Alka Yagnik', 'Cassette'],
    isDefault: true,
    createdAt: Date.now() - 300000,
    songs: [
      {
        id: 's_pehla_nasha',
        title: 'Pehla Nasha',
        artist: 'Udit Narayan, Sadhana Sargam • Jo Jeeta Wohi Sikandar',
        youtubeUrl: 'https://www.youtube.com/watch?v=6vYVq8s0J_U',
        youtubeId: '6vYVq8s0J_U',
        duration: 290,
        thumbnail: 'https://img.youtube.com/vi/6vYVq8s0J_U/hqdefault.jpg',
        addedAt: Date.now() - 30000,
        categoryId: 'cat_90s_cassette'
      },
      {
        id: 's_tiptip',
        title: 'Tip Tip Barsa Paani',
        artist: 'Alka Yagnik, Udit Narayan • Mohra',
        youtubeUrl: 'https://www.youtube.com/watch?v=lZ_2H1QGj2U',
        youtubeId: 'lZ_2H1QGj2U',
        duration: 350,
        thumbnail: 'https://img.youtube.com/vi/lZ_2H1QGj2U/hqdefault.jpg',
        addedAt: Date.now() - 20000,
        categoryId: 'cat_90s_cassette'
      },
      {
        id: 's_churake',
        title: 'Churake Dil Mera',
        artist: 'Kumar Sanu, Alka Yagnik • Main Khiladi Tu Anari',
        youtubeUrl: 'https://www.youtube.com/watch?v=b4wHw2d0z48',
        youtubeId: 'b4wHw2d0z48',
        duration: 320,
        thumbnail: 'https://img.youtube.com/vi/b4wHw2d0z48/hqdefault.jpg',
        addedAt: Date.now() - 10000,
        categoryId: 'cat_90s_cassette'
      }
    ]
  },
  {
    id: 'cat_indie_retro',
    name: 'Indie Pop & School Bus Nostalgia',
    hindiName: 'पुराने सुनहरे दिन',
    tagline: 'Lucky Ali, Shaan, Euphoria, Silk Route & Channel [V]',
    description: 'When music videos on TV after school were pure magic and lyrics touched the soul.',
    coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    wallpaperUrl: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=2070&q=85',
    themeColor: '#10b981', // emerald
    tags: ['Indie Pop', 'Lucky Ali', 'Euphoria', 'School Bus'],
    isDefault: true,
    createdAt: Date.now() - 200000,
    songs: [
      {
        id: 's_tanhadil',
        title: 'Tanha Dil',
        artist: 'Shaan • Tanha Dil Album',
        youtubeUrl: 'https://www.youtube.com/watch?v=xOtx4Jp_Z3g',
        youtubeId: 'xOtx4Jp_Z3g',
        duration: 315,
        thumbnail: 'https://img.youtube.com/vi/xOtx4Jp_Z3g/hqdefault.jpg',
        addedAt: Date.now() - 28000,
        categoryId: 'cat_indie_retro'
      },
      {
        id: 's_puranijeans',
        title: 'Purani Jeans Aur Guitar',
        artist: 'Ali Haider • College Days',
        youtubeUrl: 'https://www.youtube.com/watch?v=Jg72Y2rP7v8',
        youtubeId: 'Jg72Y2rP7v8',
        duration: 275,
        thumbnail: 'https://img.youtube.com/vi/Jg72Y2rP7v8/hqdefault.jpg',
        addedAt: Date.now() - 18000,
        categoryId: 'cat_indie_retro'
      },
      {
        id: 's_doobadooba',
        title: 'Dooba Dooba Rehta Hoon',
        artist: 'Silk Route • Mohit Chauhan',
        youtubeUrl: 'https://www.youtube.com/watch?v=v8TzZ3E4rA0',
        youtubeId: 'v8TzZ3E4rA0',
        duration: 260,
        thumbnail: 'https://img.youtube.com/vi/v8TzZ3E4rA0/hqdefault.jpg',
        addedAt: Date.now() - 8000,
        categoryId: 'cat_indie_retro'
      }
    ]
  },
  {
    id: 'cat_monsoon_chai',
    name: 'Monsoon Tapri & Ghazals',
    hindiName: 'रिमझिम बारिश और चाय',
    tagline: 'Clay kulhad chai, rain hitting tin roof & Jagjit Singh',
    description: 'Gentle raindrops, wet asphalt, warm samosa and eternal melancholic Ghazals.',
    coverUrl: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=800&q=80',
    wallpaperUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=2070&q=85',
    themeColor: '#8b5cf6', // purple
    tags: ['Ghazals', 'Rain', 'Chai', 'Late Night'],
    isDefault: true,
    createdAt: Date.now() - 100000,
    songs: [
      {
        id: 's_rimjhim',
        title: 'Rim Jhim Gire Saawan',
        artist: 'Kishore Kumar • Manzil',
        youtubeUrl: 'https://www.youtube.com/watch?v=8lJd9aGjK0U',
        youtubeId: '8lJd9aGjK0U',
        duration: 242,
        thumbnail: 'https://img.youtube.com/vi/8lJd9aGjK0U/hqdefault.jpg',
        addedAt: Date.now() - 15000,
        categoryId: 'cat_monsoon_chai'
      },
      {
        id: 's_bheegi',
        title: 'Bheegi Bheegi Raaton Mein',
        artist: 'Adnan Sami • Kabhi To Nazar Milao',
        youtubeUrl: 'https://www.youtube.com/watch?v=yW6lG3Gk4M0',
        youtubeId: 'yW6lG3Gk4M0',
        duration: 255,
        thumbnail: 'https://img.youtube.com/vi/yW6lG3Gk4M0/hqdefault.jpg',
        addedAt: Date.now() - 9000,
        categoryId: 'cat_monsoon_chai'
      }
    ]
  }
];
