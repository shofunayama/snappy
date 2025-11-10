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

export default function StylistRegisterPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    age: "",
    gender: "",
    location: "",
    salonName: "",
    experience: "",
    bio: "",
  })
  const [specialties, setSpecialties] = useState<string[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newUser: User = {
      id: Date.now().toString(),
      type: "stylist",
      email: formData.email,
      name: formData.name,
      age: Number.parseInt(formData.age),
      gender: formData.gender,
      location: formData.location,
      salonName: formData.salonName,
      experience: formData.experience,
      specialties,
      bio: formData.bio,
      avatar: "/professional-hairstylist.png",
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

  const toggleSpecialty = (specialty: string) => {
    setSpecialties((prev) => (prev.includes(specialty) ? prev.filter((s) => s !== specialty) : [...prev, specialty]))
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
            <CardTitle>美容師登録</CardTitle>
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
                <Label htmlFor="location">勤務地</Label>
                <Input
                  id="location"
                  placeholder="例: 東京都渋谷区"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="salonName">サロン名</Label>
                <Input
                  id="salonName"
                  required
                  value={formData.salonName}
                  onChange={(e) => setFormData({ ...formData, salonName: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">経験年数</Label>
                <Select
                  value={formData.experience}
                  onValueChange={(value) => setFormData({ ...formData, experience: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1年未満">1年未満</SelectItem>
                    <SelectItem value="1-3年">1-3年</SelectItem>
                    <SelectItem value="3-5年">3-5年</SelectItem>
                    <SelectItem value="5-10年">5-10年</SelectItem>
                    <SelectItem value="10年以上">10年以上</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>得意な施術</Label>
                <div className="flex flex-wrap gap-2">
                  {["カット", "カラー", "パーマ", "トリートメント", "ヘッドスパ", "セット"].map((specialty) => (
                    <Button
                      key={specialty}
                      type="button"
                      variant={specialties.includes(specialty) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleSpecialty(specialty)}
                    >
                      {specialty}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">自己紹介</Label>
                <Textarea
                  id="bio"
                  placeholder="あなたの経験や得意なスタイルについて教えてください"
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
