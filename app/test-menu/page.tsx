'use client'

import { UserMenu } from '@/components/user-menu'

export default function TestMenuPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">用户菜单测试页面</h1>
        
        <div className="bg-white p-8 rounded-lg shadow">
          <p className="mb-4">点击下面的头像测试菜单:</p>
          <div className="flex justify-center">
            <UserMenu />
          </div>
        </div>

        <div className="mt-8 bg-yellow-50 border border-yellow-200 p-4 rounded">
          <p className="text-sm">
            <strong>测试说明:</strong>
          </p>
          <ul className="list-disc list-inside text-sm mt-2 space-y-1">
            <li>头像应该显示为蓝紫色渐变圆形,中间有字母"U"</li>
            <li>点击头像应该弹出下拉菜单</li>
            <li>再次点击或点击外部应该关闭菜单</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
