// Mock data store for demonstration (will be replaced with real database)
export type UserType = "stylist" | "model"

export interface User {
  id: string
  type: UserType
  email: string
  name: string
  age?: number
  gender?: string
  location?: string
  bio?: string
  avatar?: string
  photos?: string[]
  // Stylist specific
  salonName?: string
  experience?: string
  specialties?: string[]
  // Model specific
  hairLength?: string
  hairColor?: string
  availability?: string[]
  // Matching
  likes?: string[]
  matches?: string[]
}

export interface JobPosting {
  id: string
  stylistId: string
  stylistName: string
  salonName: string
  title: string
  description: string
  date: string
  time: string
  location: string
  compensation: string
  requirements: string[]
  createdAt: Date
}

export interface Message {
  id: string
  fromId: string
  toId: string
  content: string
  timestamp: Date
  read: boolean
}

// Local storage helpers
export const storage = {
  getUser: (): User | null => {
    if (typeof window === "undefined") return null
    const user = localStorage.getItem("currentUser")
    return user ? JSON.parse(user) : null
  },
  setUser: (user: User) => {
    if (typeof window === "undefined") return
    localStorage.setItem("currentUser", JSON.stringify(user))
  },
  clearUser: () => {
    if (typeof window === "undefined") return
    localStorage.removeItem("currentUser")
  },
  getAllUsers: (): User[] => {
    if (typeof window === "undefined") return []
    const users = localStorage.getItem("allUsers")
    return users ? JSON.parse(users) : []
  },
  addUser: (user: User) => {
    if (typeof window === "undefined") return
    const users = storage.getAllUsers()
    users.push(user)
    localStorage.setItem("allUsers", JSON.stringify(users))
  },
  updateUser: (userId: string, updates: Partial<User>) => {
    if (typeof window === "undefined") return
    const users = storage.getAllUsers()
    const index = users.findIndex((u) => u.id === userId)
    if (index !== -1) {
      users[index] = { ...users[index], ...updates }
      localStorage.setItem("allUsers", JSON.stringify(users))
      if (storage.getUser()?.id === userId) {
        storage.setUser(users[index])
      }
    }
  },
  getJobPostings: (): JobPosting[] => {
    if (typeof window === "undefined") return []
    const jobs = localStorage.getItem("jobPostings")
    return jobs ? JSON.parse(jobs) : []
  },
  addJobPosting: (job: JobPosting) => {
    if (typeof window === "undefined") return
    const jobs = storage.getJobPostings()
    jobs.push(job)
    localStorage.setItem("jobPostings", JSON.stringify(jobs))
  },
  getMessages: (): Message[] => {
    if (typeof window === "undefined") return []
    const messages = localStorage.getItem("messages")
    return messages ? JSON.parse(messages) : []
  },
  addMessage: (message: Message) => {
    if (typeof window === "undefined") return
    const messages = storage.getMessages()
    messages.push(message)
    localStorage.setItem("messages", JSON.stringify(messages))
  },
  markMessagesAsRead: (userId: string, otherUserId: string) => {
    if (typeof window === "undefined") return
    const messages = storage.getMessages()
    const updated = messages.map((msg) =>
      msg.fromId === otherUserId && msg.toId === userId ? { ...msg, read: true } : msg,
    )
    localStorage.setItem("messages", JSON.stringify(updated))
  },
}

// Mock users for demonstration
export const mockUsers: User[] = [
  {
    id: "1",
    type: "stylist",
    email: "tanaka@salon.jp",
    name: "田中 美咲",
    age: 28,
    gender: "女性",
    location: "東京都渋谷区",
    bio: "表参道のサロンで5年間スタイリストをしています。トレンドを取り入れたカットが得意です。",
    avatar: "/japanese-female-hairstylist.jpg",
    salonName: "HAIR SALON TOKYO",
    experience: "5年",
    specialties: ["カット", "カラー", "パーマ"],
    likes: [],
    matches: [],
  },
  {
    id: "2",
    type: "model",
    email: "sato@example.jp",
    name: "佐藤 花子",
    age: 22,
    gender: "女性",
    location: "東京都新宿区",
    bio: "美容学生です。新しいヘアスタイルに挑戦したいです！",
    avatar: "/japanese-young-woman-model.jpg",
    hairLength: "ロング",
    hairColor: "ブラウン",
    availability: ["平日夕方", "週末"],
    likes: [],
    matches: [],
  },
  {
    id: "3",
    type: "stylist",
    email: "yamada@beauty.jp",
    name: "山田 健太",
    age: 32,
    gender: "男性",
    location: "東京都港区",
    bio: "青山のサロンでディレクターをしています。メンズカットとカラーリングが得意です。",
    avatar: "/male-hairstylist.jpg",
    salonName: "BEAUTY STUDIO AOYAMA",
    experience: "10年以上",
    specialties: ["カット", "カラー", "セット"],
    likes: [],
    matches: [],
  },
  {
    id: "4",
    type: "model",
    email: "suzuki@example.jp",
    name: "鈴木 太郎",
    age: 25,
    gender: "男性",
    location: "東京都世田谷区",
    bio: "イメチェンしたいです。短髪からミディアムまで対応できます。",
    avatar: "/male-model.jpg",
    hairLength: "ショート",
    hairColor: "ブラック",
    availability: ["週末午後", "週末夕方"],
    likes: [],
    matches: [],
  },
  {
    id: "5",
    type: "model",
    email: "kobayashi@example.jp",
    name: "小林 愛",
    age: 20,
    gender: "女性",
    location: "東京都目黒区",
    bio: "カラーモデル募集中！ブリーチ経験あります。",
    avatar: "/young-female-model.jpg",
    hairLength: "ミディアム",
    hairColor: "ブラウン",
    availability: ["平日午後", "週末午前"],
    likes: [],
    matches: [],
  },
  {
    id: "6",
    type: "stylist",
    email: "ito@salon.jp",
    name: "伊藤 さくら",
    age: 26,
    gender: "女性",
    location: "東京都中野区",
    bio: "ナチュラルで柔らかいスタイルが得意です。カウンセリングを大切にしています。",
    avatar: "/female-stylist-2.jpg",
    salonName: "Natural Hair Salon",
    experience: "3-5年",
    specialties: ["カット", "トリートメント", "ヘッドスパ"],
    likes: [],
    matches: [],
  },
]
