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
    title: "Golden Horizon",
    description: "A calming scene of the sun touching the horizon with warm tones",
    price: 2500,
    image: "/paintings/25.png",
    rating: 4.5,
    featured: false,
    category: "Landscape"
},
{
    id: 2,
    title: "Tranquil Waters",
    description: "Gentle ripples on a peaceful lake surrounded by nature",
    price: 3000,
    image: "/paintings/24.png",
    rating: 4,
    featured: true,
    category: "Seascape"
},
{
    id: 3,
    title: "Spring Blossom",
    description: "Fresh flowers in full bloom celebrating the season of life",
    price: 2200,
    image: "/paintings/21.png",
    rating: 4.5,
    featured: false,
    category: "Floral"
},
{
    id: 4,
    title: "Urban Lights",
    description: "The vibrant cityscape glowing with lights at night",
    price: 3500,
    image: "/paintings/4.png",
    rating: 4,
    featured: true,
    category: "Cityscape"
},
{
    id: 5,
    title: "Mystic Forest",
    description: "A dreamy forest scene shrouded in mist and soft sunlight",
    price: 2800,
    image: "/paintings/5.png",
    rating: 4.5,
    featured: true,
    category: "Landscape"
},
{
    id: 6,
    title: "Abstract Harmony",
    description: "Colorful geometric shapes forming a balanced composition",
    price: 4000,
    image: "/paintings/6.png",
    rating: 4,
    featured: true,
    category: "Abstract"
},
{
    id: 7,
    title: "Desert Mirage",
    description: "Warm desert sands meeting the horizon under a clear sky",
    price: 2000,
    image: "/paintings/7.png",
    rating: 4,
    featured: false,
    category: "Landscape"
},
{
    id: 8,
    title: "Celestial Glow",
    description: "Starry night sky with subtle cosmic patterns and shimmer",
    price: 4500,
    image: "/paintings/8.png",
    rating: 5,
    featured: false,
    category: "Expressionist"
},
{
    id: 9,
    title: "Coastal Breeze",
    description: "Gentle waves brushing the sandy shore with light reflections",
    price: 3200,
    image: "/paintings/9.png",
    rating: 4,
    featured: false,
    category: "Seascape"
},
{
    id: 10,
    title: "Autumn Pathway",
    description: "A quiet path covered in golden leaves during fall",
    price: 2700,
    image: "/paintings/10.png",
    rating: 4.5,
    featured: false,
    category: "Landscape"
},
{
    id: 11,
    title: "Silent Meadow",
    description: "Wide open fields with soft sunlight and scattered wildflowers",
    price: 1800,
    image: "/paintings/11.png",
    rating: 4,
    featured: false,
    category: "Landscape"
},
{
    id: 12,
    title: "Morning Dew",
    description: "Fresh green leaves glistening with early morning dew",
    price: 2100,
    image: "/paintings/12.png",
    rating: 4,
    featured: true,
    category: "Floral"
},
{
    id: 13,
    title: "Mountain Whisper",
    description: "Tall peaks under a serene sky, evoking peace and solitude",
    price: 3000,
    image: "/paintings/13.png",
    rating: 4.5,
    featured: false,
    category: "Landscape"
},
{
    id: 14,
    title: "River Reflections",
    description: "Calm river reflecting surrounding landscapes and skies",
    price: 2300,
    image: "/paintings/14.png",
    rating: 4,
    featured: false,
    category: "Landscape"
},
{
    id: 15,
    title: "Hidden Waterfall",
    description: "A secluded waterfall cascading into a tranquil pool",
    price: 2800,
    image: "/paintings/15.png",
    rating: 4.5,
    featured: true,
    category: "Landscape"
},
{
    id: 16,
    title: "Evening Glow",
    description: "Soft light of the evening casting a golden hue on everything",
    price: 2600,
    image: "/paintings/16.png",
    rating: 4,
    featured: false,
    category: "Landscape"
},
{
    id: 17,
    title: "Winter Chill",
    description: "Snow-covered landscape with frosty trees and clear skies",
    price: 3500,
    image: "/paintings/17.png",
    rating: 4.5,
    featured: true,
    category: "Landscape"
},
{
    id: 18,
    title: "Golden Fields",
    description: "Sun-kissed fields of wheat swaying gently in the wind",
    price: 2000,
    image: "/paintings/18.png",
    rating: 4,
    featured: false,
    category: "Landscape"
},
{
    id: 19,
    title: "Lush Canopy",
    description: "Dense forest canopy with beams of sunlight breaking through",
    price: 4000,
    image: "/paintings/19.png",
    rating: 5,
    featured: true,
    category: "Landscape"
},
{
    id: 20,
    title: "Silent Night",
    description: "Peaceful night sky illuminated by the soft glow of stars",
    price: 4500,
    image: "/paintings/20.png",
    rating: 4.5,
    featured: true,
    category: "Expressionist"
},
{
    id: 21,
    title: "Meadow Breeze",
    description: "Soft winds flowing through open grasslands and flowers",
    price: 1800,
    image: "/paintings/3.png",
    rating: 4,
    featured: false,
    category: "Landscape"
},
{
    id: 22,
    title: "Harbor Sunset",
    description: "Boats gently floating in a harbor as the sun sets",
    price: 3200,
    image: "/paintings/22.png",
    rating: 4.5,
    featured: true,
    category: "Seascape"
},
{
    id: 23,
    title: "Golden Canopy",
    description: "Trees with golden leaves forming a natural archway",
    price: 2900,
    image: "/paintings/23.png",
    rating: 4,
    featured: false,
    category: "Landscape"
},
{
    id: 24,
    title: "Ocean Mist",
    description: "Soft mist rising from the ocean, creating a dreamy effect",
    price: 3700,
    image: "/paintings/2.png",
    rating: 4.5,
    featured: true,
    category: "Seascape"
},
{
    id: 25,
    title: "Twilight Garden",
    description: "Garden bathed in the soft purples and pinks of twilight",
    price: 3100,
    image: "/paintings/11.png",
    rating: 4.5,
    featured: true,
    category: "Floral"
}

  
];

export const featuredPaintings = paintings.filter(p => p.featured);
