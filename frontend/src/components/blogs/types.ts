export interface Author {
  name: string
  avatar: string
}

export interface Comment {
  id: string
  text: string
  author: Author
  date: string
  likes: number
}

export interface Review {
  id: number
  rating: number
  text: string
  author: Author
  date: string
}

export interface BlogPostType {
  id: number
  title: string
  content: string
  category: string
  coverImage: string
  readTime: number
  date: string
  author: Author
  likes: number
  comments: number
  commentsList: Comment[]
  reviews: Review[]
  shares: number
  tags: string[]
  userHasLiked?: boolean
  excerpt: string
  views: number | undefined
}
export interface Blogpost {
  id: string;
  title: string;
  views?: number;
  likes: number;
}
export interface Blog {
  id: string
  title: string
  content: string
  rating: number
  excerpt: string
  coverImage: string
  tags: string[]
  date: string
  author: string
  authorImage: string
  readTime: string
  likes: number
  comments: number
  category: string
  commentsList: Comment[]
  reviews: Review[]
  shares: number
}
