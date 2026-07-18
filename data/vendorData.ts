export type VendorItem = {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  priceLevel: string;
  location: string;
  tags: string[];
  startingPrice: string;
  image: string;
  isTopRated?: boolean;
};

export type CategoryProfile = {
  services: string[];
  about: (name: string) => string;
  portfolioImages: string[];
};

export const vendorsByCategory: Record<string, VendorItem[]> = {
  Photographers: [
    { id:"p1", name:"Magic Moments Photography", rating:4.9, reviews:86, priceLevel:"₹ ₹", location:"Lonavala, Pune", tags:["Candid","Traditional","Cinematic"], startingPrice:"₹25,000", image:"https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&auto=format&fit=crop&q=70", isTopRated:true },
    { id:"p2", name:"Perfect Clicks", rating:4.8, reviews:63, priceLevel:"₹", location:"Pune", tags:["Candid","Traditional"], startingPrice:"₹18,000", image:"https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&auto=format&fit=crop&q=70" },
    { id:"p3", name:"Dreamy Shots", rating:4.7, reviews:51, priceLevel:"₹ ₹", location:"Lonavala, Pune", tags:["Candid","Cinematic","Pre Wedding"], startingPrice:"₹22,000", image:"https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&auto=format&fit=crop&q=70" },
    { id:"p4", name:"Lens & Tales", rating:4.6, reviews:38, priceLevel:"₹", location:"Pune", tags:["Traditional","Cinematic"], startingPrice:"₹16,000", image:"https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&auto=format&fit=crop&q=70" },
    { id:"p5", name:"Shutter Stories", rating:4.6, reviews:29, priceLevel:"₹ ₹", location:"Lonavala", tags:["Candid","Pre Wedding"], startingPrice:"₹15,000", image:"https://images.unsplash.com/photo-1519741497674-611481863552?w=400&auto=format&fit=crop&q=70" },
    { id:"p6", name:"Pixel Perfect Studio", rating:4.5, reviews:25, priceLevel:"₹ ₹ ₹", location:"Pune", tags:["Cinematic","Traditional"], startingPrice:"₹35,000", image:"https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400&auto=format&fit=crop&q=70" },
    { id:"p7", name:"Frame & Soul", rating:4.5, reviews:22, priceLevel:"₹ ₹", location:"Mumbai", tags:["Candid","Cinematic"], startingPrice:"₹28,000", image:"https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&auto=format&fit=crop&q=70" },
    { id:"p8", name:"Golden Hour Films", rating:4.4, reviews:18, priceLevel:"₹ ₹ ₹", location:"Pune", tags:["Cinematic","Pre Wedding"], startingPrice:"₹40,000", image:"https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&auto=format&fit=crop&q=70" },
    { id:"p9", name:"Capture & Co.", rating:4.4, reviews:15, priceLevel:"₹", location:"Nashik", tags:["Traditional","Albums"], startingPrice:"₹12,000", image:"https://images.unsplash.com/photo-1591604466107-ab7c9ab60908?w=400&auto=format&fit=crop&q=70" },
    { id:"p10", name:"Timeless Frames", rating:4.3, reviews:11, priceLevel:"₹ ₹", location:"Pune", tags:["Candid","Traditional"], startingPrice:"₹20,000", image:"https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&auto=format&fit=crop&q=70" },
  ],
  Venues: [
    { id:"v1", name:"Royal Mahal Banquet", rating:4.9, reviews:142, priceLevel:"₹ ₹ ₹", location:"Lonavala, Pune", tags:["Banquet","Lawn","AC Hall"], startingPrice:"₹2,50,000", image:"https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&auto=format&fit=crop&q=70", isTopRated:true },
    { id:"v2", name:"The Grand Pavilion", rating:4.8, reviews:98, priceLevel:"₹ ₹ ₹", location:"Pune", tags:["Banquet","Pool","Outdoor"], startingPrice:"₹3,00,000", image:"https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&auto=format&fit=crop&q=70" },
    { id:"v3", name:"Green Valley Resort", rating:4.7, reviews:76, priceLevel:"₹ ₹", location:"Lonavala", tags:["Resort","Lawn","Outdoor"], startingPrice:"₹1,50,000", image:"https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&auto=format&fit=crop&q=70" },
    { id:"v4", name:"Heritage Palace", rating:4.7, reviews:64, priceLevel:"₹ ₹ ₹", location:"Pune", tags:["Palace","Banquet","Heritage"], startingPrice:"₹4,00,000", image:"https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400&auto=format&fit=crop&q=70" },
    { id:"v5", name:"Sunset Garden", rating:4.6, reviews:55, priceLevel:"₹ ₹", location:"Mumbai", tags:["Garden","Lawn","Open Air"], startingPrice:"₹1,80,000", image:"https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&auto=format&fit=crop&q=70" },
    { id:"v6", name:"Crystal Ballroom", rating:4.6, reviews:48, priceLevel:"₹ ₹ ₹", location:"Pune", tags:["Ballroom","AC","Indoor"], startingPrice:"₹3,50,000", image:"https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&auto=format&fit=crop&q=70" },
    { id:"v7", name:"Lotus Convention", rating:4.5, reviews:41, priceLevel:"₹ ₹", location:"Nashik", tags:["Banquet","Convention","AC"], startingPrice:"₹1,20,000", image:"https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&auto=format&fit=crop&q=70" },
    { id:"v8", name:"The Orchard Farm", rating:4.5, reviews:35, priceLevel:"₹ ₹", location:"Lonavala", tags:["Farm","Outdoor","Rustic"], startingPrice:"₹1,00,000", image:"https://images.unsplash.com/photo-1519741497674-611481863552?w=400&auto=format&fit=crop&q=70" },
    { id:"v9", name:"Silver Springs Hall", rating:4.4, reviews:28, priceLevel:"₹", location:"Pune", tags:["Banquet","AC","Simple"], startingPrice:"₹80,000", image:"https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&auto=format&fit=crop&q=70" },
    { id:"v10", name:"Emerald Lawn Club", rating:4.3, reviews:21, priceLevel:"₹ ₹", location:"Satara", tags:["Lawn","Garden","Outdoor"], startingPrice:"₹90,000", image:"https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&auto=format&fit=crop&q=70" },
  ],
  Caterers: [
    { id:"c1", name:"Royal Caterers", rating:4.9, reviews:118, priceLevel:"₹ ₹", location:"Lonavala, Pune", tags:["Veg","Non-Veg","Live Counter"], startingPrice:"₹800/plate", image:"https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&auto=format&fit=crop&q=70", isTopRated:true },
    { id:"c2", name:"Spice Route Caterers", rating:4.8, reviews:95, priceLevel:"₹ ₹", location:"Pune", tags:["Multi-Cuisine","Veg","Jain"], startingPrice:"₹700/plate", image:"https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&auto=format&fit=crop&q=70" },
    { id:"c3", name:"Grand Feast", rating:4.7, reviews:82, priceLevel:"₹ ₹ ₹", location:"Mumbai", tags:["Premium","Live Counter","Desserts"], startingPrice:"₹1,200/plate", image:"https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&auto=format&fit=crop&q=70" },
    { id:"c4", name:"Maharaja Bhoj", rating:4.7, reviews:71, priceLevel:"₹ ₹", location:"Pune", tags:["Rajasthani","Veg","Traditional"], startingPrice:"₹900/plate", image:"https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&auto=format&fit=crop&q=70" },
    { id:"c5", name:"Taste of India", rating:4.6, reviews:63, priceLevel:"₹", location:"Nashik", tags:["Veg","Non-Veg","Budget"], startingPrice:"₹500/plate", image:"https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&auto=format&fit=crop&q=70" },
    { id:"c6", name:"Continental Bites", rating:4.6, reviews:57, priceLevel:"₹ ₹ ₹", location:"Pune", tags:["Continental","Multi-Cuisine","Premium"], startingPrice:"₹1,500/plate", image:"https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400&auto=format&fit=crop&q=70" },
    { id:"c7", name:"Desi Dhaba Caterers", rating:4.5, reviews:49, priceLevel:"₹", location:"Lonavala", tags:["Veg","Jain","Budget"], startingPrice:"₹450/plate", image:"https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&auto=format&fit=crop&q=70" },
    { id:"c8", name:"Flavours Unlimited", rating:4.5, reviews:44, priceLevel:"₹ ₹", location:"Pune", tags:["Multi-Cuisine","Non-Veg","Desserts"], startingPrice:"₹850/plate", image:"https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&auto=format&fit=crop&q=70" },
    { id:"c9", name:"Annapurna Catering", rating:4.4, reviews:37, priceLevel:"₹", location:"Satara", tags:["Maharashtrian","Veg","Traditional"], startingPrice:"₹400/plate", image:"https://images.unsplash.com/photo-1519741497674-611481863552?w=400&auto=format&fit=crop&q=70" },
    { id:"c10", name:"Celebration Catering", rating:4.3, reviews:29, priceLevel:"₹ ₹", location:"Pune", tags:["Multi-Cuisine","Veg","Non-Veg"], startingPrice:"₹750/plate", image:"https://images.unsplash.com/photo-1591604466107-ab7c9ab60908?w=400&auto=format&fit=crop&q=70" },
  ],
  Decorators: [
    { id:"d1", name:"Dream Decorators", rating:4.9, reviews:120, priceLevel:"₹ ₹", location:"Lonavala, Pune", tags:["Floral","Thematic","Lighting"], startingPrice:"₹40,000", image:"https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&auto=format&fit=crop&q=70", isTopRated:true },
    { id:"d2", name:"Blooms & Beyond", rating:4.8, reviews:96, priceLevel:"₹ ₹", location:"Pune", tags:["Floral","Mandap","Stage"], startingPrice:"₹35,000", image:"https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&auto=format&fit=crop&q=70" },
    { id:"d3", name:"Floral Fantasy", rating:4.7, reviews:84, priceLevel:"₹ ₹ ₹", location:"Mumbai", tags:["Premium","Floral","Thematic"], startingPrice:"₹70,000", image:"https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&auto=format&fit=crop&q=70" },
    { id:"d4", name:"Royal Touch Decor", rating:4.7, reviews:73, priceLevel:"₹ ₹ ₹", location:"Pune", tags:["Royal","Traditional","Mandap"], startingPrice:"₹60,000", image:"https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&auto=format&fit=crop&q=70" },
    { id:"d5", name:"Petal & Lights", rating:4.6, reviews:65, priceLevel:"₹ ₹", location:"Nashik", tags:["Lighting","Floral","Minimal"], startingPrice:"₹25,000", image:"https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400&auto=format&fit=crop&q=70" },
    { id:"d6", name:"Event Canvas", rating:4.6, reviews:58, priceLevel:"₹ ₹", location:"Pune", tags:["Thematic","Stage","Backdrop"], startingPrice:"₹30,000", image:"https://images.unsplash.com/photo-1519741497674-611481863552?w=400&auto=format&fit=crop&q=70" },
    { id:"d7", name:"Elegance Events", rating:4.5, reviews:50, priceLevel:"₹ ₹", location:"Lonavala", tags:["Elegant","Floral","Mandap"], startingPrice:"₹28,000", image:"https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&auto=format&fit=crop&q=70" },
    { id:"d8", name:"Decor Dreams", rating:4.5, reviews:43, priceLevel:"₹", location:"Pune", tags:["Budget","Simple","Floral"], startingPrice:"₹15,000", image:"https://images.unsplash.com/photo-1591604466107-ab7c9ab60908?w=400&auto=format&fit=crop&q=70" },
    { id:"d9", name:"Vivid Vows Decor", rating:4.4, reviews:36, priceLevel:"₹ ₹ ₹", location:"Mumbai", tags:["Luxury","Premium","Lighting"], startingPrice:"₹80,000", image:"https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&auto=format&fit=crop&q=70" },
    { id:"d10", name:"Mandap Makers", rating:4.3, reviews:28, priceLevel:"₹", location:"Satara", tags:["Traditional","Mandap","Budget"], startingPrice:"₹12,000", image:"https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&auto=format&fit=crop&q=70" },
  ],
  "Makeup Artists": [
    { id:"m1", name:"Glam Studio by Priya", rating:4.9, reviews:132, priceLevel:"₹ ₹", location:"Pune", tags:["Bridal","Airbrush","HD Makeup"], startingPrice:"₹15,000", image:"https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&auto=format&fit=crop&q=70", isTopRated:true },
    { id:"m2", name:"Blush & Brush", rating:4.8, reviews:108, priceLevel:"₹ ₹", location:"Mumbai", tags:["Bridal","Airbrush","Party"], startingPrice:"₹12,000", image:"https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&auto=format&fit=crop&q=70" },
    { id:"m3", name:"The Beauty Bar", rating:4.7, reviews:91, priceLevel:"₹ ₹ ₹", location:"Pune", tags:["Premium","Bridal","HD Makeup"], startingPrice:"₹25,000", image:"https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&auto=format&fit=crop&q=70" },
    { id:"m4", name:"Makeup by Anjali", rating:4.7, reviews:79, priceLevel:"₹", location:"Lonavala", tags:["Natural","Bridal","Budget"], startingPrice:"₹8,000", image:"https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&auto=format&fit=crop&q=70" },
    { id:"m5", name:"Faceoff Studio", rating:4.6, reviews:67, priceLevel:"₹ ₹", location:"Nashik", tags:["Airbrush","Party","Bridal"], startingPrice:"₹10,000", image:"https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&auto=format&fit=crop&q=70" },
    { id:"m6", name:"Sheen Makeovers", rating:4.6, reviews:58, priceLevel:"₹ ₹", location:"Pune", tags:["HD Makeup","Bridal","Engagement"], startingPrice:"₹14,000", image:"https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400&auto=format&fit=crop&q=70" },
    { id:"m7", name:"Diva Artistry", rating:4.5, reviews:49, priceLevel:"₹ ₹ ₹", location:"Mumbai", tags:["Luxury","Bridal","Premium"], startingPrice:"₹30,000", image:"https://images.unsplash.com/photo-1519741497674-611481863552?w=400&auto=format&fit=crop&q=70" },
    { id:"m8", name:"Pinkish Palette", rating:4.5, reviews:42, priceLevel:"₹", location:"Pune", tags:["Natural","Budget","Bridal"], startingPrice:"₹7,000", image:"https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&auto=format&fit=crop&q=70" },
    { id:"m9", name:"Nisha Beauty Lounge", rating:4.4, reviews:34, priceLevel:"₹ ₹", location:"Satara", tags:["Bridal","Airbrush","Simple"], startingPrice:"₹11,000", image:"https://images.unsplash.com/photo-1591604466107-ab7c9ab60908?w=400&auto=format&fit=crop&q=70" },
    { id:"m10", name:"Radiance Studio", rating:4.3, reviews:26, priceLevel:"₹", location:"Pune", tags:["Budget","Bridal","Natural"], startingPrice:"₹6,500", image:"https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&auto=format&fit=crop&q=70" },
  ],
  "Mehndi Artists": [
    { id:"me1", name:"Henna Hands", rating:4.9, reviews:114, priceLevel:"₹ ₹", location:"Pune", tags:["Bridal","Arabic","Rajasthani"], startingPrice:"₹8,000", image:"https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&auto=format&fit=crop&q=70", isTopRated:true },
    { id:"me2", name:"Art of Mehndi", rating:4.8, reviews:96, priceLevel:"₹ ₹", location:"Mumbai", tags:["Bridal","Indo-Arabic","Full Hand"], startingPrice:"₹7,000", image:"https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&auto=format&fit=crop&q=70" },
    { id:"me3", name:"Bridal Mehndi Studio", rating:4.7, reviews:83, priceLevel:"₹ ₹ ₹", location:"Pune", tags:["Premium","Bridal","Designer"], startingPrice:"₹15,000", image:"https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&auto=format&fit=crop&q=70" },
    { id:"me4", name:"Neha Mehndi Art", rating:4.7, reviews:72, priceLevel:"₹", location:"Lonavala", tags:["Simple","Budget","Arabic"], startingPrice:"₹3,000", image:"https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400&auto=format&fit=crop&q=70" },
    { id:"me5", name:"Royal Mehndi", rating:4.6, reviews:64, priceLevel:"₹ ₹", location:"Nashik", tags:["Rajasthani","Bridal","Full Arm"], startingPrice:"₹9,000", image:"https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&auto=format&fit=crop&q=70" },
    { id:"me6", name:"Mehek Mehndi", rating:4.6, reviews:55, priceLevel:"₹ ₹", location:"Pune", tags:["Arabic","Bridal","Engagement"], startingPrice:"₹6,000", image:"https://images.unsplash.com/photo-1519741497674-611481863552?w=400&auto=format&fit=crop&q=70" },
    { id:"me7", name:"Henna Tales", rating:4.5, reviews:47, priceLevel:"₹", location:"Satara", tags:["Budget","Simple","Party"], startingPrice:"₹2,500", image:"https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&auto=format&fit=crop&q=70" },
    { id:"me8", name:"Artistry by Kavya", rating:4.5, reviews:39, priceLevel:"₹ ₹ ₹", location:"Mumbai", tags:["Premium","Designer","Bridal"], startingPrice:"₹18,000", image:"https://images.unsplash.com/photo-1591604466107-ab7c9ab60908?w=400&auto=format&fit=crop&q=70" },
    { id:"me9", name:"Floral Mehndi Co.", rating:4.4, reviews:31, priceLevel:"₹ ₹", location:"Pune", tags:["Floral","Bridal","Modern"], startingPrice:"₹7,500", image:"https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&auto=format&fit=crop&q=70" },
    { id:"me10", name:"Mehendi Magic", rating:4.3, reviews:24, priceLevel:"₹", location:"Pune", tags:["Budget","Arabic","Simple"], startingPrice:"₹2,000", image:"https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&auto=format&fit=crop&q=70" },
  ],
  DJs: [
    { id:"dj1", name:"DJ RaJ Sound", rating:4.9, reviews:108, priceLevel:"₹ ₹", location:"Pune", tags:["Bollywood","EDM","Live Mixer"], startingPrice:"₹20,000", image:"https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&auto=format&fit=crop&q=70", isTopRated:true },
    { id:"dj2", name:"Bass Blast DJ", rating:4.8, reviews:88, priceLevel:"₹ ₹", location:"Mumbai", tags:["EDM","Bollywood","Wedding"], startingPrice:"₹18,000", image:"https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=400&auto=format&fit=crop&q=70" },
    { id:"dj3", name:"Rhythm Masters", rating:4.7, reviews:75, priceLevel:"₹ ₹ ₹", location:"Pune", tags:["Premium","EDM","Live Band"], startingPrice:"₹35,000", image:"https://images.unsplash.com/photo-1519741497674-611481863552?w=400&auto=format&fit=crop&q=70" },
    { id:"dj4", name:"Beat Factory", rating:4.7, reviews:66, priceLevel:"₹ ₹", location:"Nashik", tags:["Bollywood","Remix","Wedding"], startingPrice:"₹15,000", image:"https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&auto=format&fit=crop&q=70" },
    { id:"dj5", name:"DJ Sunny Events", rating:4.6, reviews:57, priceLevel:"₹", location:"Lonavala", tags:["Budget","Bollywood","Simple"], startingPrice:"₹10,000", image:"https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&auto=format&fit=crop&q=70" },
    { id:"dj6", name:"Neon Nights DJ", rating:4.6, reviews:49, priceLevel:"₹ ₹ ₹", location:"Mumbai", tags:["EDM","Luxury","LED Setup"], startingPrice:"₹45,000", image:"https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400&auto=format&fit=crop&q=70" },
    { id:"dj7", name:"Mixtape Events", rating:4.5, reviews:41, priceLevel:"₹ ₹", location:"Pune", tags:["Bollywood","EDM","Wedding"], startingPrice:"₹16,000", image:"https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&auto=format&fit=crop&q=70" },
    { id:"dj8", name:"Soundwave DJ", rating:4.5, reviews:35, priceLevel:"₹ ₹", location:"Satara", tags:["Bollywood","Live Mixer","Wedding"], startingPrice:"₹14,000", image:"https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&auto=format&fit=crop&q=70" },
    { id:"dj9", name:"Club Vibes DJ", rating:4.4, reviews:28, priceLevel:"₹ ₹ ₹", location:"Mumbai", tags:["Premium","EDM","Club Style"], startingPrice:"₹40,000", image:"https://images.unsplash.com/photo-1591604466107-ab7c9ab60908?w=400&auto=format&fit=crop&q=70" },
    { id:"dj10", name:"Party Pulse DJ", rating:4.3, reviews:20, priceLevel:"₹", location:"Pune", tags:["Budget","Bollywood","Simple"], startingPrice:"₹8,000", image:"https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&auto=format&fit=crop&q=70" },
  ],
  "Bridal Wear": [
    { id:"bw1", name:"Rani Bridal House", rating:4.9, reviews:125, priceLevel:"₹ ₹", location:"Pune", tags:["Lehenga","Saree","Designer"], startingPrice:"₹25,000", image:"https://images.unsplash.com/photo-1594552072238-b8f02c8f5c22?w=400&auto=format&fit=crop&q=70", isTopRated:true },
    { id:"bw2", name:"Shringaar Boutique", rating:4.8, reviews:102, priceLevel:"₹ ₹ ₹", location:"Mumbai", tags:["Designer","Lehenga","Embroidery"], startingPrice:"₹40,000", image:"https://images.unsplash.com/photo-1519741497674-611481863552?w=400&auto=format&fit=crop&q=70" },
    { id:"bw3", name:"Dulhan Dreams", rating:4.7, reviews:88, priceLevel:"₹ ₹", location:"Pune", tags:["Lehenga","Saree","Semi-Formal"], startingPrice:"₹22,000", image:"https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&auto=format&fit=crop&q=70" },
    { id:"bw4", name:"Silk & Shine", rating:4.7, reviews:76, priceLevel:"₹ ₹ ₹", location:"Mumbai", tags:["Silk","Premium","Designer"], startingPrice:"₹55,000", image:"https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&auto=format&fit=crop&q=70" },
    { id:"bw5", name:"Bridal Gallery", rating:4.6, reviews:67, priceLevel:"₹ ₹", location:"Nashik", tags:["Lehenga","Saree","Bridal"], startingPrice:"₹18,000", image:"https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400&auto=format&fit=crop&q=70" },
    { id:"bw6", name:"Tradition Textiles", rating:4.6, reviews:59, priceLevel:"₹", location:"Pune", tags:["Budget","Saree","Traditional"], startingPrice:"₹10,000", image:"https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&auto=format&fit=crop&q=70" },
    { id:"bw7", name:"Pink Lotus Bridal", rating:4.5, reviews:51, priceLevel:"₹ ₹ ₹", location:"Mumbai", tags:["Luxury","Designer","Lehenga"], startingPrice:"₹65,000", image:"https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&auto=format&fit=crop&q=70" },
    { id:"bw8", name:"Vivah Creations", rating:4.5, reviews:43, priceLevel:"₹ ₹", location:"Pune", tags:["Lehenga","Embroidery","Bridal"], startingPrice:"₹20,000", image:"https://images.unsplash.com/photo-1591604466107-ab7c9ab60908?w=400&auto=format&fit=crop&q=70" },
    { id:"bw9", name:"Bride's Choice", rating:4.4, reviews:35, priceLevel:"₹", location:"Satara", tags:["Budget","Saree","Simple"], startingPrice:"₹8,000", image:"https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&auto=format&fit=crop&q=70" },
    { id:"bw10", name:"Mangalsutra Mall", rating:4.3, reviews:27, priceLevel:"₹ ₹", location:"Pune", tags:["Lehenga","Saree","Accessories"], startingPrice:"₹15,000", image:"https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&auto=format&fit=crop&q=70" },
  ],
  "Groom Wear": [
    { id:"gw1", name:"Nawab Sherwanis", rating:4.9, reviews:97, priceLevel:"₹ ₹", location:"Pune", tags:["Sherwani","Bandhgala","Designer"], startingPrice:"₹20,000", image:"https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&auto=format&fit=crop&q=70", isTopRated:true },
    { id:"gw2", name:"Royal Menswear", rating:4.8, reviews:81, priceLevel:"₹ ₹ ₹", location:"Mumbai", tags:["Sherwani","Premium","Designer"], startingPrice:"₹35,000", image:"https://images.unsplash.com/photo-1519741497674-611481863552?w=400&auto=format&fit=crop&q=70" },
    { id:"gw3", name:"Groom's Closet", rating:4.7, reviews:70, priceLevel:"₹ ₹", location:"Pune", tags:["Suit","Sherwani","Bandhgala"], startingPrice:"₹18,000", image:"https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&auto=format&fit=crop&q=70" },
    { id:"gw4", name:"Regal Attire", rating:4.7, reviews:62, priceLevel:"₹ ₹ ₹", location:"Mumbai", tags:["Luxury","Sherwani","Premium"], startingPrice:"₹50,000", image:"https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400&auto=format&fit=crop&q=70" },
    { id:"gw5", name:"The Groomsmen", rating:4.6, reviews:54, priceLevel:"₹ ₹", location:"Nashik", tags:["Suit","Sherwani","Traditional"], startingPrice:"₹15,000", image:"https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&auto=format&fit=crop&q=70" },
    { id:"gw6", name:"Man of the Day", rating:4.6, reviews:46, priceLevel:"₹", location:"Pune", tags:["Budget","Sherwani","Simple"], startingPrice:"₹8,000", image:"https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&auto=format&fit=crop&q=70" },
    { id:"gw7", name:"Dulhe Raja", rating:4.5, reviews:38, priceLevel:"₹ ₹", location:"Satara", tags:["Sherwani","Traditional","Turban"], startingPrice:"₹14,000", image:"https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&auto=format&fit=crop&q=70" },
    { id:"gw8", name:"Stylish Groom Co.", rating:4.5, reviews:31, priceLevel:"₹ ₹ ₹", location:"Mumbai", tags:["Western","Suit","Designer"], startingPrice:"₹40,000", image:"https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&auto=format&fit=crop&q=70" },
    { id:"gw9", name:"Wedding Wardrobe", rating:4.4, reviews:24, priceLevel:"₹ ₹", location:"Pune", tags:["Sherwani","Bandhgala","Suit"], startingPrice:"₹16,000", image:"https://images.unsplash.com/photo-1591604466107-ab7c9ab60908?w=400&auto=format&fit=crop&q=70" },
    { id:"gw10", name:"Classic Cuts", rating:4.3, reviews:18, priceLevel:"₹", location:"Pune", tags:["Budget","Suit","Western"], startingPrice:"₹6,000", image:"https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&auto=format&fit=crop&q=70" },
  ],
  "Jewellery & Accessories": [
    { id:"ja1", name:"Sona Jewellery", rating:4.9, reviews:135, priceLevel:"₹ ₹ ₹", location:"Pune", tags:["Gold","Diamond","Bridal Set"], startingPrice:"₹50,000", image:"https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&auto=format&fit=crop&q=70", isTopRated:true },
    { id:"ja2", name:"Regal Ornaments", rating:4.8, reviews:112, priceLevel:"₹ ₹ ₹", location:"Mumbai", tags:["Gold","Kundan","Polki"], startingPrice:"₹75,000", image:"https://images.unsplash.com/photo-1519741497674-611481863552?w=400&auto=format&fit=crop&q=70" },
    { id:"ja3", name:"Pearl & Gold", rating:4.7, reviews:94, priceLevel:"₹ ₹", location:"Pune", tags:["Pearl","Gold","Bridal"], startingPrice:"₹25,000", image:"https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&auto=format&fit=crop&q=70" },
    { id:"ja4", name:"Kundan Kreations", rating:4.7, reviews:82, priceLevel:"₹ ₹", location:"Nashik", tags:["Kundan","Meenakari","Traditional"], startingPrice:"₹20,000", image:"https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400&auto=format&fit=crop&q=70" },
    { id:"ja5", name:"Artisan Adornments", rating:4.6, reviews:71, priceLevel:"₹ ₹", location:"Mumbai", tags:["Handcrafted","Boho","Modern"], startingPrice:"₹15,000", image:"https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&auto=format&fit=crop&q=70" },
    { id:"ja6", name:"Silver Nest", rating:4.6, reviews:62, priceLevel:"₹ ₹", location:"Pune", tags:["Silver","Tribal","Traditional"], startingPrice:"₹12,000", image:"https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&auto=format&fit=crop&q=70" },
    { id:"ja7", name:"Chand Tara Jewels", rating:4.5, reviews:53, priceLevel:"₹ ₹ ₹", location:"Mumbai", tags:["Diamond","Gold","Luxury"], startingPrice:"₹1,00,000", image:"https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&auto=format&fit=crop&q=70" },
    { id:"ja8", name:"Bridal Bling", rating:4.5, reviews:45, priceLevel:"₹", location:"Satara", tags:["Imitation","Trendy","Budget"], startingPrice:"₹3,000", image:"https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&auto=format&fit=crop&q=70" },
    { id:"ja9", name:"The Jewel Box", rating:4.4, reviews:37, priceLevel:"₹ ₹", location:"Pune", tags:["Gold Plated","Modern","Bridal"], startingPrice:"₹18,000", image:"https://images.unsplash.com/photo-1591604466107-ab7c9ab60908?w=400&auto=format&fit=crop&q=70" },
    { id:"ja10", name:"Gems & Glory", rating:4.3, reviews:29, priceLevel:"₹ ₹", location:"Pune", tags:["Silver","Diamond","Bridal Set"], startingPrice:"₹22,000", image:"https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&auto=format&fit=crop&q=70" },
  ],
  Pandits: [
    { id:"pan1", name:"Pt. Ramesh Sharma", rating:4.9, reviews:118, priceLevel:"₹", location:"Pune", tags:["Vedic","All Rituals","Hindi"], startingPrice:"₹5,000", image:"https://images.unsplash.com/photo-1601128533718-374ffcca299b?w=400&auto=format&fit=crop&q=70", isTopRated:true },
    { id:"pan2", name:"Shastri Ji Pujas", rating:4.8, reviews:98, priceLevel:"₹ ₹", location:"Mumbai", tags:["Sanskrit","Vedic","All Rituals"], startingPrice:"₹8,000", image:"https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&auto=format&fit=crop&q=70" },
    { id:"pan3", name:"Divine Ceremonies", rating:4.7, reviews:85, priceLevel:"₹ ₹", location:"Pune", tags:["Vedic","Traditional","Marathi"], startingPrice:"₹10,000", image:"https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&auto=format&fit=crop&q=70" },
    { id:"pan4", name:"Vedic Vivaah", rating:4.7, reviews:74, priceLevel:"₹", location:"Nashik", tags:["Budget","Vedic","Simple"], startingPrice:"₹4,000", image:"https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400&auto=format&fit=crop&q=70" },
    { id:"pan5", name:"Subh Mangal Pandit", rating:4.6, reviews:65, priceLevel:"₹ ₹", location:"Lonavala", tags:["All Rituals","Vedic","Hindi"], startingPrice:"₹7,000", image:"https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&auto=format&fit=crop&q=70" },
    { id:"pan6", name:"Acharya Vikram", rating:4.6, reviews:56, priceLevel:"₹", location:"Satara", tags:["Budget","Marathi","Simple"], startingPrice:"₹3,500", image:"https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&auto=format&fit=crop&q=70" },
    { id:"pan7", name:"Puja Path Services", rating:4.5, reviews:47, priceLevel:"₹ ₹", location:"Mumbai", tags:["All Rituals","Sanskrit","Premium"], startingPrice:"₹12,000", image:"https://images.unsplash.com/photo-1519741497674-611481863552?w=400&auto=format&fit=crop&q=70" },
    { id:"pan8", name:"Mangalashtakam Pandits", rating:4.5, reviews:39, priceLevel:"₹", location:"Pune", tags:["Vedic","Budget","Marathi"], startingPrice:"₹3,000", image:"https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&auto=format&fit=crop&q=70" },
    { id:"pan9", name:"Dharma Ceremonies", rating:4.4, reviews:31, priceLevel:"₹ ₹", location:"Pune", tags:["All Rituals","Traditional","Hindi"], startingPrice:"₹6,000", image:"https://images.unsplash.com/photo-1591604466107-ab7c9ab60908?w=400&auto=format&fit=crop&q=70" },
    { id:"pan10", name:"Anushthan Pandits", rating:4.3, reviews:23, priceLevel:"₹", location:"Nashik", tags:["Budget","Simple","Vedic"], startingPrice:"₹2,500", image:"https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&auto=format&fit=crop&q=70" },
  ],
  "Invites & Cards": [
    { id:"ic1", name:"Vivah Invites", rating:4.9, reviews:109, priceLevel:"₹ ₹", location:"Pune", tags:["Digital","Printed","Designer"], startingPrice:"₹5,000", image:"https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=400&auto=format&fit=crop&q=70", isTopRated:true },
    { id:"ic2", name:"Paper & Petals", rating:4.8, reviews:91, priceLevel:"₹ ₹ ₹", location:"Mumbai", tags:["Luxury","Boxed","Designer"], startingPrice:"₹15,000", image:"https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&auto=format&fit=crop&q=70" },
    { id:"ic3", name:"Digital Dulhan Cards", rating:4.7, reviews:78, priceLevel:"₹", location:"Pune", tags:["Digital","Video","Budget"], startingPrice:"₹2,000", image:"https://images.unsplash.com/photo-1519741497674-611481863552?w=400&auto=format&fit=crop&q=70" },
    { id:"ic4", name:"Artsy Invitations", rating:4.7, reviews:67, priceLevel:"₹ ₹", location:"Nashik", tags:["Printed","Designer","Unique"], startingPrice:"₹8,000", image:"https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&auto=format&fit=crop&q=70" },
    { id:"ic5", name:"The Card Boutique", rating:4.6, reviews:58, priceLevel:"₹ ₹ ₹", location:"Mumbai", tags:["Premium","Boxed","Foiling"], startingPrice:"₹20,000", image:"https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400&auto=format&fit=crop&q=70" },
    { id:"ic6", name:"Shubh Likhit", rating:4.6, reviews:50, priceLevel:"₹", location:"Pune", tags:["Budget","Printed","Simple"], startingPrice:"₹1,500", image:"https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&auto=format&fit=crop&q=70" },
    { id:"ic7", name:"Invite Factory", rating:4.5, reviews:42, priceLevel:"₹ ₹", location:"Satara", tags:["Printed","Digital","Combo"], startingPrice:"₹4,000", image:"https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&auto=format&fit=crop&q=70" },
    { id:"ic8", name:"Golden Script Cards", rating:4.5, reviews:34, priceLevel:"₹ ₹ ₹", location:"Mumbai", tags:["Premium","Gold Foil","Designer"], startingPrice:"₹18,000", image:"https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&auto=format&fit=crop&q=70" },
    { id:"ic9", name:"Confetti Co.", rating:4.4, reviews:27, priceLevel:"₹ ₹", location:"Pune", tags:["Modern","Digital","Printed"], startingPrice:"₹3,500", image:"https://images.unsplash.com/photo-1591604466107-ab7c9ab60908?w=400&auto=format&fit=crop&q=70" },
    { id:"ic10", name:"Mangal Cards", rating:4.3, reviews:20, priceLevel:"₹", location:"Nashik", tags:["Budget","Traditional","Simple"], startingPrice:"₹1,000", image:"https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=400&auto=format&fit=crop&q=70" },
  ],
  "Pre Wedding Shoot": [
    { id:"pw1", name:"Love Stories Studio", rating:4.9, reviews:104, priceLevel:"₹ ₹", location:"Lonavala, Pune", tags:["Outdoor","Cinematic","Candid"], startingPrice:"₹20,000", image:"https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&auto=format&fit=crop&q=70", isTopRated:true },
    { id:"pw2", name:"Golden Moments", rating:4.8, reviews:88, priceLevel:"₹ ₹", location:"Mumbai", tags:["Beach","Outdoor","Cinematic"], startingPrice:"₹18,000", image:"https://images.unsplash.com/photo-1519741497674-611481863552?w=400&auto=format&fit=crop&q=70" },
    { id:"pw3", name:"Wanderlust Shoots", rating:4.7, reviews:74, priceLevel:"₹ ₹ ₹", location:"Lonavala", tags:["Travel","Adventure","Premium"], startingPrice:"₹35,000", image:"https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&auto=format&fit=crop&q=70" },
    { id:"pw4", name:"Before the Vows", rating:4.7, reviews:63, priceLevel:"₹ ₹", location:"Pune", tags:["Studio","Outdoor","Couple"], startingPrice:"₹16,000", image:"https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&auto=format&fit=crop&q=70" },
    { id:"pw5", name:"Couple Goals Films", rating:4.6, reviews:55, priceLevel:"₹ ₹", location:"Nashik", tags:["Cinematic","Reel","Couple"], startingPrice:"₹14,000", image:"https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400&auto=format&fit=crop&q=70" },
    { id:"pw6", name:"Story Time Shoots", rating:4.6, reviews:47, priceLevel:"₹", location:"Satara", tags:["Budget","Outdoor","Candid"], startingPrice:"₹8,000", image:"https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&auto=format&fit=crop&q=70" },
    { id:"pw7", name:"Monsoon Romance", rating:4.5, reviews:39, priceLevel:"₹ ₹", location:"Lonavala", tags:["Monsoon","Outdoor","Scenic"], startingPrice:"₹18,000", image:"https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&auto=format&fit=crop&q=70" },
    { id:"pw8", name:"Filmy Couple", rating:4.5, reviews:32, priceLevel:"₹ ₹ ₹", location:"Mumbai", tags:["Premium","Cinematic","Travel"], startingPrice:"₹40,000", image:"https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&auto=format&fit=crop&q=70" },
    { id:"pw9", name:"Hills & Hearts", rating:4.4, reviews:25, priceLevel:"₹ ₹", location:"Lonavala", tags:["Hills","Outdoor","Scenic"], startingPrice:"₹15,000", image:"https://images.unsplash.com/photo-1591604466107-ab7c9ab60908?w=400&auto=format&fit=crop&q=70" },
    { id:"pw10", name:"Sunset Frames", rating:4.3, reviews:18, priceLevel:"₹", location:"Pune", tags:["Budget","Outdoor","Candid"], startingPrice:"₹7,000", image:"https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&auto=format&fit=crop&q=70" },
  ],
  "Music & Dance": [
    { id:"md1", name:"Beats & Moves", rating:4.9, reviews:99, priceLevel:"₹ ₹", location:"Pune", tags:["Bollywood","Sangeet","Choreography"], startingPrice:"₹15,000", image:"https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=400&auto=format&fit=crop&q=70", isTopRated:true },
    { id:"md2", name:"Sangeet Maestros", rating:4.8, reviews:83, priceLevel:"₹ ₹", location:"Mumbai", tags:["Live Band","Sangeet","Classical"], startingPrice:"₹20,000", image:"https://images.unsplash.com/photo-1519741497674-611481863552?w=400&auto=format&fit=crop&q=70" },
    { id:"md3", name:"Taal & Tarang", rating:4.7, reviews:70, priceLevel:"₹ ₹ ₹", location:"Pune", tags:["Live Band","Classical","Folk"], startingPrice:"₹35,000", image:"https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&auto=format&fit=crop&q=70" },
    { id:"md4", name:"Footwork Academy", rating:4.7, reviews:62, priceLevel:"₹ ₹", location:"Nashik", tags:["Choreography","Sangeet","Bollywood"], startingPrice:"₹18,000", image:"https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&auto=format&fit=crop&q=70" },
    { id:"md5", name:"Dhol Barats", rating:4.6, reviews:54, priceLevel:"₹", location:"Satara", tags:["Dhol","Baraat","Folk"], startingPrice:"₹8,000", image:"https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&auto=format&fit=crop&q=70" },
    { id:"md6", name:"Nrityam Dance", rating:4.6, reviews:46, priceLevel:"₹ ₹", location:"Pune", tags:["Classical","Bharatnatyam","Sangeet"], startingPrice:"₹12,000", image:"https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&auto=format&fit=crop&q=70" },
    { id:"md7", name:"Wedding Beats Band", rating:4.5, reviews:38, priceLevel:"₹ ₹ ₹", location:"Mumbai", tags:["Live Band","Premium","All Genres"], startingPrice:"₹40,000", image:"https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400&auto=format&fit=crop&q=70" },
    { id:"md8", name:"Groove Masters", rating:4.5, reviews:31, priceLevel:"₹ ₹", location:"Pune", tags:["Choreography","Sangeet","Bollywood"], startingPrice:"₹14,000", image:"https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&auto=format&fit=crop&q=70" },
    { id:"md9", name:"Surmela Orchestra", rating:4.4, reviews:24, priceLevel:"₹ ₹ ₹", location:"Mumbai", tags:["Orchestra","Classical","Premium"], startingPrice:"₹45,000", image:"https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&auto=format&fit=crop&q=70" },
    { id:"md10", name:"Dance Dhamaka", rating:4.3, reviews:17, priceLevel:"₹", location:"Nashik", tags:["Budget","Sangeet","Bollywood"], startingPrice:"₹6,000", image:"https://images.unsplash.com/photo-1591604466107-ab7c9ab60908?w=400&auto=format&fit=crop&q=70" },
  ],
};

