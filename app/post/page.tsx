"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navigation } from "@/components/navigation"
import { MapPin, Calendar, Clock, DollarSign, PlusCircle } from "lucide-react"
import { storage, type User, type JobPosting } from "@/lib/mock-data"

export default function PostPage() {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [allJobs, setAllJobs] = useState<JobPosting[]>([])
  const [myJobs, setMyJobs] = useState<JobPosting[]>([])

  useEffect(() => {
    const user = storage.getUser()
    if (!user) {
      router.push("/")
      return
    }
    setCurrentUser(user)

    const jobs = storage.getJobPostings()
    setAllJobs(jobs)
    setMyJobs(jobs.filter((job) => job.stylistId === user.id))
  }, [router])

  if (!currentUser) {
    return null
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="mx-auto max-w-lg">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
          <div className="flex items-center justify-between p-4">
            <h1 className="text-xl font-semibold">モデル募集</h1>
            {currentUser.type === "stylist" && (
              <Button size="sm" onClick={() => router.push("/post/create")}>
                <PlusCircle className="h-4 w-4 mr-2" />
                募集する
              </Button>
            )}
          </div>
        </div>

        <div className="p-4">
          {currentUser.type === "stylist" ? (
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="all">すべての募集</TabsTrigger>
                <TabsTrigger value="mine">自分の募集 ({myJobs.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-3 mt-4">
                {allJobs.length > 0 ? (
                  allJobs.map((job) => <JobCard key={job.id} job={job} />)
                ) : (
                  <Card className="p-8 text-center">
                    <PlusCircle className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">まだ募集がありません</p>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="mine" className="space-y-3 mt-4">
                {myJobs.length > 0 ? (
                  myJobs.map((job) => <JobCard key={job.id} job={job} isOwner />)
                ) : (
                  <Card className="p-8 text-center">
                    <PlusCircle className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-3">まだ募集を作成していません</p>
                    <Button onClick={() => router.push("/post/create")}>
                      <PlusCircle className="h-4 w-4 mr-2" />
                      募集を作成
                    </Button>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          ) : (
            <div className="space-y-3">
              {allJobs.length > 0 ? (
                allJobs.map((job) => <JobCard key={job.id} job={job} />)
              ) : (
                <Card className="p-8 text-center">
                  <PlusCircle className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">まだ募集がありません</p>
                </Card>
              )}
            </div>
          )}
        </div>
      </div>

      <Navigation />
    </div>
  )
}

function JobCard({ job, isOwner = false }: { job: JobPosting; isOwner?: boolean }) {
  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div>
          <h3 className="font-semibold text-lg mb-1">{job.title}</h3>
          <p className="text-sm text-muted-foreground">
            {job.stylistName} • {job.salonName}
          </p>
        </div>

        <p className="text-sm leading-relaxed">{job.description}</p>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{job.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{job.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <span>{job.compensation}</span>
          </div>
        </div>

        {job.requirements && job.requirements.length > 0 && (
          <div>
            <p className="text-sm text-muted-foreground mb-2">条件</p>
            <div className="flex flex-wrap gap-2">
              {job.requirements.map((req, index) => (
                <Badge key={index} variant="outline">
                  {req}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {!isOwner && <Button className="w-full">応募する</Button>}
      </CardContent>
    </Card>
  )
}
