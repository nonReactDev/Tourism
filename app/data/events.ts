export type EventCategory = 'music' | 'festival' | 'food' | 'sports' | 'art' | 'tour';

export interface Event {
  id: string;
  title: string;
  category: EventCategory;
  location: string;
  date: string;
  time: string;
  image: string;
  description: string;
  price: string;
  isFeatured?: boolean;
  isLive?: boolean;
  attendees?: number;
}

export const categoryMeta: Record<EventCategory, { color: string; icon: string }> = {
  music: { color: '#6C63FF', icon: '🎵' },
  festival: { color: '#FF6B6B', icon: '🎉' },
  food: { color: '#F7971E', icon: '🍷' },
  sports: { color: '#56AB2F', icon: '🏄' },
  art: { color: '#4ECDC4', icon: '🎨' },
  tour: { color: '#4A90D9', icon: '🗺️' },
};

export const events: Event[] = [
  {
    id: 'e1',
    title: 'Vendimia Wine Festival',
    category: 'festival',
    location: 'Valle de Guadalupe',
    date: 'Aug 2',
    time: '12:00 PM',
    image: 'https://images.pexels.com/photos/1407846/pexels-photo-1407846.jpeg',
    description: 'The legendary annual harvest festival in Baja\'s wine country with 80+ wineries, live music, and world-class food.',
    price: '$45 – $120',
    isFeatured: true,
    attendees: 4500,
  },
  {
    id: 'e2',
    title: 'Live Jazz at Muelle 3',
    category: 'music',
    location: 'Muelle 3, Puerto Ensenada',
    date: 'Tonight',
    time: '8:00 PM',
    image: 'https://images.pexels.com/photos/1763067/pexels-photo-1763067.jpeg',
    description: 'A night of smooth jazz with the Ensenada Jazz Collective overlooking the harbor. Open bar included.',
    price: '$25',
    isLive: true,
    attendees: 180,
  },
  {
    id: 'e3',
    title: 'Baja Surf Classic',
    category: 'sports',
    location: 'Playa San Miguel',
    date: 'Aug 5',
    time: '7:00 AM',
    image: 'https://images.pexels.com/photos/416676/pexels-photo-416676.jpeg',
    description: 'Annual surfing competition drawing pros from Mexico, USA, and South America on legendary Baja waves.',
    price: 'Free (spectators)',
    isFeatured: true,
    attendees: 1200,
  },
  {
    id: 'e4',
    title: 'Ensenada Food & Wine',
    category: 'food',
    location: 'Av. López Mateos',
    date: 'Aug 8',
    time: '6:00 PM',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
    description: 'Street fair featuring 30+ local restaurants, wine tastings, and live cooking demos from top chefs.',
    price: '$15',
    attendees: 800,
  },
  {
    id: 'e5',
    title: 'Mural Art Walk',
    category: 'art',
    location: 'Centro Histórico',
    date: 'Aug 10',
    time: '10:00 AM',
    image: 'https://images.pexels.com/photos/2570060/pexels-photo-2570060.jpeg',
    description: 'Guided walking tour through Ensenada\'s vibrant street art scene with local artists sharing their stories.',
    price: 'Free',
    attendees: 95,
  },
  {
    id: 'e6',
    title: 'Bajagua Cycling Tour',
    category: 'tour',
    location: 'Blvd. Costero',
    date: 'Aug 12',
    time: '7:30 AM',
    image: 'https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg',
    description: 'Scenic 40km coastal cycling route with rest stops at local vineyards and ocean lookout points.',
    price: '$30',
    attendees: 240,
  },
  {
    id: 'e7',
    title: 'Flamenco Night',
    category: 'music',
    location: 'Bar Andaluz, Centro',
    date: 'Tomorrow',
    time: '9:00 PM',
    image: 'https://images.pexels.com/photos/1267244/pexels-photo-1267244.jpeg',
    description: 'Passionate flamenco performance by touring dancers from Seville with tapas and Spanish wine.',
    price: '$20',
    attendees: 120,
  },
  {
    id: 'e8',
    title: 'Whale Watching Sunrise',
    category: 'tour',
    location: 'Muelle Ensenada',
    date: 'Aug 14',
    time: '6:00 AM',
    image: 'https://images.pexels.com/photos/2827735/pexels-photo-2827735.jpeg',
    description: 'Intimate sunrise boat tour to see gray whale mothers and calves — maximum 12 guests per boat.',
    price: '$55',
    isFeatured: true,
    attendees: 12,
  },
];
