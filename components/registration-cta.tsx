'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { X } from 'lucide-react'
import Link from 'next/link'

export default function RegistrationCTA() {
  const [showModalModel, setShowModalModel] = useState(false)
  const [showModalStylist, setShowModalStylist] = useState(false)

  return (
    <>
      {/* Registration CTA Section */}
      <section className="py-12 md:py-16 px-4 md:px-8 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-8 text-balance">
            Shappyで新しい機会を見つけよう
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Model Registration Card */}
            <Card className="p-6 md:p-8 rounded-2xl border-border hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">モデルの方へ</h3>
                <p className="text-muted-foreground text-sm">
                  素敵なサロンでのお仕事やスタイリング体験の機会が待っています。プロフィールを登録して、あなたに合ったお仕事を見つけましょう。
                </p>
                <Link href="/register?type=model" className="block">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg">
                    モデル登録
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Stylist/Salon Registration Card */}
            <Card className="p-6 md:p-8 rounded-2xl border-border hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">サロン・スタイリストの方へ</h3>
                <p className="text-muted-foreground text-sm">
                  理想のモデルを探して、新しいスタイルや技術の提案ができます。サロン情報を登録して、登録モデルにアプローチしましょう。
                </p>
                <Link href="/register?type=salon" className="block">
                  <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-lg">
                    サロン登録
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Model Registration Modal */}
      {/* {showModalModel && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md rounded-2xl border-border">
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-foreground">モデル登録</h2>
                <button onClick={() => setShowModalModel(false)} className="text-muted-foreground hover:text-foreground">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">お名前</label>
                  <input type="text" placeholder="山田 花子" className="w-full px-4 py-2 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">年齢</label>
                  <input type="number" placeholder="25" className="w-full px-4 py-2 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">メールアドレス</label>
                  <input type="email" placeholder="example@email.com" className="w-full px-4 py-2 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">電話番号</label>
                  <input type="tel" placeholder="090-xxxx-xxxx" className="w-full px-4 py-2 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">地域</label>
                  <select className="w-full px-4 py-2 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary">
                    <option>東京</option>
                    <option>渋谷</option>
                    <option>表参道</option>
                  </select>
                </div>

                <div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-border" />
                    <span className="text-xs text-muted-foreground">利用規約に同意します</span>
                  </label>
                </div>
              </div>

              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg">
                登録
              </Button>
            </div>
          </Card>
        </div>
      )} */}

      {/* Stylist Registration Modal */}
      {/* {showModalStylist && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md rounded-2xl border-border">
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-foreground">サロン登録</h2>
                <button onClick={() => setShowModalStylist(false)} className="text-muted-foreground hover:text-foreground">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">サロン名</label>
                  <input type="text" placeholder="○○ヘアサロン" className="w-full px-4 py-2 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">スタイリスト名</label>
                  <input type="text" placeholder="田中 太郎" className="w-full px-4 py-2 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">メールアドレス</label>
                  <input type="email" placeholder="salon@email.com" className="w-full px-4 py-2 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">電話番号</label>
                  <input type="tel" placeholder="090-xxxx-xxxx" className="w-full px-4 py-2 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">地域</label>
                  <select className="w-full px-4 py-2 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary">
                    <option>東京</option>
                    <option>渋谷</option>
                    <option>表参道</option>
                  </select>
                </div>

                <div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-border" />
                    <span className="text-xs text-muted-foreground">クレジットカード決済に対応</span>
                  </label>
                </div>

                <div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-border" />
                    <span className="text-xs text-muted-foreground">利用規約に同意します</span>
                  </label>
                </div>
              </div>

              <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-lg">
                登録
              </Button>
            </div>
          </Card>
        </div>
      )} */}
    </>
  )
}
