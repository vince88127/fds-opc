import { db } from '@/lib/db'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Eye, MessageCircle, ThumbsUp } from 'lucide-react'

export default async function ProjectsPage() {
  const projects = await db.projects.getAll()
  const categories = ['全部', ...new Set(projects.map(p => p.category))]

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* 左侧边栏 */}
          <aside className="col-span-2 space-y-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold mb-3 text-sm">搜索时间</h3>
              <div className="space-y-2 text-sm">
                {['全部', '1h以内', '1-2h', '2-4h', '4h以上'].map(item => (
                  <div key={item} className="text-gray-600 hover:text-blue-600 cursor-pointer">
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold mb-3 text-sm">启动盘面</h3>
              <div className="space-y-2 text-sm">
                {['0元', '200以内', '1500以内', '3000以内', '1万以内', '5万以内'].map(item => (
                  <div key={item} className="text-gray-600 hover:text-blue-600 cursor-pointer">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* 中间内容区 */}
          <main className="col-span-7">
            {/* 分类标签 */}
            <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
              <Tabs defaultValue="全部" className="w-full">
                <TabsList className="bg-gray-100 w-full justify-start">
                  {categories.map((category) => (
                    <TabsTrigger key={category} value={category} className="text-sm">
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>

            {/* 项目列表 */}
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-5">
                    {/* 分类标签 */}
                    <div className="mb-3">
                      <Badge className="bg-orange-100 text-orange-600 hover:bg-orange-100 text-xs">
                        {project.category}
                      </Badge>
                      <Badge className="ml-2 bg-blue-100 text-blue-600 hover:bg-blue-100 text-xs">
                        {project.difficulty === 'beginner' ? '入门' :
                         project.difficulty === 'intermediate' ? '进阶' : '高级'}
                      </Badge>
                    </div>
                    
                    {/* 标题 */}
                    <h3 className="text-lg font-semibold mb-2 hover:text-blue-600 cursor-pointer">
                      {project.title}
                    </h3>
                    
                    {/* 描述 */}
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {project.description}
                    </p>

                    {/* 图片预览 */}
                    <div className="mb-3 grid grid-cols-3 gap-2">
                      <div className="aspect-video bg-gradient-to-br from-blue-50 to-purple-50 rounded" />
                      <div className="aspect-video bg-gradient-to-br from-green-50 to-blue-50 rounded" />
                      <div className="aspect-video bg-gradient-to-br from-orange-50 to-pink-50 rounded" />
                    </div>

                    {/* 标签 */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs hover:bg-gray-200 cursor-pointer"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* 底部信息 */}
                    <div className="flex items-center justify-between text-sm text-gray-500 pt-3 border-t">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          <span>{1234}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="h-4 w-4" />
                          <span>{89}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="h-4 w-4" />
                          <span>{23}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-600 font-medium">{project.estimatedIncome}</span>
                        <span className="text-xs text-gray-400">
                          {new Date(project.createdAt).toLocaleDateString('zh-CN')}
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
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold mb-4">点赞榜</h3>
              <div className="space-y-3">
                {projects.slice(0, 5).map((project, idx) => (
                  <div key={project.id} className="flex gap-2">
                    <span className={`flex-shrink-0 w-5 h-5 rounded flex items-center justify-center text-xs font-semibold ${
                      idx === 0 ? 'bg-red-500 text-white' :
                      idx === 1 ? 'bg-orange-500 text-white' :
                      idx === 2 ? 'bg-yellow-500 text-white' :
                      'bg-gray-200 text-gray-600'
                    }`}>
                      {idx + 1}
                    </span>
                    <p className="text-sm hover:text-blue-600 cursor-pointer truncate flex-1">
                      {project.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold mb-4">热门分类</h3>
              <div className="flex flex-wrap gap-2">
                {categories.slice(1).map((cat) => (
                  <span
                    key={cat}
                    className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs hover:bg-gray-200 cursor-pointer"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
