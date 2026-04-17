import { db } from '@/lib/db'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, Users, Clock, Anchor } from 'lucide-react'
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'

export default async function VoyagesPage() {
  const voyages = await db.voyages.getAll()
  const sortedVoyages = voyages.sort((a, b) => 
    new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  )

  return (
    <div className="container py-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <div>
          <h1 className="text-3xl font-bold">航海训练营</h1>
          <p className="text-muted-foreground mt-2">
            每月主题训练营,与优秀的伙伴一起实战赚钱
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {sortedVoyages.length === 0 ? (
            <Card className="md:col-span-2">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <Anchor className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium text-muted-foreground">
                  暂无航海项目,敬请期待!
                </p>
              </CardContent>
            </Card>
          ) : (
            sortedVoyages.map((voyage) => (
              <Card key={voyage.id} className="hover:shadow-lg transition-shadow">
                {voyage.coverImage && (
                  <div className="h-48 bg-gradient-to-br from-cyan-100 to-blue-200 rounded-t-xl flex items-center justify-center">
                    <Anchor className="h-16 w-16 text-blue-600" />
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle>{voyage.title}</CardTitle>
                    <Badge variant={
                      voyage.status === 'upcoming' ? 'default' :
                      voyage.status === 'ongoing' ? 'secondary' : 'outline'
                    }>
                      {voyage.status === 'upcoming' ? '即将开始' :
                       voyage.status === 'ongoing' ? '进行中' : '已结束'}
                    </Badge>
                  </div>
                  <CardDescription className="line-clamp-2">
                    {voyage.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {format(new Date(voyage.startDate), 'yyyy年M月d日', { locale: zhCN })} - {format(new Date(voyage.endDate), 'M月d日', { locale: zhCN })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>
                        报名截止: {format(new Date(voyage.registrationDeadline), 'M月d日 HH:mm', { locale: zhCN })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>
                        {voyage.currentParticipants}/{voyage.maxParticipants} 人已报名
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      className="flex-1"
                      disabled={
                        voyage.status === 'completed' || 
                        voyage.currentParticipants >= voyage.maxParticipants ||
                        new Date() > new Date(voyage.registrationDeadline)
                      }
                    >
                      {voyage.currentParticipants >= voyage.maxParticipants ? '名额已满' : '立即报名'}
                    </Button>
                    <Button variant="outline">查看详情</Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
