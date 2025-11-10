"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft } from "lucide-react"
import { storage, type User } from "@/lib/mock-data"
import { useToast } from "@/hooks/use-toast"

export default function ModelRegisterPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    age: "",
    gender: "",
    location: "",
    hairLength: "",
    hairColor: "",
    bio: "",
  })
  const [availability, setAvailability] = useState<string[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newUser: User = {
      id: Date.now().toString(),
      type: "model",
      email: formData.email,
      name: formData.name,
      age: Number.parseInt(formData.age),
      gender: formData.gender,
      location: formData.location,
      hairLength: formData.hairLength,
      hairColor: formData.hairColor,
      availability,
      bio: formData.bio,
      avatar: "/young-model-portrait.jpg",
      likes: [],
      matches: [],
    }

    storage.addUser(newUser)
    storage.setUser(newUser)

    toast({
      title: "登録完了",
      description: "アカウントが作成されました",
    })

    router.push("/match")
  }

  const toggleAvailability = (time: string) => {
    setAvailability((prev) => (prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]))
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="mx-auto max-w-lg pt-8 pb-24">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          戻る
        </Link>

        <Card>
          <CardHeader>
            <CardTitle>カットモデル登録</CardTitle>
            <CardDescription>プロフィール情報を入力してください</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">メールアドレス</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">パスワード</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">お名前</Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">年齢</Label>
                  <Input
                    id="age"
                    type="number"
                    required
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">性別</Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) => setFormData({ ...formData, gender: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="選択" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="男性">男性</SelectItem>
                      <SelectItem value="女性">女性</SelectItem>
                      <SelectItem value="その他">その他</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">お住まいの地域</Label>
                <Input
                  id="location"
                  placeholder="例: 東京都新宿区"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="hairLength">髪の長さ</Label>
                  <Select
                    value={formData.hairLength}
                    onValueChange={(value) => setFormData({ ...formData, hairLength: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="選択" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ショート">ショート</SelectItem>
                      <SelectItem value="ミディアム">ミディアム</SelectItem>
                      <SelectItem value="ロング">ロング</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hairColor">髪色</Label>
                  <Select
                    value={formData.hairColor}
                    onValueChange={(value) => setFormData({ ...formData, hairColor: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="選択" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ブラック">ブラック</SelectItem>
                      <SelectItem value="ブラウン">ブラウン</SelectItem>
                      <SelectItem value="ブロンド">ブロンド</SelectItem>
                      <SelectItem value="その他">その他</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>対応可能な時間帯</Label>
                <div className="flex flex-wrap gap-2">
                  {["平日午前", "平日午後", "平日夕方", "週末午前", "週末午後", "週末夕方"].map((time) => (
                    <Button
                      key={time}
                      type="button"
                      variant={availability.includes(time) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleAvailability(time)}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">自己紹介</Label>
                <Textarea
                  id="bio"
                  placeholder="どんなヘアスタイルに興味があるか教えてください"
                  rows={4}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                />
              </div>

              <Button type="submit" className="w-full">
                登録する
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
