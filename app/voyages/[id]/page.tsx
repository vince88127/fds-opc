import { db } from '@/lib/db'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, Users, Clock, Anchor } from 'lucide-react'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import ReactMarkdown from 'react-markdown'

export default async function VoyageDetailPage({ params }: { params: { id: string } }) {
  const voyage = await db.voyages.findById(params.id)
  
  if (!voyage) {
    notFound()
  }

  const isRegistrationOpen = new Date() < new Date(voyage.registrationDeadline)
  const isFull = voyage.currentParticipants >= voyage.maxParticipants

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* 主内容区 */}
          <main className="col-span-9">
            {/* 封面图 */}
            <div className="bg-gradient-to-br from-cyan-100 to-blue-200 rounded-lg h-80 flex items-center justify-center mb-6">
              <Anchor className="h-32 w-32 text-blue-600" />
            </div>

            <div className="bg-white rounded-lg shadow-sm p-8">
              {/* 头部信息 */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant={
                    voyage.status === 'upcoming' ? 'default' :
                    voyage.status === 'ongoing' ? 'secondary' : 'outline'
                  }>
                    {voyage.status === 'upcoming' ? '即将开始' :
                     voyage.status === 'ongoing' ? '进行中' : '已结束'}
                  </Badge>
                  <Badge className="bg-green-100 text-green-600 hover:bg-green-100">
                    {voyage.currentParticipants}/{voyage.maxParticipants} 人已报名
                  </Badge>
                </div>
                
                <h1 className="text-3xl font-bold mb-4">{voyage.title}</h1>
                
                <p className="text-gray-600 text-lg mb-6">{voyage.description}</p>
                
                {/* 关键信息 */}
                <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="flex items-center gap-2 text-gray-500 mb-1">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">开始时间</span>
                    </div>
                    <p className="font-semibold">
                      {format(new Date(voyage.startDate), 'yyyy年M月d日', { locale: zhCN })}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-gray-500 mb-1">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">结束时间</span>
                    </div>
                    <p className="font-semibold">
                      {format(new Date(voyage.endDate), 'yyyy年M月d日', { locale: zhCN })}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-gray-500 mb-1">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">报名截止</span>
                    </div>
                    <p className="font-semibold text-red-600">
                      {format(new Date(voyage.registrationDeadline), 'M月d日 HH:mm', { locale: zhCN })}
                    </p>
                  </div>
                </div>
              </div>

              {/* 正文内容 */}
              <div className="prose prose-lg max-w-none mt-8">
                <ReactMarkdown>{voyage.content}</ReactMarkdown>
              </div>

              {/* 报名按钮 */}
              <div className="mt-8 pt-6 border-t">
                <Button 
                  className="w-full h-12 text-lg bg-gradient-to-r from-blue-600 to-purple-600"
                  disabled={!isRegistrationOpen || isFull}
                >
                  {isFull ? '名额已满' : 
                   !isRegistrationOpen ? '报名已截止' : 
                   '立即报名参加航海'}
                </Button>
                {isRegistrationOpen && !isFull && (
                  <p className="text-center text-sm text-gray-500 mt-2">
                    还剩 {voyage.maxParticipants - voyage.currentParticipants} 个名额
                  </p>
                )}
              </div>
            </div>
          </main>

          {/* 右侧边栏 */}
          <aside className="col-span-3 space-y-4">
            {/* 航海信息卡片 */}
            <div className="bg-white rounded-lg p-4 shadow-sm sticky top-20">
              <h3 className="font-semibold mb-4">航海信息</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-gray-500 mb-2">
                    <Users className="h-4 w-4" />
                    <span className="text-sm">参与人数</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(voyage.currentParticipants / voyage.maxParticipants) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold">
                      {Math.round((voyage.currentParticipants / voyage.maxParticipants) * 100)}%
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {voyage.currentParticipants} / {voyage.maxParticipants} 人
                  </p>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm text-gray-600 mb-2">航海时长</p>
                  <p className="font-semibold">
                    {Math.ceil((new Date(voyage.endDate).getTime() - new Date(voyage.startDate).getTime()) / (1000 * 60 * 60 * 24))} 天
                  </p>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm text-gray-600 mb-2">发布时间</p>
                  <p className="text-sm">
                    {format(new Date(voyage.createdAt), 'yyyy年M月d日', { locale: zhCN })}
                  </p>
                </div>

                <Button 
                  className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600"
                  disabled={!isRegistrationOpen || isFull}
                >
                  {isFull ? '名额已满' : !isRegistrationOpen ? '报名已截止' : '立即报名'}
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
