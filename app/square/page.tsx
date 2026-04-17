import { db } from '@/lib/db'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Heart, MessageCircle, Share2, MessageSquare } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { zhCN } from 'date-fns/locale'

export default async function SquarePage() {
  const posts = await db.squarePosts.getAll()
  const sortedPosts = posts.sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  return (
    <div className="container py-8">
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">广场</h1>
            <p className="text-muted-foreground mt-2">
              分享你的想法和日常
            </p>
          </div>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold flex-shrink-0">
                U
              </div>
              <div className="flex-1">
                <textarea
                  placeholder="分享新鲜事..."
                  className="w-full min-h-[100px] p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex justify-end mt-3">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                    发布
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {sortedPosts.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16">
                <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium text-muted-foreground">
                  还没有动态,快来发布第一条吧!
                </p>
              </CardContent>
            </Card>
          ) : (
            sortedPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold flex-shrink-0">
                      {post.author?.username?.[0] || 'U'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{post.author?.username || '匿名用户'}</span>
                        <span className="text-sm text-muted-foreground">
                          {formatDistanceToNow(new Date(post.createdAt), { 
                            addSuffix: true,
                            locale: zhCN 
                          })}
                        </span>
                      </div>
                      <p className="mt-2 text-sm whitespace-pre-wrap break-words">
                        {post.content}
                      </p>
                      {post.images && post.images.length > 0 && (
                        <div className="mt-3 grid grid-cols-3 gap-2">
                          {post.images.map((img, idx) => (
                            <div
                              key={idx}
                              className="aspect-square bg-gray-100 rounded-lg"
                            />
                          ))}
                        </div>
                      )}
                      <div className="flex items-center gap-6 mt-4 text-muted-foreground">
                        <button className="flex items-center gap-2 hover:text-red-500 transition-colors">
                          <Heart className="h-4 w-4" />
                          <span className="text-sm">{post.likes}</span>
                        </button>
                        <button className="flex items-center gap-2 hover:text-blue-500 transition-colors">
                          <MessageCircle className="h-4 w-4" />
                          <span className="text-sm">{post.comments.length}</span>
                        </button>
                        <button className="flex items-center gap-2 hover:text-green-500 transition-colors">
                          <Share2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
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
