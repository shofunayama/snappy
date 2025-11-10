"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Scissors, Sparkles, Heart, MessageCircle } from "lucide-react"
import { storage } from "@/lib/mock-data"

export default function HomePage() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const user = storage.getUser()
    setIsLoggedIn(!!user)
  }, [])

  if (isLoggedIn) {
    router.push("/match")
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
        <div className="relative px-4 py-16 mx-auto max-w-lg">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
              <Scissors className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-balance">CutMatch</h1>
            <p className="text-lg text-muted-foreground text-balance">
              美容師とカットモデルをつなぐ
              <br />
              マッチングプラットフォーム
            </p>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="px-4 py-12 mx-auto max-w-lg space-y-4">
        <Card className="p-6 space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
              <Heart className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">簡単マッチング</h3>
              <p className="text-sm text-muted-foreground">気になる相手に「いいね」を送ろう</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-secondary/20">
              <Sparkles className="w-6 h-6 text-secondary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold">モデル募集</h3>
              <p className="text-sm text-muted-foreground">美容師が直接モデルを募集できる</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
              <MessageCircle className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">メッセージ機能</h3>
              <p className="text-sm text-muted-foreground">マッチング後は直接やり取り</p>
            </div>
          </div>
        </Card>
      </div>

      {/* CTA Buttons */}
      <div className="px-4 pb-12 mx-auto max-w-lg space-y-3">
        <Button asChild size="lg" className="w-full">
          <Link href="/register/stylist">美容師として登録</Link>
        </Button>
        <Button asChild size="lg" variant="outline" className="w-full bg-transparent">
          <Link href="/register/model">カットモデルとして登録</Link>
        </Button>
        <div className="text-center pt-4">
          <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground">
            すでにアカウントをお持ちの方はこちら
          </Link>
        </div>
      </div>
    </div>
  )
}
