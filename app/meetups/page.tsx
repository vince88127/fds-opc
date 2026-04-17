import { db } from '@/lib/db'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MapPin, Calendar, Users, Plus } from 'lucide-react'
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'

export default async function MeetupsPage() {
  const meetups = await db.meetups.getAll()
  const sortedMeetups = meetups.sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  )

  return (
    <div className="container py-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">线下聚会</h1>
            <p className="text-muted-foreground mt-2">
              会员自发组织的线下活动,拓展人脉,深度交流
            </p>
          </div>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
            <Plus className="h-4 w-4 mr-2" />
            发起聚会
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sortedMeetups.length === 0 ? (
            <Card className="md:col-span-2 lg:col-span-3">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <Users className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium text-muted-foreground">
                  暂无聚会活动,快来发起第一个吧!
                </p>
              </CardContent>
            </Card>
          ) : (
            sortedMeetups.map((meetup) => (
              <Card key={meetup.id} className="hover:shadow-lg transition-shadow">
                {meetup.coverImage && (
                  <div className="h-40 bg-gradient-to-br from-orange-100 to-pink-100 rounded-t-xl" />
                )}
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="line-clamp-2">{meetup.title}</CardTitle>
                    <Badge variant={
                      meetup.status === 'upcoming' ? 'default' :
                      meetup.status === 'completed' ? 'secondary' : 'destructive'
                    }>
                      {meetup.status === 'upcoming' ? '即将举行' :
                       meetup.status === 'completed' ? '已结束' : '已取消'}
                    </Badge>
                  </div>
                  <CardDescription className="line-clamp-2">
                    {meetup.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {format(new Date(meetup.date), 'yyyy年M月d日 HH:mm', { locale: zhCN })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span className="line-clamp-1">{meetup.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>
                        {meetup.currentParticipants}/{meetup.maxParticipants} 人已报名
                      </span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full"
                    disabled={
                      meetup.status !== 'upcoming' || 
                      meetup.currentParticipants >= meetup.maxParticipants
                    }
                  >
                    {meetup.currentParticipants >= meetup.maxParticipants ? '名额已满' : '我要参加'}
                  </Button>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
