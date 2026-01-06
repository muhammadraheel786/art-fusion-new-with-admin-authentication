// Easy to edit paintings data - just update this file to add/remove paintings
export interface Painting {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  featured?: boolean;
  category?: string;
}

export const paintings: Painting[] = [
  {
    id: 1,
    title: "Sunset Over Mountains",
    description: "A serene landscape capturing the golden hour over majestic peaks",
    price: 15000,
    image: "/paintings/sunset-mountains.jpg",
    rating: 5,
    featured: true,
    category: "Landscape"
  },
  {
    id: 2,
    title: "Ocean Waves",
    description: "Dynamic brushstrokes bringing the power of the sea to life",
    price: 12000,
    image: "/paintings/ocean-waves.jpg",
    rating: 4.5,
    featured: true,
    category: "Seascape"
  },
  {
    id: 3,
    title: "Blooming Garden",
    description: "Vibrant florals celebrating the beauty of spring",
    price: 10000,
    image: "/paintings/blooming-garden.jpg",
    rating: 5,
    featured: true,
    category: "Floral"
  },
  {
    id: 4,
    title: "Abstract Dreams",
    description: "Bold colors and shapes expressing inner emotions",
    price: 18000,
    image: "/paintings/abstract-dreams.jpg",
    rating: 4.5,
    category: "Abstract"
  },
  {
    id: 5,
    title: "Village Life",
    description: "Nostalgic depiction of traditional countryside charm",
    price: 14000,
    image: "/paintings/village-life.jpg",
    rating: 4,
    category: "Cultural"
  },
  {
    id: 6,
    title: "Starry Night Inspired",
    description: "A personal interpretation of celestial wonder",
    price: 20000,
    image: "/paintings/starry-night.jpg",
    rating: 5,
    featured: true,
    category: "Expressionist"
  },
  {
    id: 7,
    title: "Portrait in Gold",
    description: "Elegant portrait with warm golden undertones",
    price: 25000,
    image: "/paintings/portrait-gold.jpg",
    rating: 4.5,
    category: "Portrait"
  },
  {
    id: 8,
    title: "Forest Whispers",
    description: "Mystical forest scene with dappled light",
    price: 16000,
    image: "/paintings/forest-whispers.jpg",
    rating: 4,
    category: "Landscape"
  },
];

export const featuredPaintings = paintings.filter(p => p.featured);
