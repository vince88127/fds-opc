import fs from 'fs/promises'
import path from 'path'
import { User, Post, Project, Voyage, Meetup, SquarePost, DeepSeaCircle } from '@/types'

const DB_DIR = path.join(process.cwd(), 'data')

async function ensureDbDir() {
  try {
    await fs.access(DB_DIR)
  } catch {
    await fs.mkdir(DB_DIR, { recursive: true })
  }
}

async function readData<T>(filename: string): Promise<T[]> {
  await ensureDbDir()
  const filePath = path.join(DB_DIR, filename)
  try {
    const data = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(data)
  } catch {
    return []
  }
}

async function writeData<T>(filename: string, data: T[]): Promise<void> {
  await ensureDbDir()
  const filePath = path.join(DB_DIR, filename)
  await fs.writeFile(filePath, JSON.stringify(data, null, 2))
}

export const db = {
  users: {
    getAll: () => readData<User>('users.json'),
    save: (users: User[]) => writeData('users.json', users),
    findByEmail: async (email: string) => {
      const users = await readData<User>('users.json')
      return users.find(u => u.email === email)
    },
    findById: async (id: string) => {
      const users = await readData<User>('users.json')
      return users.find(u => u.id === id)
    },
    create: async (user: User) => {
      const users = await readData<User>('users.json')
      users.push(user)
      await writeData('users.json', users)
      return user
    }
  },
  posts: {
    getAll: () => readData<Post>('posts.json'),
    save: (posts: Post[]) => writeData('posts.json', posts),
    findById: async (id: string) => {
      const posts = await readData<Post>('posts.json')
      return posts.find(p => p.id === id)
    },
    create: async (post: Post) => {
      const posts = await readData<Post>('posts.json')
      posts.push(post)
      await writeData('posts.json', posts)
      return post
    }
  },
  projects: {
    getAll: () => readData<Project>('projects.json'),
    save: (projects: Project[]) => writeData('projects.json', projects),
    findById: async (id: string) => {
      const projects = await readData<Project>('projects.json')
      return projects.find(p => p.id === id)
    }
  },
  voyages: {
    getAll: () => readData<Voyage>('voyages.json'),
    save: (voyages: Voyage[]) => writeData('voyages.json', voyages),
    findById: async (id: string) => {
      const voyages = await readData<Voyage>('voyages.json')
      return voyages.find(v => v.id === id)
    }
  },
  meetups: {
    getAll: () => readData<Meetup>('meetups.json'),
    save: (meetups: Meetup[]) => writeData('meetups.json', meetups),
    findById: async (id: string) => {
      const meetups = await readData<Meetup>('meetups.json')
      return meetups.find(m => m.id === id)
    }
  },
  squarePosts: {
    getAll: () => readData<SquarePost>('square-posts.json'),
    save: (posts: SquarePost[]) => writeData('square-posts.json', posts),
    create: async (post: SquarePost) => {
      const posts = await readData<SquarePost>('square-posts.json')
      posts.push(post)
      await writeData('square-posts.json', posts)
      return post
    }
  },
  deepSeaCircles: {
    getAll: () => readData<DeepSeaCircle>('deep-sea-circles.json'),
    save: (circles: DeepSeaCircle[]) => writeData('deep-sea-circles.json', circles)
  }
}
