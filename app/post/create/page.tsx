"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { storage, type User, type JobPosting } from "@/lib/mock-data"
import { useToast } from "@/hooks/use-toast"

export default function CreatePostPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    compensation: "",
  })
  const [requirements, setRequirements] = useState<string[]>([])

  useEffect(() => {
    const user = storage.getUser()
    if (!user) {
      router.push("/")
      return
    }
    if (user.type !== "stylist") {
      router.push("/post")
      return
    }
    setCurrentUser(user)
  }, [router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!currentUser) return

    const newJob: JobPosting = {
      id: Date.now().toString(),
      stylistId: currentUser.id,
      stylistName: currentUser.name,
      salonName: currentUser.salonName || "",
      title: formData.title,
      description: formData.description,
      date: formData.date,
      time: formData.time,
      location: formData.location,
      compensation: formData.compensation,
      requirements,
      createdAt: new Date(),
    }

    storage.addJobPosting(newJob)

    toast({
      title: "募集を作成しました",
      description: "モデルからの応募をお待ちください",
    })

    router.push("/post")
  }

  const toggleRequirement = (req: string) => {
    setRequirements((prev) => (prev.includes(req) ? prev.filter((r) => r !== req) : [...prev, req]))
  }

  if (!currentUser) {
    return null
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="mx-auto max-w-lg pt-8 pb-24">
        <Link
          href="/post"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          戻る
        </Link>

        <Card>
          <CardHeader>
            <CardTitle>モデル募集を作成</CardTitle>
            <CardDescription>募集内容を入力してください</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">募集タイトル</Label>
                <Input
                  id="title"
                  placeholder="例: カットモデル募集（ショート〜ミディアム）"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">詳細説明</Label>
                <Textarea
                  id="description"
                  placeholder="施術内容や希望するスタイルについて詳しく説明してください"
                  rows={4}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">日付</Label>
                  <Input
                    id="date"
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">時間</Label>
                  <Input
                    id="time"
                    type="time"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">場所</Label>
                <Input
                  id="location"
                  placeholder="サロンの住所"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="compensation">報酬</Label>
                <Input
                  id="compensation"
                  placeholder="例: 無料、交通費支給、3,000円"
                  required
                  value={formData.compensation}
                  onChange={(e) => setFormData({ ...formData, compensation: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>条件（任意）</Label>
                <div className="flex flex-wrap gap-2">
                  {["カラー経験あり", "ブリーチ可能", "ロングヘア", "ショートヘア", "初心者歓迎", "撮影協力"].map(
                    (req) => (
                      <Button
                        key={req}
                        type="button"
                        variant={requirements.includes(req) ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleRequirement(req)}
                      >
                        {req}
                      </Button>
                    ),
                  )}
                </div>
              </div>

              <Button type="submit" className="w-full">
                募集を作成
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
