import { Blog } from '../types';

export const mockBlogs: Blog[] = [
  {
    id: '1',
    title: 'The Art of Minimalist Living',
    content: 'Minimalism isn\'t just about owning less, but about making room for more: more time, more peace, more creativity, more experiences, more contribution, more contentment, more freedom. Clearing the clutter from life\'s path helps us make that room.',
    author: {
      id: '101',
      name: 'Jane Smith'
    },
    createdAt: '2025-04-01T10:30:00Z',
    updatedAt: '2025-04-01T10:30:00Z',
    likes: 124,
    dislikes: 8,
    rating: 4.7,
    tags: ['Lifestyle', 'Minimalism', 'Self-improvement'],
    comments: [
      {
        id: 'c1',
        content: 'This changed my perspective on decluttering!',
        author: 'Alex Johnson',
        createdAt: '2025-04-02T14:15:00Z'
      }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?ixlib=rb-1.2.1&auto=format&fit=crop&w=1347&q=80'
  },
  {
    id: '2',
    title: 'Urban Photography: Capturing City Life',
    content: 'Urban photography is the art of capturing the essence of city life, from its architecture to its people. It\'s about finding beauty in the chaos and stories in the mundane.',
    author: {
      id: '102',
      name: 'Michael Chen'
    },
    createdAt: '2025-03-28T09:15:00Z',
    updatedAt: '2025-03-29T11:20:00Z',
    likes: 89,
    dislikes: 3,
    rating: 4.5,
    tags: ['Photography', 'Urban', 'Art'],
    comments: [
      {
        id: 'c2',
        content: 'Your tips on composition are so helpful!',
        author: 'Sarah Williams',
        createdAt: '2025-03-30T16:45:00Z'
      }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    id: '3',
    title: 'Sustainable Travel: Exploring Responsibly',
    content: 'Sustainable travel is about making simple choices to lessen your environmental impact, support local economies, and protect cultures and wildlife while exploring our beautiful planet.',
    author: {
      id: '103',
      name: 'Elena Rodriguez'
    },
    createdAt: '2025-03-25T12:00:00Z',
    updatedAt: '2025-03-26T08:30:00Z',
    likes: 156,
    dislikes: 5,
    rating: 4.8,
    tags: ['Travel', 'Sustainability', 'Environment'],
    comments: [
      {
        id: 'c3',
        content: 'I\'ve been looking for eco-friendly travel tips like these!',
        author: 'David Thompson',
        createdAt: '2025-03-27T10:20:00Z'
      }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1500835556837-99ac94a94552?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    id: '4',
    title: 'The Science of Productivity',
    content: 'Productivity isn\'t about doing more things—it\'s about doing the right things. Understanding the science behind focus, energy management, and habit formation can transform how you work.',
    author: {
      id: '104',
      name: 'Robert Kim'
    },
    createdAt: '2025-03-20T14:45:00Z',
    updatedAt: '2025-03-21T09:10:00Z',
    likes: 112,
    dislikes: 7,
    rating: 4.6,
    tags: ['Productivity', 'Science', 'Self-improvement'],
    comments: [
      {
        id: 'c4',
        content: 'The Pomodoro technique you mentioned changed my work life!',
        author: 'Jennifer Lee',
        createdAt: '2025-03-22T11:30:00Z'
      }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
  },
  {
    id: '5',
    title: 'Culinary Adventures: Street Food Around the World',
    content: 'Street food is the true essence of a culture\'s culinary identity. From Bangkok\'s pad thai to Mexico City\'s tacos, these humble dishes tell stories of tradition, innovation, and community.',
    author: {
      id: '105',
      name: 'Carlos Mendez'
    },
    createdAt: '2025-03-15T11:20:00Z',
    updatedAt: '2025-03-16T13:40:00Z',
    likes: 178,
    dislikes: 4,
    rating: 4.9,
    tags: ['Food', 'Travel', 'Culture'],
    comments: [
      {
        id: 'c5',
        content: 'Your description of Japanese street food made me book a flight!',
        author: 'Emma Wilson',
        createdAt: '2025-03-17T15:50:00Z'
      }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  }
];