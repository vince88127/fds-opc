import { db } from '@/lib/db'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Search, Plus, Eye, ThumbsUp, MessageCircle, MoreVertical, Edit, Trash2 } from 'lucide-react'
import Link from 'next/link'

export default async function ContentManagementPage() {
  const posts = await db.posts.getAll()
  const projects = await db.projects.getAll()

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">内容管理</h2>
          <p className="text-gray-600 mt-1">管理帖子和项目内容</p>
        </div>
      </div>

      {/* 标签页 */}
      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="bg-white border">
          <TabsTrigger value="posts">帖子管理</TabsTrigger>
          <TabsTrigger value="projects">项目管理</TabsTrigger>
        </TabsList>

        {/* 帖子管理 */}
        <TabsContent value="posts" className="mt-6 space-y-4">
          {/* 搜索和操作 */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="搜索帖子标题、内容..."
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  新建帖子
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 帖子列表 */}
          <Card>
            <CardHeader>
              <CardTitle>帖子列表 ({posts.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {posts.map((post) => (
                  <div key={post.id} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-gray-50">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold flex-shrink-0">
                      {post.author?.username?.[0] || 'U'}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-lg mb-1">{post.title}</h3>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">{post.content}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{post.author?.username}</span>
                        <span>·</span>
                        <span>{new Date(post.createdAt).toLocaleDateString('zh-CN')}</span>
                        <span>·</span>
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            1234
                          </span>
                          <span className="flex items-center gap-1">
                            <ThumbsUp className="h-4 w-4" />
                            {post.likes}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageCircle className="h-4 w-4" />
                            {post.comments.length}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 mt-3">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1" />
                        编辑
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4 mr-1" />
                        删除
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 项目管理 */}
        <TabsContent value="projects" className="mt-6 space-y-4">
          {/* 搜索和操作 */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="搜索项目标题..."
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <select className="px-4 py-2 border rounded-lg">
                  <option>全部分类</option>
                  <option>AI变现</option>
                  <option>内容变现</option>
                  <option>电商</option>
                  <option>出海</option>
                </select>
                <Link href="/admin/content/new-project">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="h-4 w-4 mr-2" />
                    新建项目
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* 项目列表 */}
          <Card>
            <CardHeader>
              <CardTitle>项目列表 ({projects.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((project) => (
                  <div key={project.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-medium text-lg mb-1">{project.title}</h3>
                        <p className="text-sm text-gray-600 line-clamp-2">{project.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <Badge className="bg-orange-100 text-orange-600 hover:bg-orange-100">
                        {project.category}
                      </Badge>
                      <Badge className="bg-blue-100 text-blue-600 hover:bg-blue-100">
                        {project.difficulty === 'beginner' ? '入门' :
                         project.difficulty === 'intermediate' ? '进阶' : '高级'}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                      <span className="text-green-600 font-medium">{project.estimatedIncome}</span>
                      <span>{new Date(project.createdAt).toLocaleDateString('zh-CN')}</span>
                    </div>

                    <div className="flex gap-2 pt-3 border-t">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="h-4 w-4 mr-1" />
                        编辑
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
