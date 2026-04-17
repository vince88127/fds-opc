import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Save } from 'lucide-react'

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">系统设置</h2>
        <p className="text-gray-600 mt-1">配置系统参数和选项</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 基本设置 */}
        <Card>
          <CardHeader>
            <CardTitle>基本设置</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                网站名称
              </label>
              <input
                type="text"
                defaultValue="飞碟社OPC"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                网站描述
              </label>
              <textarea
                rows={3}
                defaultValue="飞碟社OPC会员社群,汇聚优质赚钱项目"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              <Save className="h-4 w-4 mr-2" />
              保存设置
            </Button>
          </CardContent>
        </Card>

        {/* 邮件设置 */}
        <Card>
          <CardHeader>
            <CardTitle>邮件设置</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SMTP服务器
              </label>
              <input
                type="text"
                placeholder="smtp.example.com"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                发件邮箱
              </label>
              <input
                type="email"
                placeholder="noreply@example.com"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              <Save className="h-4 w-4 mr-2" />
              保存设置
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
