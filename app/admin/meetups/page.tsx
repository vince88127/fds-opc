import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export default function MeetupsManagementPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">聚会管理</h2>
          <p className="text-gray-600 mt-1">管理线下聚会活动</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          创建聚会
        </Button>
      </div>

      <Card>
        <CardContent className="py-12 text-center text-gray-400">
          <p>聚会管理功能开发中...</p>
        </CardContent>
      </Card>
    </div>
  )
}
