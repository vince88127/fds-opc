export interface User {
  id: string
  username: string
  email: string
  password: string
  avatar?: string
  role: 'admin' | 'member' | 'guest'
  membershipExpiry?: Date
  createdAt: Date
}

export interface Post {
  id: string
  authorId: string
  author?: User
  title: string
  content: string
  tags: string[]
  likes: number
  comments: Comment[]
  createdAt: Date
  updatedAt: Date
}

export interface Comment {
  id: string
  authorId: string
  author?: User
  content: string
  createdAt: Date
}

export interface Project {
  id: string
  title: string
  description: string
  content: string
  category: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  estimatedIncome: string
  tags: string[]
  coverImage?: string
  createdAt: Date
  updatedAt: Date
}

export interface Voyage {
  id: string
  title: string
  description: string
  content: string
  startDate: Date
  endDate: Date
  registrationDeadline: Date
  maxParticipants: number
  currentParticipants: number
  participants: string[]
  status: 'upcoming' | 'ongoing' | 'completed'
  coverImage?: string
  createdAt: Date
}

export interface Meetup {
  id: string
  organizerId: string
  organizer?: User
  title: string
  description: string
  location: string
  date: Date
  maxParticipants: number
  currentParticipants: number
  participants: string[]
  status: 'upcoming' | 'completed' | 'cancelled'
  coverImage?: string
  createdAt: Date
}

export interface SquarePost {
  id: string
  authorId: string
  author?: User
  content: string
  images?: string[]
  likes: number
  comments: Comment[]
  createdAt: Date
}

export interface DeepSeaCircle {
  id: string
  title: string
  description: string
  content: string
  price: number
  duration: string
  features: string[]
  coverImage?: string
  createdAt: Date
}
