'use client'

import { Card } from '@/components/ui/card'
import { Star } from 'lucide-react'

const shops = [
  {
    id: 1,
    name: 'MOD\'S HAIR 表参道',
    description1: '内容：ヘアカットモデルをしていただきます。',
    description2: '美しいロングスタイルをつくります。',
    location: '表参道',
    reward: '無料',
    timeframe: '平日夜',
    rating: 5,
  },
  {
    id: 2,
    name: 'GARDEN TOKYO 渋谷',
    description1: '内容：カラーモデルをしていただきます。',
    description2: 'トレンディなカラーを体験できます。',
    location: '渋谷',
    reward: '5,000円',
    timeframe: '土日',
    rating: 4.5,
  },
  {
    id: 3,
    name: 'Ash 新宿',
    description1: '内容：ヘアカットモデルをしていただきます。',
    description2: '撮影もありますので額ワークもOKの方。',
    location: '新宿',
    reward: '無料',
    timeframe: '当日OK',
    rating: 5,
  },
]

export default function FeaturedShops() {
  return (
    <section className="py-8 md:py-10 px-4 md:px-8 bg-neutral-soft/50">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-3xl">💈</span>
            <h2 className="text-2xl md:text-3xl font-bold bg-linear-to-r from-purple-400 via-pink-400 to-rose-400 bg-clip-text text-transparent">
              注目の募集中ショップ
            </h2>
            <span className="text-3xl">💈</span>
          </div>
        </div>

        {/* Shop List */}
        <div className="space-y-4">
          {shops.map((shop) => (
            <Card
              key={shop.id}
              className="flex gap-4 rounded-2xl p-4 md:p-5 border-border hover:shadow-md transition-shadow cursor-pointer"
            >
              {/* Thumbnail */}
              <div className="shrink-0">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-linear-to-br from-primary/20 to-secondary/10 rounded-xl flex items-center justify-center">
                  <div className="text-3xl">💄</div>
                </div>

                {/* Rating */}
                <div className="flex gap-0.5 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < Math.floor(shop.rating)
                          ? 'fill-accent text-accent'
                          : 'text-border'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground text-sm md:text-base mb-2">
                  {shop.name}
                </h3>

                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed mb-1">
                  {shop.description1}
                </p>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed mb-3">
                  {shop.description2}
                </p>

                {/* Meta Tags */}
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-primary-light text-primary px-3 py-1 rounded-full font-medium">
                    {shop.location}
                  </span>
                  <span className="text-xs bg-secondary/10 text-secondary px-3 py-1 rounded-full font-medium">
                    {shop.reward}
                  </span>
                  <span className="text-xs bg-accent/20 text-foreground px-3 py-1 rounded-full font-medium">
                    {shop.timeframe}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
