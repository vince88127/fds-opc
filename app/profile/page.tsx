import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Eye, ThumbsUp, MessageCircle, Calendar, MapPin } from 'lucide-react'

export default function ProfilePage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-6">
        {/* 用户信息卡片 */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <div className="flex items-start gap-6">
            {/* 头像 */}
            <div className="h-24 w-24 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-4xl font-bold flex-shrink-0">
              U
            </div>

            {/* 用户信息 */}
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-3">
                <h1 className="text-2xl font-bold">飞碟用户</h1>
                <Button variant="outline" size="sm">编辑资料</Button>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <span>星球编号: 201007</span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  加入时间: 2027.04.07
                </span>
              </div>

              <p className="text-gray-600 mb-4">
                10年创业者，擅长互联网运营。多项目经验2000W+，做到过出海训练营10001，目前在做AI变现，如期完成方向
              </p>

              {/* 统计数据 */}
              <div className="flex items-center gap-8">
                <div className="text-center">
                  <p className="text-2xl font-bold">2</p>
                  <p className="text-sm text-gray-500">关注</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-sm text-gray-500">粉丝</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-sm text-gray-500">获赞与点赞</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 内容标签页 */}
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="bg-white border-b w-full justify-start rounded-none h-auto p-0">
            <TabsTrigger 
              value="posts" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-6 py-3"
            >
              帖子
            </TabsTrigger>
            <TabsTrigger 
              value="comments" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-6 py-3"
            >
              评论
            </TabsTrigger>
            <TabsTrigger 
              value="bookmarks" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-6 py-3"
            >
              收藏
            </TabsTrigger>
            <TabsTrigger 
              value="voyages" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-6 py-3"
            >
              航海
            </TabsTrigger>
            <TabsTrigger 
              value="meetups" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-6 py-3"
            >
              聚会
            </TabsTrigger>
            <TabsTrigger 
              value="calendar" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-6 py-3"
            >
              日历
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="mt-6">
            <div className="bg-white rounded-lg p-8 text-center text-gray-400">
              <p>暂无帖子</p>
            </div>
          </TabsContent>

          <TabsContent value="comments" className="mt-6">
            <div className="bg-white rounded-lg p-8 text-center text-gray-400">
              <p>暂无评论</p>
            </div>
          </TabsContent>

          <TabsContent value="bookmarks" className="mt-6">
            <div className="bg-white rounded-lg p-8 text-center text-gray-400">
              <p>暂无收藏</p>
            </div>
          </TabsContent>

          <TabsContent value="voyages" className="mt-6">
            <div className="bg-white rounded-lg p-8 text-center text-gray-400">
              <p>暂无参加的航海</p>
            </div>
          </TabsContent>

          <TabsContent value="meetups" className="mt-6">
            <div className="bg-white rounded-lg p-8 text-center text-gray-400">
              <p>暂无参加的聚会</p>
            </div>
          </TabsContent>

          <TabsContent value="calendar" className="mt-6">
            <div className="bg-white rounded-lg p-8 text-center text-gray-400">
              <p>暂无日历事件</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
