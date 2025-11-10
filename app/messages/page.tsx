"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { MessageCircle } from "lucide-react"
import { storage, type User, type Message } from "@/lib/mock-data"
import Image from "next/image"

export default function MessagesPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const userId = searchParams.get("userId")
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [conversations, setConversations] = useState<
    Array<{ user: User; lastMessage: Message | null; unreadCount: number }>
  >([])

  useEffect(() => {
    const user = storage.getUser()
    if (!user) {
      router.push("/")
      return
    }
    setCurrentUser(user)

    // If userId is provided, go directly to chat
    if (userId) {
      router.push(`/messages/chat?userId=${userId}`)
      return
    }

    // Get all matches
    const allUsers = storage.getAllUsers()
    const matches = allUsers.filter((u) => user.matches?.includes(u.id))

    // Get messages for each match
    const allMessages = storage.getMessages()
    const convos = matches.map((match) => {
      const messagesWithUser = allMessages.filter(
        (msg) => (msg.fromId === user.id && msg.toId === match.id) || (msg.fromId === match.id && msg.toId === user.id),
      )
      const lastMessage = messagesWithUser.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())[0] || null
      const unreadCount = messagesWithUser.filter(
        (msg) => msg.fromId === match.id && msg.toId === user.id && !msg.read,
      ).length

      return { user: match, lastMessage, unreadCount }
    })

    // Sort by last message time
    convos.sort((a, b) => {
      if (!a.lastMessage) return 1
      if (!b.lastMessage) return -1
      return new Date(b.lastMessage.timestamp).getTime() - new Date(a.lastMessage.timestamp).getTime()
    })

    setConversations(convos)
  }, [router, userId])

  if (!currentUser) {
    return null
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="mx-auto max-w-lg">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
          <div className="flex items-center justify-between p-4">
            <h1 className="text-xl font-semibold">メッセージ</h1>
          </div>
        </div>

        <div className="p-4 space-y-2">
          {conversations.length > 0 ? (
            conversations.map(({ user, lastMessage, unreadCount }) => (
              <Card
                key={user.id}
                className="p-4 cursor-pointer hover:bg-accent/50 transition-colors"
                onClick={() => router.push(`/messages/chat?userId=${user.id}`)}
              >
                <div className="flex gap-3">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={user.avatar || "/placeholder.svg?height=56&width=56"}
                      alt={user.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold truncate">{user.name}</h3>
                      {lastMessage && (
                        <span className="text-xs text-muted-foreground">
                          {new Date(lastMessage.timestamp).toLocaleDateString("ja-JP", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground truncate">
                        {lastMessage ? lastMessage.content : "メッセージを送信"}
                      </p>
                      {unreadCount > 0 && (
                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                          {unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <Card className="p-12 text-center">
              <MessageCircle className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
              <h3 className="font-semibold mb-2">メッセージがありません</h3>
              <p className="text-sm text-muted-foreground">マッチングした相手とメッセージを始めましょう</p>
            </Card>
          )}
        </div>
      </div>

      <Navigation />
    </div>
  )
}
