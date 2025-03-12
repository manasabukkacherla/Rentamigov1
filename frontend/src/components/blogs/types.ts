export interface Author {
  name: string
  avatar: string
}

export interface Comment {
  id: number
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
  views?: number
}

export interface Blogpost {
  id: number
  title: string
  excerpt: string
  content: string
  coverImage: string
  tags: string[]
  date: string
  category: string
  readTime: number
  author: Author
  likes: number
  comments: number
  commentsList: Comment[]
  reviews: Review[]
  shares: number
  userHasLiked?: boolean
  views?: number
}

