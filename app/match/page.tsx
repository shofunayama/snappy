"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { Heart, X, MapPin, Briefcase, Scissors, Calendar } from "lucide-react"
import { storage, mockUsers, type User } from "@/lib/mock-data"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

export default function MatchPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [candidates, setCandidates] = useState<User[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const user = storage.getUser()
    if (!user) {
      router.push("/")
      return
    }
    setCurrentUser(user)

    // Initialize mock users if none exist
    const allUsers = storage.getAllUsers()
    if (allUsers.length === 1) {
      mockUsers.forEach((mockUser) => {
        if (mockUser.id !== user.id) {
          storage.addUser(mockUser)
        }
      })
    }

    // Get candidates (opposite type, not already liked)
    const targetType = user.type === "stylist" ? "model" : "stylist"
    const allCandidates = storage.getAllUsers().filter((u) => u.type === targetType && !user.likes?.includes(u.id))

    setCandidates(allCandidates)
  }, [router])

  const handleLike = () => {
    if (!currentUser || currentIndex >= candidates.length) return

    const candidate = candidates[currentIndex]
    const updatedLikes = [...(currentUser.likes || []), candidate.id]

    // Check if it's a match (both liked each other)
    const candidateData = storage.getAllUsers().find((u) => u.id === candidate.id)
    const isMatch = candidateData?.likes?.includes(currentUser.id)

    if (isMatch) {
      // It's a match!
      storage.updateUser(currentUser.id, {
        likes: updatedLikes,
        matches: [...(currentUser.matches || []), candidate.id],
      })
      storage.updateUser(candidate.id, {
        matches: [...(candidateData.matches || []), currentUser.id],
      })

      toast({
        title: "マッチング成立！",
        description: `${candidate.name}さんとマッチングしました`,
      })
    } else {
      storage.updateUser(currentUser.id, { likes: updatedLikes })
    }

    setCurrentUser({ ...currentUser, likes: updatedLikes })
    setCurrentIndex(currentIndex + 1)
  }

  const handlePass = () => {
    setCurrentIndex(currentIndex + 1)
  }

  if (!currentUser) {
    return null
  }

  const currentCandidate = candidates[currentIndex]

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="mx-auto max-w-lg">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
          <div className="flex items-center justify-between p-4">
            <h1 className="text-xl font-semibold">
              {currentUser.type === "stylist" ? "カットモデルを探す" : "美容師を探す"}
            </h1>
            <Button variant="ghost" size="sm" onClick={() => router.push("/profile")}>
              プロフィール
            </Button>
          </div>
        </div>

        {/* Matching Cards */}
        <div className="p-4">
          {currentCandidate ? (
            <Card className="overflow-hidden">
              <div className="relative aspect-[3/4] bg-muted">
                <Image
                  src={currentCandidate.avatar || "/placeholder.svg?height=600&width=450"}
                  alt={currentCandidate.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h2 className="text-2xl font-bold mb-2">{currentCandidate.name}</h2>
                  <p className="text-sm opacity-90 mb-3">
                    {currentCandidate.age}歳 • {currentCandidate.gender}
                  </p>
                  <div className="flex items-center gap-2 text-sm opacity-90">
                    <MapPin className="h-4 w-4" />
                    {currentCandidate.location}
                  </div>
                </div>
              </div>

              <CardContent className="p-6 space-y-4">
                {currentCandidate.type === "stylist" ? (
                  <>
                    <div className="flex items-center gap-2 text-sm">
                      <Briefcase className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{currentCandidate.salonName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Scissors className="h-4 w-4 text-muted-foreground" />
                      <span>経験: {currentCandidate.experience}</span>
                    </div>
                    {currentCandidate.specialties && currentCandidate.specialties.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {currentCandidate.specialties.map((specialty) => (
                          <Badge key={specialty} variant="secondary">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">髪の長さ: </span>
                        <span className="font-medium">{currentCandidate.hairLength}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">髪色: </span>
                        <span className="font-medium">{currentCandidate.hairColor}</span>
                      </div>
                    </div>
                    {currentCandidate.availability && currentCandidate.availability.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <Calendar className="h-4 w-4" />
                          <span>対応可能時間</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {currentCandidate.availability.map((time) => (
                            <Badge key={time} variant="outline">
                              {time}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}

                {currentCandidate.bio && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">自己紹介</p>
                    <p className="text-sm leading-relaxed">{currentCandidate.bio}</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <Button
                    variant="outline"
                    size="lg"
                    className="flex-1 h-14 border-2 bg-transparent"
                    onClick={handlePass}
                  >
                    <X className="h-6 w-6 mr-2" />
                    スキップ
                  </Button>
                  <Button size="lg" className="flex-1 h-14" onClick={handleLike}>
                    <Heart className="h-6 w-6 mr-2" />
                    いいね
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="p-12 text-center">
              <div className="space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted">
                  <Heart className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold">候補者がいません</h3>
                <p className="text-sm text-muted-foreground">新しいユーザーが登録されるまでお待ちください</p>
              </div>
            </Card>
          )}
        </div>
      </div>

      <Navigation />
    </div>
  )
}
