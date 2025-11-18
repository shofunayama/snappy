'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-b from-primary-light to-white/50 py-8 md:py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Text Content */}
        <div className="flex flex-col gap-4 md:gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight text-balance">
              モデルを身近に
            </h1>
            <p className="text-lg md:text-xl font-medium text-muted-foreground mt-2">
              カットモデル募集を、もっと気軽に、もっと自分らしく。
            </p>
          </div>

          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-lg">
            美容師さん・サロンと、モデルになりたいあなたをつなぐマッチングサービスです。
            条件やエリア、日時から、自分にぴったりの募集を探せます。
          </p>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link href="/register?type=salon">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 w-full sm:w-auto"
              >
                無料で始める
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-8 border-primary text-primary hover:bg-primary-light"
            >
              サービスの使い方を見る
            </Button>
          </div>
        </div>

        {/* Illustration */}
        <div className="flex justify-center md:justify-end">
          <div className="relative w-full max-w-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent rounded-full blur-3xl" />
            <div className="relative bg-white/50 rounded-3xl aspect-square flex items-center justify-center border border-primary/20">
              <div className="text-center space-y-2">
                <div className="text-5xl">✨</div>
                <p className="text-muted-foreground text-sm">女性のイラスト</p>
                <p className="text-xs text-muted-foreground">ロングヘアで微笑む</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
