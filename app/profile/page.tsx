"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navigation } from "@/components/navigation"
import { MapPin, Briefcase, Scissors, Calendar, Heart, MessageCircle, LogOut } from "lucide-react"
import { storage, type User } from "@/lib/mock-data"
import Image from "next/image"

export default function ProfilePage() {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [matches, setMatches] = useState<User[]>([])
  const [likes, setLikes] = useState<User[]>([])

  useEffect(() => {
    const user = storage.getUser()
    if (!user) {
      router.push("/")
      return
    }
    setCurrentUser(user)

    // Get matches and likes
    const allUsers = storage.getAllUsers()
    const matchedUsers = allUsers.filter((u) => user.matches?.includes(u.id))
    const likedUsers = allUsers.filter((u) => user.likes?.includes(u.id) && !user.matches?.includes(u.id))

    setMatches(matchedUsers)
    setLikes(likedUsers)
  }, [router])

  const handleLogout = () => {
    storage.clearUser()
    router.push("/")
  }

  if (!currentUser) {
    return null
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="mx-auto max-w-lg">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
          <div className="flex items-center justify-between p-4">
            <h1 className="text-xl font-semibold">プロフィール</h1>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              ログアウト
            </Button>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Profile Card */}
          <Card className="overflow-hidden">
            <div className="relative aspect-[3/2] bg-muted">
              <Image
                src={currentUser.avatar || "/placeholder.svg?height=400&width=600"}
                alt={currentUser.name}
                fill
                className="object-cover"
              />
            </div>
            <CardContent className="p-6 space-y-4">
              <div>
                <h2 className="text-2xl font-bold mb-2">{currentUser.name}</h2>
                <p className="text-sm text-muted-foreground">
                  {currentUser.age}歳 • {currentUser.gender}
                </p>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                {currentUser.location}
              </div>

              {currentUser.type === "stylist" ? (
                <>
                  <div className="flex items-center gap-2 text-sm">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{currentUser.salonName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Scissors className="h-4 w-4 text-muted-foreground" />
                    <span>経験: {currentUser.experience}</span>
                  </div>
                  {currentUser.specialties && currentUser.specialties.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {currentUser.specialties.map((specialty) => (
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
                      <span className="font-medium">{currentUser.hairLength}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">髪色: </span>
                      <span className="font-medium">{currentUser.hairColor}</span>
                    </div>
                  </div>
                  {currentUser.availability && currentUser.availability.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <Calendar className="h-4 w-4" />
                        <span>対応可能時間</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {currentUser.availability.map((time) => (
                          <Badge key={time} variant="outline">
                            {time}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}

              {currentUser.bio && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">自己紹介</p>
                  <p className="text-sm leading-relaxed">{currentUser.bio}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Matches and Likes Tabs */}
          <Tabs defaultValue="matches" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="matches">マッチング ({matches.length})</TabsTrigger>
              <TabsTrigger value="likes">いいね送信 ({likes.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="matches" className="space-y-3 mt-4">
              {matches.length > 0 ? (
                matches.map((match) => (
                  <Card key={match.id} className="overflow-hidden">
                    <div className="flex gap-4 p-4">
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={match.avatar || "/placeholder.svg?height=80&width=80"}
                          alt={match.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold truncate">{match.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {match.age}歳 • {match.location}
                        </p>
                        {match.type === "stylist" && (
                          <p className="text-sm text-muted-foreground truncate">{match.salonName}</p>
                        )}
                        <Button size="sm" className="mt-2" onClick={() => router.push(`/messages?userId=${match.id}`)}>
                          <MessageCircle className="h-4 w-4 mr-2" />
                          メッセージ
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <Card className="p-8 text-center">
                  <Heart className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">まだマッチングがありません</p>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="likes" className="space-y-3 mt-4">
              {likes.length > 0 ? (
                likes.map((like) => (
                  <Card key={like.id} className="overflow-hidden">
                    <div className="flex gap-4 p-4">
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={like.avatar || "/placeholder.svg?height=80&width=80"}
                          alt={like.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold truncate">{like.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {like.age}歳 • {like.location}
                        </p>
                        {like.type === "stylist" && (
                          <p className="text-sm text-muted-foreground truncate">{like.salonName}</p>
                        )}
                        <Badge variant="secondary" className="mt-2">
                          返信待ち
                        </Badge>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <Card className="p-8 text-center">
                  <Heart className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">まだいいねを送っていません</p>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Navigation />
    </div>
  )
}
