import { db } from '@/lib/db'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus, Users, Calendar, Edit, Trash2 } from 'lucide-react'
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import Link from 'next/link'

export default async function VoyagesManagementPage() {
  const voyages = await db.voyages.getAll()

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">航海管理</h2>
          <p className="text-gray-600 mt-1">管理所有航海训练营</p>
        </div>
        <Link href="/admin/voyages/new">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            创建航海
          </Button>
        </Link>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold">{voyages.length}</p>
              <p className="text-sm text-gray-600 mt-1">总航海数</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {voyages.filter(v => v.status === 'ongoing').length}
              </p>
              <p className="text-sm text-gray-600 mt-1">进行中</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {voyages.filter(v => v.status === 'upcoming').length}
              </p>
              <p className="text-sm text-gray-600 mt-1">即将开始</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-600">
                {voyages.reduce((sum, v) => sum + v.currentParticipants, 0)}
              </p>
              <p className="text-sm text-gray-600 mt-1">总参与人数</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 航海列表 */}
      <Card>
        <CardHeader>
          <CardTitle>航海列表</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {voyages.map((voyage) => (
              <div key={voyage.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{voyage.title}</h3>
                      <Badge variant={
                        voyage.status === 'upcoming' ? 'default' :
                        voyage.status === 'ongoing' ? 'secondary' : 'outline'
                      }>
                        {voyage.status === 'upcoming' ? '即将开始' :
                         voyage.status === 'ongoing' ? '进行中' : '已结束'}
                      </Badge>
                    </div>
                    <p className="text-gray-600 text-sm">{voyage.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-1" />
                      编辑
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {format(new Date(voyage.startDate), 'yyyy-MM-dd', { locale: zhCN })} 至 
                      {format(new Date(voyage.endDate), 'MM-dd', { locale: zhCN })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="h-4 w-4" />
                    <span>{voyage.currentParticipants} / {voyage.maxParticipants} 人</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    报名截止: {format(new Date(voyage.registrationDeadline), 'yyyy-MM-dd HH:mm', { locale: zhCN })}
                  </div>
                </div>

                {/* 进度条 */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">报名进度</span>
                    <span className="font-medium">
                      {Math.round((voyage.currentParticipants / voyage.maxParticipants) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${(voyage.currentParticipants / voyage.maxParticipants) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
