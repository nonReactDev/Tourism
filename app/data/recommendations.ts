export interface Recommendation {
  id: string;
  name: string;
  type: 'restaurant' | 'cafe' | 'bar' | 'experience';
  image: string;
  rating: number;
  reviewCount: number;
  distance: string;
  priceRange: '$' | '$$' | '$$$' | '$$$$';
  tags: string[];
  description: string;
  isTrending: boolean;
  trendSource?: string;
  address: string;
  openNow: boolean;
  cuisine?: string;
}

export const recommendations: Recommendation[] = [
  {
    id: 'r1',
    name: 'Manzanilla Restaurant',
    type: 'restaurant',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
    rating: 4.9,
    reviewCount: 2341,
    distance: '0.3 km',
    priceRange: '$$$',
    tags: ['Seafood', 'Wine', 'Romantic'],
    description: 'Celebrity chef\'s flagship using only hyper-local Baja ingredients in creative tasting menus.',
    isTrending: true,
    trendSource: 'Instagram',
    address: 'Blvd. Teniente Azueta 139',
    openNow: true,
    cuisine: 'Modern Baja',
  },
  {
    id: 'r2',
    name: 'El Rey Sol',
    type: 'restaurant',
    image: 'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg',
    rating: 4.7,
    reviewCount: 1876,
    distance: '0.5 km',
    priceRange: '$$$',
    tags: ['French', 'Classic', 'Fine Dining'],
    description: 'Ensenada\'s oldest fine dining institution serving classic French-Mexican fusion since 1947.',
    isTrending: false,
    address: 'Av. López Mateos 1000',
    openNow: true,
    cuisine: 'French-Mexican',
  },
  {
    id: 'r3',
    name: 'Antojitos La Guerrerense',
    type: 'restaurant',
    image: 'https://images.pexels.com/photos/2092507/pexels-photo-2092507.jpeg',
    rating: 4.8,
    reviewCount: 4120,
    distance: '0.2 km',
    priceRange: '$',
    tags: ['Street Food', 'Tostadas', 'Local Favorite'],
    description: 'World-famous street food stall recognized by Anthony Bourdain — their tostadas are legendary.',
    isTrending: true,
    trendSource: 'TikTok',
    address: 'Av. López Mateos & Blvd. Costero',
    openNow: true,
    cuisine: 'Mexican Street Food',
  },
  {
    id: 'r4',
    name: 'Wendlandt Cervecería',
    type: 'bar',
    image: 'https://images.pexels.com/photos/1269025/pexels-photo-1269025.jpeg',
    rating: 4.6,
    reviewCount: 987,
    distance: '0.7 km',
    priceRange: '$$',
    tags: ['Craft Beer', 'Rooftop', 'Lively'],
    description: 'Award-winning craft brewery with stunning bay views. Try their signature Kolsch and IPA.',
    isTrending: true,
    trendSource: 'Instagram',
    address: 'Av. Riveroll 401',
    openNow: true,
  },
  {
    id: 'r5',
    name: 'Café Savannah',
    type: 'cafe',
    image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg',
    rating: 4.5,
    reviewCount: 654,
    distance: '0.4 km',
    priceRange: '$$',
    tags: ['Artisan Coffee', 'Pastries', 'Cozy'],
    description: 'Third-wave coffee roaster with single-origin brews and house-made pastries every morning.',
    isTrending: false,
    address: 'Calle 3ra 312, Centro',
    openNow: true,
  },
  {
    id: 'r6',
    name: 'Valle Wine Tour',
    type: 'experience',
    image: 'https://images.pexels.com/photos/1407846/pexels-photo-1407846.jpeg',
    rating: 5.0,
    reviewCount: 312,
    distance: '25 km',
    priceRange: '$$$',
    tags: ['Wine', 'Valle de Guadalupe', 'Tour'],
    description: 'Full-day private tour through Baja\'s world-class wine country with 4 vineyard visits and gourmet lunch.',
    isTrending: true,
    trendSource: 'Twitter',
    address: 'Valle de Guadalupe, BC',
    openNow: true,
  },
  {
    id: 'r7',
    name: 'Bar Andaluz',
    type: 'bar',
    image: 'https://images.pexels.com/photos/1267244/pexels-photo-1267244.jpeg',
    rating: 4.4,
    reviewCount: 788,
    distance: '0.3 km',
    priceRange: '$$',
    tags: ['Cocktails', 'Live Music', 'Tapas'],
    description: 'Sultry Spanish-inspired bar with flamenco nights, creative cocktails, and excellent tapas.',
    isTrending: false,
    address: 'Calle Ruiz 240, Centro',
    openNow: false,
  },
  {
    id: 'r8',
    name: 'Whale Watching Tour',
    type: 'experience',
    image: 'https://images.pexels.com/photos/2827735/pexels-photo-2827735.jpeg',
    rating: 4.9,
    reviewCount: 1456,
    distance: '1.2 km',
    priceRange: '$$',
    tags: ['Outdoor', 'Wildlife', 'Boat'],
    description: 'Gray whale migration tours from December to April — a breathtaking Baja bucket-list experience.',
    isTrending: true,
    trendSource: 'TikTok',
    address: 'Muelle Ensenada, Puerto',
    openNow: true,
  },
];

export const trendingItems = recommendations.filter(r => r.isTrending);
