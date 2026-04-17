import { db } from '@/lib/db'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, FileText, Anchor, Calendar, TrendingUp, Eye } from 'lucide-react'

export default async function AdminDashboard() {
  const users = await db.users.getAll()
  const posts = await db.posts.getAll()
  const projects = await db.projects.getAll()
  const voyages = await db.voyages.getAll()
  const meetups = await db.meetups.getAll()

  const stats = [
    {
      title: '总用户数',
      value: users.length,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: '帖子数量',
      value: posts.length,
      icon: FileText,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: '项目数量',
      value: projects.length,
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: '航海训练营',
      value: voyages.length,
      icon: Anchor,
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50',
    },
    {
      title: '线下聚会',
      value: meetups.length,
      icon: Calendar,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      title: '总浏览量',
      value: '12.5K',
      icon: Eye,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
    },
  ]

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">数据概览</h2>
        <p className="text-gray-600 mt-1">欢迎回来,管理员</p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
                <p className="text-xs text-gray-500 mt-1">
                  较上月 +12.5%
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* 最近活动 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 最新帖子 */}
        <Card>
          <CardHeader>
            <CardTitle>最新帖子</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {posts.slice(0, 5).map((post) => (
                <div key={post.id} className="flex items-start gap-3 pb-3 border-b last:border-0">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                    {post.author?.username?.[0] || 'U'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{post.title}</p>
                    <p className="text-xs text-gray-500">
                      {post.author?.username} · {new Date(post.createdAt).toLocaleDateString('zh-CN')}
                    </p>
                  </div>
                  <div className="text-xs text-gray-400">
                    {post.likes} 赞
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 最新项目 */}
        <Card>
          <CardHeader>
            <CardTitle>最新项目</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {projects.slice(0, 5).map((project) => (
                <div key={project.id} className="flex items-start justify-between pb-3 border-b last:border-0">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{project.title}</p>
                    <p className="text-xs text-gray-500">
                      {project.category} · {new Date(project.createdAt).toLocaleDateString('zh-CN')}
                    </p>
                  </div>
                  <div className="text-xs text-green-600 font-medium">
                    {project.difficulty}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 航海状态 */}
      <Card>
        <CardHeader>
          <CardTitle>航海训练营状态</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {voyages.slice(0, 3).map((voyage) => (
              <div key={voyage.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium">{voyage.title}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(voyage.startDate).toLocaleDateString('zh-CN')} - {new Date(voyage.endDate).toLocaleDateString('zh-CN')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">
                    {voyage.currentParticipants}/{voyage.maxParticipants} 人
                  </p>
                  <div className="w-32 bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full"
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
