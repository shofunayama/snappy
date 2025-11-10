"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Send } from "lucide-react"
import { storage, type User, type Message } from "@/lib/mock-data"
import Image from "next/image"
import { cn } from "@/lib/utils"

export default function ChatPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const userId = searchParams.get("userId")
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [otherUser, setOtherUser] = useState<User | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const user = storage.getUser()
    if (!user) {
      router.push("/")
      return
    }
    if (!userId) {
      router.push("/messages")
      return
    }

    setCurrentUser(user)

    // Get other user
    const allUsers = storage.getAllUsers()
    const other = allUsers.find((u) => u.id === userId)
    if (!other) {
      router.push("/messages")
      return
    }
    setOtherUser(other)

    // Get messages
    const allMessages = storage.getMessages()
    const chatMessages = allMessages
      .filter(
        (msg) => (msg.fromId === user.id && msg.toId === userId) || (msg.fromId === userId && msg.toId === user.id),
      )
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())

    setMessages(chatMessages)

    // Mark messages as read
    storage.markMessagesAsRead(user.id, userId)

    // Scroll to bottom
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }, [router, userId])

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !currentUser || !otherUser) return

    const message: Message = {
      id: Date.now().toString(),
      fromId: currentUser.id,
      toId: otherUser.id,
      content: newMessage.trim(),
      timestamp: new Date(),
      read: false,
    }

    storage.addMessage(message)
    setMessages([...messages, message])
    setNewMessage("")

    // Scroll to bottom
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }

  if (!currentUser || !otherUser) {
    return null
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border">
        <div className="flex items-center gap-3 p-4 max-w-lg mx-auto">
          <Link href="/messages" className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
            <Image
              src={otherUser.avatar || "/placeholder.svg?height=40&width=40"}
              alt={otherUser.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-semibold truncate">{otherUser.name}</h2>
            <p className="text-xs text-muted-foreground truncate">
              {otherUser.type === "stylist" ? otherUser.salonName : `${otherUser.age}歳 • ${otherUser.location}`}
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 max-w-lg mx-auto w-full">
        <div className="space-y-4">
          {messages.length > 0 ? (
            messages.map((message) => {
              const isOwn = message.fromId === currentUser.id
              return (
                <div key={message.id} className={cn("flex", isOwn ? "justify-end" : "justify-start")}>
                  <Card className={cn("max-w-[75%] p-3", isOwn ? "bg-primary text-primary-foreground" : "bg-muted")}>
                    <p className="text-sm leading-relaxed break-words">{message.content}</p>
                    <p className={cn("text-xs mt-1", isOwn ? "text-primary-foreground/70" : "text-muted-foreground")}>
                      {new Date(message.timestamp).toLocaleTimeString("ja-JP", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </Card>
                </div>
              )
            })
          ) : (
            <div className="text-center py-12">
              <p className="text-sm text-muted-foreground">メッセージを送信して会話を始めましょう</p>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="sticky bottom-0 bg-background border-t border-border p-4">
        <form onSubmit={handleSend} className="flex gap-2 max-w-lg mx-auto">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="メッセージを入力..."
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={!newMessage.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}
