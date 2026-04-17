import { db } from '@/lib/db'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Eye, ThumbsUp, MessageCircle, Share2, BookmarkPlus } from 'lucide-react'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'

export default async function ProjectDetailPage({ params }: { params: { id: string } }) {
  const project = await db.projects.findById(params.id)
  
  if (!project) {
    notFound()
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* 主内容区 */}
          <main className="col-span-9">
            <div className="bg-white rounded-lg shadow-sm p-8">
              {/* 头部信息 */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <Badge className="bg-orange-100 text-orange-600 hover:bg-orange-100">
                    {project.category}
                  </Badge>
                  <Badge className="bg-blue-100 text-blue-600 hover:bg-blue-100">
                    {project.difficulty === 'beginner' ? '入门' :
                     project.difficulty === 'intermediate' ? '进阶' : '高级'}
                  </Badge>
                </div>
                
                <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
                
                <p className="text-gray-600 text-lg mb-6">{project.description}</p>
                
                {/* 数据栏 */}
                <div className="flex items-center gap-6 text-sm text-gray-500 pb-6 border-b">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    <span>3856 浏览</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ThumbsUp className="h-4 w-4" />
                    <span>256 点赞</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4" />
                    <span>45 评论</span>
                  </div>
                  <div className="ml-auto text-green-600 font-semibold text-lg">
                    预估收益: {project.estimatedIncome}
                  </div>
                </div>
              </div>

              {/* 正文内容 */}
              <div className="prose prose-lg max-w-none">
                <ReactMarkdown>{project.content}</ReactMarkdown>
              </div>

              {/* 标签 */}
              <div className="mt-8 pt-6 border-t">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-gray-200 cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* 操作按钮 */}
              <div className="mt-8 flex items-center gap-4">
                <Button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600">
                  <ThumbsUp className="h-4 w-4 mr-2" />
                  点赞支持
                </Button>
                <Button variant="outline" className="flex-1">
                  <BookmarkPlus className="h-4 w-4 mr-2" />
                  收藏项目
                </Button>
                <Button variant="outline">
                  <Share2 className="h-4 w-4 mr-2" />
                  分享
                </Button>
              </div>
            </div>

            {/* 评论区 */}
            <div className="bg-white rounded-lg shadow-sm p-8 mt-6">
              <h3 className="text-xl font-semibold mb-6">精彩评论</h3>
              <div className="text-center text-gray-400 py-12">
                暂无评论,快来发表你的看法吧~
              </div>
            </div>
          </main>

          {/* 右侧边栏 */}
          <aside className="col-span-3 space-y-4">
            {/* 作者信息 */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold mb-4">项目信息</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">发布时间</span>
                  <span>{new Date(project.createdAt).toLocaleDateString('zh-CN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">更新时间</span>
                  <span>{new Date(project.updatedAt).toLocaleDateString('zh-CN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">难度等级</span>
                  <span>
                    {project.difficulty === 'beginner' ? '⭐ 入门' :
                     project.difficulty === 'intermediate' ? '⭐⭐ 进阶' : '⭐⭐⭐ 高级'}
                  </span>
                </div>
              </div>
            </div>

            {/* 相关推荐 */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold mb-4">相关项目</h3>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="pb-3 border-b last:border-0">
                    <p className="text-sm hover:text-blue-600 cursor-pointer line-clamp-2">
                      相关赚钱项目推荐标题
                    </p>
                    <p className="text-xs text-gray-500 mt-1">1.2万 浏览</p>
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
