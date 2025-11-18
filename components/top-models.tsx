'use client'

import { Card } from '@/components/ui/card'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { useRef } from 'react'
import Image from 'next/image'

const models = [
  { id: 1, name: 'さくら', age: 23, location: '表参道', rating: 5, tags: ['カット', 'カラー'], image: '/placeholder.svg?height=200&width=200' },
  { id: 2, name: 'えみ', age: 26, location: '渋谷', rating: 4.5, tags: ['カット', '撮影OK'], image: '/placeholder.svg?height=200&width=200' },
  { id: 3, name: 'ひかり', age: 21, location: '新宿', rating: 5, tags: ['カラー'], image: '/placeholder.svg?height=200&width=200' },
  { id: 4, name: 'みさき', age: 25, location: '銀座', rating: 4, tags: ['カット', 'パーマ'], image: '/placeholder.svg?height=200&width=200' },
  { id: 5, name: 'あおい', age: 22, location: '六本木', rating: 5, tags: ['撮影OK'], image: '/placeholder.svg?height=200&width=200' },
]

export default function TopModels() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  return (
    <section className="py-10 md:py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-5">
          トップモデル
        </h2>

        {/* Scroll Container */}
        <div className="relative">
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-all hover:scale-110"
            aria-label="スクロール左"
          >
            <ChevronLeft className="w-5 h-5 text-primary" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto pb-2 scroll-smooth"
            style={{ scrollBehavior: 'smooth' }}
          >
            {models.map((model) => (
              <Card
                key={model.id}
                className="flex-shrink-0 w-40 md:w-44 p-4 rounded-2xl border-border hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="w-full aspect-square bg-gradient-to-br from-primary/20 to-secondary/10 rounded-xl flex items-center justify-center mb-3 overflow-hidden">
                  <Image
                    src={model.image || "/placeholder.svg"}
                    alt={model.name}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Model Info */}
                <div className="space-y-2">
                  <div>
                    <p className="font-semibold text-foreground text-sm">
                      {model.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {model.age}歳 / {model.location}
                    </p>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.floor(model.rating)
                            ? 'fill-accent text-accent'
                            : 'text-border'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {model.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-primary-light text-primary px-2 py-0.5 rounded-full font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-all hover:scale-110"
            aria-label="スクロール右"
          >
            <ChevronRight className="w-5 h-5 text-primary" />
          </button>
        </div>
      </div>
    </section>
  )
}
