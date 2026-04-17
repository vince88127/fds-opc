import { db } from '@/lib/db'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Waves, Check, Crown } from 'lucide-react'

export default async function DeepSeaPage() {
  const circles = await db.deepSeaCircles.getAll()

  return (
    <div className="container py-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Waves className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            深海圈
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            高客单价学习陪跑服务,深度持续精进,打造长期事业
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {circles.length === 0 ? (
            <Card className="md:col-span-2 lg:col-span-3">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <Waves className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium text-muted-foreground">
                  深海圈服务即将推出,敬请期待!
                </p>
              </CardContent>
            </Card>
          ) : (
            circles.map((circle) => (
              <Card key={circle.id} className="hover:shadow-xl transition-all border-2 hover:border-purple-200">
                {circle.coverImage && (
                  <div className="h-48 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 rounded-t-xl flex items-center justify-center">
                    <Crown className="h-16 w-16 text-purple-600" />
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{circle.title}</CardTitle>
                  <CardDescription className="text-base">
                    {circle.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    {circle.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-4 border-t">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-3xl font-bold text-purple-600">
                        ¥{circle.price.toLocaleString()}
                      </span>
                      <span className="text-muted-foreground">/ {circle.duration}</span>
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 text-lg h-12">
                    立即加入
                  </Button>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <h3 className="text-xl font-semibold">为什么选择深海圈?</h3>
              <div className="grid md:grid-cols-3 gap-6 mt-6">
                <div className="space-y-2">
                  <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center mx-auto">
                    <Crown className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h4 className="font-semibold">深度陪跑</h4>
                  <p className="text-sm text-muted-foreground">
                    一对一指导,全程陪伴成长
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mx-auto">
                    <Waves className="h-6 w-6 text-purple-600" />
                  </div>
                  <h4 className="font-semibold">持续精进</h4>
                  <p className="text-sm text-muted-foreground">
                    系统化学习,打造长期事业
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="h-12 w-12 rounded-full bg-pink-100 flex items-center justify-center mx-auto">
                    <Check className="h-6 w-6 text-pink-600" />
                  </div>
                  <h4 className="font-semibold">结果导向</h4>
                  <p className="text-sm text-muted-foreground">
                    以实际收益为目标,确保成效
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
