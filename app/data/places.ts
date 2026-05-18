export type PlaceCategory = 'restaurants' | 'beaches' | 'museums' | 'nightlife' | 'nature' | 'shopping' | 'cafes';

export interface Place {
  id: string;
  name: string;
  category: PlaceCategory;
  description: string;
  rating: number;
  lat: number;
  lng: number;
  image: string;
  address: string;
  isNew?: boolean;
  isPopular?: boolean;
  hours?: string;
}

export const places: Place[] = [
  {
    id: '1',
    name: 'La Embotelladora Vieja',
    category: 'restaurants',
    description: 'Award-winning winery restaurant set inside a historic bottling plant with incredible seafood.',
    rating: 4.8,
    lat: 31.8674,
    lng: -116.6,
    image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg',
    address: 'Av. Miramar 666, Ensenada',
    isPopular: true,
    hours: '1pm – 11pm',
  },
  {
    id: '2',
    name: 'Playa Hermosa',
    category: 'beaches',
    description: 'A quiet, stunning beach with crystal-clear waters and dramatic cliffs perfect for sunsets.',
    rating: 4.7,
    lat: 31.83,
    lng: -116.64,
    image: 'https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg',
    address: 'Km 10, Carretera Ensenada-Tijuana',
    isPopular: true,
    hours: 'Open 24h',
  },
  {
    id: '3',
    name: 'Museo de Historia',
    category: 'museums',
    description: 'Explore the rich cultural heritage of Baja California through interactive exhibits.',
    rating: 4.4,
    lat: 31.8659,
    lng: -116.5968,
    image: 'https://images.pexels.com/photos/2570060/pexels-photo-2570060.jpeg',
    address: 'Calle Gastélum s/n, Centro',
    hours: '9am – 5pm',
  },
  {
    id: '4',
    name: 'Hussong\'s Cantina',
    category: 'nightlife',
    description: 'The birthplace of the margarita. A legendary bar open since 1892 with live music nightly.',
    rating: 4.6,
    lat: 31.8671,
    lng: -116.5975,
    image: 'https://images.pexels.com/photos/1267244/pexels-photo-1267244.jpeg',
    address: 'Av. Ruiz 113, Centro',
    isPopular: true,
    hours: '10am – 2am',
  },
  {
    id: '5',
    name: 'Parque Nacional Sierra',
    category: 'nature',
    description: 'Breathtaking mountain scenery with hiking trails, waterfalls, and endemic wildlife.',
    rating: 4.9,
    lat: 31.95,
    lng: -116.4,
    image: 'https://images.pexels.com/photos/1527484/pexels-photo-1527484.jpeg',
    address: 'Sierra de Juárez, Baja California',
    isPopular: true,
    hours: 'Sunrise – Sunset',
  },
  {
    id: '6',
    name: 'Mercado Negro',
    category: 'shopping',
    description: 'A vibrant seafood market where locals shop for the freshest catch every morning.',
    rating: 4.5,
    lat: 31.8655,
    lng: -116.5991,
    image: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg',
    address: 'Blvd. Costero s/n, Ensenada',
    isNew: true,
    hours: '6am – 2pm',
  },
  {
    id: '7',
    name: 'Café Ollin',
    category: 'cafes',
    description: 'Artisan coffee shop with locally sourced beans and stunning ocean views from the rooftop.',
    rating: 4.7,
    lat: 31.8668,
    lng: -116.601,
    image: 'https://images.pexels.com/photos/1813466/pexels-photo-1813466.jpeg',
    address: 'Av. López Mateos 520, Ensenada',
    isNew: true,
    hours: '7am – 8pm',
  },
  {
    id: '8',
    name: 'Bufadora Blowhole',
    category: 'nature',
    description: 'One of the largest marine geysers in the world, shooting water 30m into the air.',
    rating: 4.8,
    lat: 31.73,
    lng: -116.72,
    image: 'https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg',
    address: 'La Bufadora, Punta Banda',
    isPopular: true,
    hours: '9am – 5pm',
  },
  {
    id: '9',
    name: 'Bodegas de Santo Tomás',
    category: 'restaurants',
    description: 'Historic winery offering tastings, tours, and gourmet pairings since 1888.',
    rating: 4.6,
    lat: 31.8664,
    lng: -116.5944,
    image: 'https://images.pexels.com/photos/1407846/pexels-photo-1407846.jpeg',
    address: 'Av. Miramar 666, Ensenada',
    isNew: true,
    hours: '10am – 6pm',
  },
  {
    id: '10',
    name: 'Playa El Faro',
    category: 'beaches',
    description: 'Family-friendly beach with calm waters and a historic lighthouse backdrop.',
    rating: 4.5,
    lat: 31.855,
    lng: -116.65,
    image: 'https://images.pexels.com/photos/1021073/pexels-photo-1021073.jpeg',
    address: 'El Faro, Ensenada',
    hours: 'Open 24h',
  },
];

export const categoryColors: Record<PlaceCategory, string> = {
  restaurants: '#FF6B6B',
  beaches: '#4ECDC4',
  museums: '#A8DADC',
  nightlife: '#6C63FF',
  nature: '#56AB2F',
  shopping: '#F7971E',
  cafes: '#C17A3A',
};

export const categoryIcons: Record<PlaceCategory, string> = {
  restaurants: '🍽️',
  beaches: '🏖️',
  museums: '🏛️',
  nightlife: '🎵',
  nature: '🌿',
  shopping: '🛍️',
  cafes: '☕',
};