/* ── Per-category profile content ── */
export const categoryProfiles: Record<string, CategoryProfile> = {
  Photographers: {
    services: ["Candid Photography","Traditional Photography","Cinematic Videography","Pre Wedding Shoot","Wedding Films","Albums"],
    about: (n) => `${n} captures emotions, moments and memories that last a lifetime. Specialising in candid photography, cinematic videos and pre-wedding shoots. Our experienced team ensures every special moment is beautifully preserved for generations.`,
    portfolioImages: [
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&auto=format&fit=crop&q=70",
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&auto=format&fit=crop&q=70",
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&auto=format&fit=crop&q=70",
      "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&auto=format&fit=crop&q=70",
    ],
  },
  Venues: {
    services: ["Indoor Banquet Hall","Outdoor Lawn","Swimming Pool Area","Bridal Suite","Parking","Catering Kitchen"],
    about: (n) => `${n} is one of the finest wedding venues in the region, offering elegant spaces for every occasion. With state-of-the-art facilities, lush lawns and impeccable service, we ensure your big day is truly unforgettable.`,
    portfolioImages: [
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&auto=format&fit=crop&q=70",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&auto=format&fit=crop&q=70",
      "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&auto=format&fit=crop&q=70",
      "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400&auto=format&fit=crop&q=70",
    ],
  },
  Caterers: {
    services: ["Veg Menu","Non-Veg Menu","Jain Menu","Live Counter","Dessert Station","Bartending"],
    about: (n) => `${n} brings the finest culinary experience to your wedding day. With a team of expert chefs and years of experience, we craft menus that delight every palate. From traditional Indian cuisine to multi-course continental spreads, we do it all.`,
    portfolioImages: [
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&auto=format&fit=crop&q=70",
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&auto=format&fit=crop&q=70",
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&auto=format&fit=crop&q=70",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&auto=format&fit=crop&q=70",
    ],
  },
  Decorators: {
    services: ["Mandap Decoration","Stage Setup","Floral Arrangements","Lighting Design","Photo Booth","Table Centerpieces"],
    about: (n) => `${n} transforms your wedding venue into a breathtaking dreamscape. Specialising in floral art, thematic installations and elegant lighting, our creative team works closely with couples to bring their unique vision to life.`,
    portfolioImages: [
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&auto=format&fit=crop&q=70",
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&auto=format&fit=crop&q=70",
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&auto=format&fit=crop&q=70",
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&auto=format&fit=crop&q=70",
    ],
  },
  "Makeup Artists": {
    services: ["Bridal Makeup","Airbrush Makeup","HD Makeup","Engagement Look","Pre-Wedding Shoot","Party Makeup"],
    about: (n) => `${n} is a premium bridal makeup studio dedicated to making every bride look and feel her absolute best. Using top-of-the-line products and techniques, we create looks that are long-lasting, photograph beautifully and reflect your true personality.`,
    portfolioImages: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&auto=format&fit=crop&q=70",
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&auto=format&fit=crop&q=70",
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&auto=format&fit=crop&q=70",
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&auto=format&fit=crop&q=70",
    ],
  },
  "Mehndi Artists": {
    services: ["Bridal Mehndi","Arabic Mehndi","Rajasthani Mehndi","Indo-Arabic Fusion","Engagement Mehndi","Party Mehndi"],
    about: (n) => `${n} is an award-winning mehndi studio known for intricate and stunning bridal designs. Our artists blend traditional patterns with modern aesthetics to create personalised mehndi art that tells your love story through every delicate motif.`,
    portfolioImages: [
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&auto=format&fit=crop&q=70",
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&auto=format&fit=crop&q=70",
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&auto=format&fit=crop&q=70",
      "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400&auto=format&fit=crop&q=70",
    ],
  },
  DJs: {
    services: ["Bollywood Mix","EDM Night","Live Mixing","Sangeet Setup","Sound System","LED Dance Floor"],
    about: (n) => `${n} is the region's most sought-after DJ for weddings and celebrations. With an extensive music library spanning Bollywood, EDM, folk and devotional, we read the crowd and keep the energy electric from the first beat to the last.`,
    portfolioImages: [
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&auto=format&fit=crop&q=70",
      "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=400&auto=format&fit=crop&q=70",
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&auto=format&fit=crop&q=70",
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&auto=format&fit=crop&q=70",
    ],
  },
  "Bridal Wear": {
    services: ["Bridal Lehenga","Wedding Saree","Engagement Outfit","Reception Gown","Accessories","Customisation"],
    about: (n) => `${n} is a premier bridal fashion destination housing the finest collection of lehengas, sarees and designer ensembles. Our expert stylists guide every bride through a personalised selection experience to find an outfit that perfectly matches her vision.`,
    portfolioImages: [
      "https://images.unsplash.com/photo-1594552072238-b8f02c8f5c22?w=400&auto=format&fit=crop&q=70",
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&auto=format&fit=crop&q=70",
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&auto=format&fit=crop&q=70",
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&auto=format&fit=crop&q=70",
    ],
  },
  "Groom Wear": {
    services: ["Sherwani","Bandhgala Suit","Western Suit","Turban Styling","Accessories","Customisation"],
    about: (n) => `${n} is dedicated to making grooms look their absolute best on the most important day of their lives. From traditional sherwanis to contemporary suits, our master tailors craft each outfit with precision, fine fabrics and impeccable finishing.`,
    portfolioImages: [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&auto=format&fit=crop&q=70",
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&auto=format&fit=crop&q=70",
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&auto=format&fit=crop&q=70",
      "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400&auto=format&fit=crop&q=70",
    ],
  },
  "Jewellery & Accessories": {
    services: ["Bridal Jewellery Set","Gold Jewellery","Diamond Pieces","Kundan & Polki","Imitation Jewellery","Custom Orders"],
    about: (n) => `${n} is a heritage jewellery brand offering exquisite bridal collections crafted with the finest metals and gemstones. Each piece is a work of art, designed to complement the bride's outfit and become a cherished heirloom for generations to come.`,
    portfolioImages: [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&auto=format&fit=crop&q=70",
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&auto=format&fit=crop&q=70",
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&auto=format&fit=crop&q=70",
      "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&auto=format&fit=crop&q=70",
    ],
  },
  Pandits: {
    services: ["Vivah Puja","Saptapadi Rituals","Ganesh Puja","Havan","Kanyadaan Ceremony","Mangalashtakam"],
    about: (n) => `${n} are highly respected Vedic scholars with decades of experience conducting sacred Hindu wedding ceremonies. With deep knowledge of shastras and rituals, they guide couples through every step of the ceremony with devotion, clarity and grace.`,
    portfolioImages: [
      "https://images.unsplash.com/photo-1601128533718-374ffcca299b?w=400&auto=format&fit=crop&q=70",
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&auto=format&fit=crop&q=70",
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&auto=format&fit=crop&q=70",
      "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400&auto=format&fit=crop&q=70",
    ],
  },
  "Invites & Cards": {
    services: ["Digital Invites","Printed Cards","Video Invitations","Box Invites","Gold Foil Printing","Custom Design"],
    about: (n) => `${n} crafts stunning wedding invitations that set the tone for your celebration. From elegant printed cards to dynamic digital e-invites, our creative designers work with you to create the perfect first impression for your big day.`,
    portfolioImages: [
      "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=400&auto=format&fit=crop&q=70",
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&auto=format&fit=crop&q=70",
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&auto=format&fit=crop&q=70",
      "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400&auto=format&fit=crop&q=70",
    ],
  },
  "Pre Wedding Shoot": {
    services: ["Outdoor Shoot","Studio Shoot","Destination Shoot","Drone Photography","Cinematic Reel","Same-Day Edit"],
    about: (n) => `${n} specialises in crafting romantic and cinematic pre-wedding stories. From golden-hour outdoor sessions to dramatic studio setups, our creative photographers and filmmakers capture the unique chemistry between couples in visually stunning ways.`,
    portfolioImages: [
      "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&auto=format&fit=crop&q=70",
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&auto=format&fit=crop&q=70",
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&auto=format&fit=crop&q=70",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&auto=format&fit=crop&q=70",
    ],
  },
  "Music & Dance": {
    services: ["Sangeet Choreography","Live Band","Dhol Players","Baraat Band","Classical Dance","Flash Mob"],
    about: (n) => `${n} brings the magic of music and movement to your wedding celebrations. Whether you need high-energy Bollywood choreography for the sangeet or a soulful classical performance, our talented artists make every moment memorable and joyous.`,
    portfolioImages: [
      "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=400&auto=format&fit=crop&q=70",
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&auto=format&fit=crop&q=70",
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&auto=format&fit=crop&q=70",
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&auto=format&fit=crop&q=70",
    ],
  },
};

/* ── Flat lookup by vendor ID ── */
const _allVendors: VendorItem[] = Object.values(vendorsByCategory).flat();
const _vendorMap: Record<string, { vendor: VendorItem; category: string }> = {};
Object.entries(vendorsByCategory).forEach(([cat, list]) => {
  list.forEach((v) => { _vendorMap[v.id] = { vendor: v, category: cat }; });
});

export function getVendorById(id: string): { vendor: VendorItem; category: string } | null {
  return _vendorMap[id] ?? null;
}
