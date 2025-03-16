import { BlogPostType } from '../types/type';

export const blogPosts: BlogPostType[] = [
  {
    id: 1,
    title: "Modern Luxury Villa with Ocean View",
    content: "Experience the epitome of luxury living in this stunning modern villa overlooking the ocean. This architectural masterpiece features floor-to-ceiling windows that frame breathtaking views of the coastline. The open-concept design creates a seamless flow between indoor and outdoor living spaces, perfect for entertaining or relaxing with family. The property includes a private infinity pool, landscaped gardens, and a state-of-the-art smart home system. With 5 bedrooms and 6 bathrooms, this villa offers both space and privacy for residents and guests alike.",
    category: "Luxury",
    coverImage: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    readTime: 5,
    date: "May 15, 2025",
    author: {
      name: "Alex Johnson",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    likes: 124,
    comments: 32,
    commentsList: [
      {
        id: 1,
        text: "This property is absolutely stunning! The ocean views are even better in person.",
        author: {
          name: "Emily Parker",
          avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
        },
        date: "May 16, 2025",
        likes: 8
      },
      {
        id: 2,
        text: "I visited this property last week and was blown away by the architecture and attention to detail.",
        author: {
          name: "Michael Thompson",
          avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
        },
        date: "May 17, 2025",
        likes: 5
      }
    ],
    reviews: [
      {
        id: 1,
        rating: 5,
        text: "Exceptional property with breathtaking views. The infinity pool is a dream!",
        author: {
          name: "Jennifer Wilson",
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
        },
        date: "May 18, 2025"
      }
    ],
    shares: 133,
    tags: ["house", "budgeting", "expenses"],
    userHasLiked: false,
    excerpt: "Discover the essential tips for finding an apartment that meets all your needs without breaking the bank...",
  },
  {
    id: 2,
    title: "Charming Cottage in the Countryside",
    content: "Escape the hustle and bustle of city life with this idyllic cottage nestled in the peaceful countryside. This beautifully restored property combines rustic charm with modern amenities, creating a cozy yet functional living space. The cottage features exposed wooden beams, a traditional fireplace, and a country-style kitchen equipped with high-end appliances. Outside, you'll find a well-maintained garden with mature trees, a vegetable patch, and a charming patio area perfect for al fresco dining during the warmer months.",
    category: "Rural",
    coverImage: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2065&q=80",
    readTime: 8,
    date: "May 10, 2025",
    author: {
      name: "Samantha Lee",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
    },
    likes: 89,
    comments: 17,
    commentsList: [
      {
        id: 1,
        text: "This cottage is the perfect weekend getaway. So peaceful and charming!",
        author: {
          name: "Robert Davis",
          avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
        },
        date: "May 11, 2025",
        likes: 3
      }
    ],
    reviews: [
      {
        id: 1,
        rating: 4,
        text: "Beautiful cottage with great character. The garden is lovely and well-maintained.",
        author: {
          name: "Thomas Brown",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
        },
        date: "May 12, 2025"
      }
    ],
    shares: 50,
    tags: ["house", "budgeting", "expenses"],
    userHasLiked: false,
    excerpt: "Penthouses offer unparalleled views and amenities, but come with a premium price tag. We analyze if the investment is justified...",
  },
  {
    id: 3,
    title: "Urban Loft in Downtown District",
    content: "Live in the heart of the action with this stylish urban loft in the vibrant downtown district. This contemporary space features soaring ceilings, exposed brick walls, and industrial-inspired finishes that pay homage to the building's historic past. The open floor plan is bathed in natural light thanks to the large warehouse windows, creating a bright and airy atmosphere. The property has been thoughtfully renovated with high-quality materials and fixtures, including polished concrete floors, custom cabinetry, and designer lighting.",
    category: "Urban",
    coverImage: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    readTime: 6,
    date: "May 5, 2025",
    author: {
      name: "Marcus Chen",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
    },
    likes: 56,
    comments: 8,
    commentsList: [
      {
        id: 1,
        text: "The location of this loft is perfect! Walking distance to all the best restaurants and shops.",
        author: {
          name: "Lisa Wong",
          avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
        },
        date: "May 6, 2025",
        likes: 2
      }
    ],
    reviews: [
      {
        id: 1,
        rating: 5,
        text: "Incredible urban space with so much character. The exposed brick and high ceilings are stunning.",
        author: {
          name: "Daniel Kim",
          avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
        },
        date: "May 7, 2025"
      }
    ],
    shares: 79,
    tags: ["house", "budgeting", "expenses"],
    userHasLiked: false,
    excerpt: "Learn effective strategies to negotiate better rental terms when committing to long-term housing agreements...",
  },
  {
    id: 4,
    title: "Family-Friendly Suburban Home",
    content: "Perfect for growing families, this spacious suburban home offers comfort, convenience, and community. Located in a highly sought-after neighborhood with excellent schools, parks, and amenities nearby, this property provides an ideal environment for raising children. The house features 4 bedrooms, 3 bathrooms, a large kitchen with breakfast nook, formal dining room, and a cozy family room with a fireplace. The backyard is fully fenced with a play area, mature trees, and a covered patio for outdoor entertaining.",
    category: "Suburban",
    coverImage: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    readTime: 4,
    date: "April 28, 2025",
    author: {
      name: "Priya Sharma",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    likes: 42,
    comments: 5,
    commentsList: [
      {
        id: 1,
        text: "We just moved into this neighborhood and love it! Great for families with kids.",
        author: {
          name: "Sarah Johnson",
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
        },
        date: "April 29, 2025",
        likes: 1
      }
    ],
    reviews: [
      {
        id: 1,
        rating: 4,
        text: "Wonderful family home in a great school district. The backyard is perfect for children.",
        author: {
          name: "Jessica Miller",
          avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
        },
        date: "April 30, 2025"
      }
    ],
    shares: 78,
    tags: ["house", "budgeting", "expenses"],
    userHasLiked: false,
    excerpt: "Before signing that lease agreement for a 2BHK, make sure you've thoroughly checked these five critical aspects...",
  },
  {
    id: 5,
    title: "Beachfront Condo with Panoramic Views",
    content: "Wake up to the sound of waves and breathtaking ocean views in this luxurious beachfront condo. This turnkey property offers resort-style living with direct beach access and world-class amenities. The interior features an open concept design with high-end finishes, including marble countertops, custom cabinetry, and premium appliances. Floor-to-ceiling windows and a spacious balcony maximize the stunning panoramic views of the coastline. The building offers 24-hour security, concierge service, a fitness center, swimming pool, and underground parking.",
    category: "Coastal",
    coverImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    readTime: 7,
    date: "April 22, 2025",
    author: {
      name: "David Wilson",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
    },
    likes: 78,
    comments: 14,
    commentsList: [
      {
        id: 1,
        text: "The views from this condo are absolutely breathtaking! Worth every penny.",
        author: {
          name: "Amanda Taylor",
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
        },
        date: "April 23, 2025",
        likes: 6
      },
      {
        id: 2,
        text: "I stayed in a similar unit in this building and the amenities are top-notch.",
        author: {
          name: "Ryan Peters",
          avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
        },
        date: "April 24, 2025",
        likes: 3
      }
    ],
    reviews: [
      {
        id: 1,
        rating: 5,
        text: "Paradise found! The beach access and ocean views make this property exceptional.",
        author: {
          name: "Christopher Lee",
          avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
        },
        date: "April 25, 2025"
      }
    ],
    shares: 133,
    tags: ["house", "budgeting", "expenses"],
    userHasLiked: false,
    excerpt: "Creative design solutions to transform your compact studio apartment into a functional and stylish home..."
  },
  {
    id: 6,
    title: "Historic Brownstone with Modern Updates",
    content: "Experience the perfect blend of historic charm and contemporary comfort in this beautifully renovated brownstone. Located in a historic district, this property showcases original architectural details such as crown moldings, hardwood floors, and a decorative fireplace. The renovation has thoughtfully integrated modern amenities while preserving the building's character and integrity. The kitchen features custom cabinetry, high-end appliances, and a marble island, while the bathrooms have been updated with luxury fixtures and finishes.",
    category: "Historic",
    coverImage: "https://images.unsplash.com/photo-1625602812206-5ec545ca1231?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    readTime: 9,
    date: "April 15, 2025",
    author: {
      name: "James Rodriguez",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
    },
    likes: 65,
    comments: 11,
    commentsList: [
      {
        id: 1,
        text: "I love how they preserved the historic details while adding modern amenities.",
        author: {
          name: "Olivia Martinez",
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
        },
        date: "April 16, 2025",
        likes: 4
      }
    ],
    reviews: [
      {
        id: 1,
        rating: 5,
        text: "A perfect blend of old and new. The renovation was done with incredible attention to detail.",
        author: {
          name: "William Scott",
          avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
        },
        date: "April 17, 2025"
      }
    ],
    shares: 45,
    tags: ["house", "budgeting", "expenses"],
    userHasLiked: false,
    excerpt: "Beyond the monthly rent, there are several expenses that renters should anticipate when budgeting for a house...",
  }
];