import { Card, CardContent } from '@/components/ui/card'

export default function SquareManagementPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">广场管理</h2>
        <p className="text-gray-600 mt-1">管理广场动态内容</p>
      </div>

      <Card>
        <CardContent className="py-12 text-center text-gray-400">
          <p>广场管理功能开发中...</p>
        </CardContent>
      </Card>
    </div>
  )
}
