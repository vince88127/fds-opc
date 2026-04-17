import { db } from '@/lib/db'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Eye, ThumbsUp, MessageCircle, Share2, Flame, TrendingUp, Users } from 'lucide-react'

export default async function Home() {
  const posts = await db.posts.getAll()
  const projects = await db.projects.getAll()
  
  const allContent = [
    ...posts.map(p => ({ ...p, type: 'post' as const })),
    ...projects.map(p => ({ ...p, type: 'project' as const }))
  ].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* 左侧边栏 */}
          <aside className="col-span-2 space-y-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold mb-3 text-sm">搜索内容</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-600 hover:text-blue-600 cursor-pointer">
                  <span>全部</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 hover:text-blue-600 cursor-pointer">
                  <span>加门</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 hover:text-blue-600 cursor-pointer">
                  <span>精华</span>
                </div>
              </div>
            </div>
          </aside>

          {/* 中间内容区 */}
          <main className="col-span-7">
            {/* 筛选标签 */}
            <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm text-gray-500">搜索时间</span>
                  <Tabs defaultValue="all" className="flex-1">
                    <TabsList className="bg-gray-100">
                      <TabsTrigger value="all" className="text-xs">全部</TabsTrigger>
                      <TabsTrigger value="1h" className="text-xs">1h以内</TabsTrigger>
                      <TabsTrigger value="1-2h" className="text-xs">1-2h</TabsTrigger>
                      <TabsTrigger value="2-4h" className="text-xs">2-4h</TabsTrigger>
                      <TabsTrigger value="4h+" className="text-xs">4h以上</TabsTrigger>
                      <TabsTrigger value="all-time" className="text-xs">全部</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm text-gray-500">启动盘面</span>
                  <Tabs defaultValue="0" className="flex-1">
                    <TabsList className="bg-gray-100">
                      <TabsTrigger value="0" className="text-xs">0元</TabsTrigger>
                      <TabsTrigger value="200" className="text-xs">200以内</TabsTrigger>
                      <TabsTrigger value="1500" className="text-xs">1500以内</TabsTrigger>
                      <TabsTrigger value="3000" className="text-xs">3000以内</TabsTrigger>
                      <TabsTrigger value="10000" className="text-xs">1万以内</TabsTrigger>
                      <TabsTrigger value="50000" className="text-xs">5万以内</TabsTrigger>
                      <TabsTrigger value="50000+" className="text-xs">5万以上</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>
            </div>

            {/* 内容列表 */}
            <div className="space-y-4">
              {allContent.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-5">
                    {/* 标签 */}
                    {'category' in item && (
                      <div className="mb-3">
                        <Badge className="bg-orange-100 text-orange-600 hover:bg-orange-100 text-xs">
                          {item.category}
                        </Badge>
                      </div>
                    )}
                    
                    {/* 标题 */}
                    <h3 className="text-lg font-semibold mb-2 hover:text-blue-600 cursor-pointer line-clamp-2">
                      {item.title}
                    </h3>
                    
                    {/* 描述 */}
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {'description' in item ? item.description : item.content}
                    </p>

                    {/* 图片预览区域 */}
                    {'coverImage' in item && item.coverImage && (
                      <div className="mb-3 grid grid-cols-3 gap-2">
                        <div className="aspect-video bg-gradient-to-br from-blue-50 to-purple-50 rounded" />
                        <div className="aspect-video bg-gradient-to-br from-green-50 to-blue-50 rounded" />
                        <div className="aspect-video bg-gradient-to-br from-orange-50 to-pink-50 rounded" />
                      </div>
                    )}

                    {/* 标签组 */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {item.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs hover:bg-gray-200 cursor-pointer"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* 底部信息栏 */}
                    <div className="flex items-center justify-between text-sm text-gray-500 pt-3 border-t">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          <span>{856}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="h-4 w-4" />
                          <span>{'likes' in item ? item.likes : 0}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="h-4 w-4" />
                          <span>{'comments' in item ? item.comments.length : 0}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {'estimatedIncome' in item && (
                          <span className="text-green-600 font-medium">{item.estimatedIncome}</span>
                        )}
                        <span className="text-xs text-gray-400">
                          {new Date(item.createdAt).toLocaleDateString('zh-CN')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>

          {/* 右侧边栏 */}
          <aside className="col-span-3 space-y-4">
            {/* 文章获赞榜 */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Flame className="h-5 w-5 text-orange-500" />
                  <h3 className="font-semibold">文章获赞榜</h3>
                </div>
                <div className="flex gap-1 text-xs">
                  <button className="px-2 py-1 bg-blue-50 text-blue-600 rounded">近7天</button>
                  <button className="px-2 py-1 text-gray-500 hover:bg-gray-50 rounded">近1月</button>
                </div>
              </div>
              <div className="space-y-3">
                {posts.slice(0, 7).map((post, idx) => (
                  <div key={post.id} className="flex gap-2">
                    <span className={`flex-shrink-0 w-5 h-5 rounded flex items-center justify-center text-xs font-semibold ${
                      idx === 0 ? 'bg-red-500 text-white' :
                      idx === 1 ? 'bg-orange-500 text-white' :
                      idx === 2 ? 'bg-yellow-500 text-white' :
                      'bg-gray-200 text-gray-600'
                    }`}>
                      {idx + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm hover:text-blue-600 cursor-pointer truncate">
                        {post.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-400">{post.author?.username || '匿名'}</span>
                        <span className="text-xs text-gray-400">·</span>
                        <span className="text-xs text-gray-500">{post.likes} 赞</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 作者获赞榜 */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-green-500" />
                  <h3 className="font-semibold">作者获赞榜</h3>
                </div>
                <div className="flex gap-1 text-xs">
                  <button className="px-2 py-1 bg-blue-50 text-blue-600 rounded">近7天</button>
                  <button className="px-2 py-1 text-gray-500 hover:bg-gray-50 rounded">近1月</button>
                </div>
              </div>
              <div className="space-y-3">
                {posts.slice(0, 7).map((post, idx) => (
                  <div key={post.id} className="flex items-center gap-2">
                    <span className={`flex-shrink-0 w-5 h-5 rounded flex items-center justify-center text-xs font-semibold ${
                      idx === 0 ? 'bg-red-500 text-white' :
                      idx === 1 ? 'bg-orange-500 text-white' :
                      idx === 2 ? 'bg-yellow-500 text-white' :
                      'bg-gray-200 text-gray-600'
                    }`}>
                      {idx + 1}
                    </span>
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-semibold">
                      {post.author?.username?.[0] || 'U'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{post.author?.username || '用户'}</p>
                      <p className="text-xs text-gray-500">{post.likes * (idx + 1)} 获赞</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 航海热度 */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="h-5 w-5 text-blue-500" />
                <h3 className="font-semibold">航海热度</h3>
              </div>
              <div className="space-y-3">
                {['小红书变现', 'AI工具实战', '抖音电商', '跨境出海'].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span className="text-sm hover:text-blue-600 cursor-pointer">{item}</span>
                    <span className="text-xs text-gray-500">{(idx + 1) * 156}人</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
