'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Anchor, 
  Calendar,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react'
import { useState } from 'react'

const menuItems = [
  { name: '数据概览', href: '/admin', icon: LayoutDashboard },
  { name: '用户管理', href: '/admin/users', icon: Users },
  { name: '内容管理', href: '/admin/content', icon: FileText },
  { name: '航海管理', href: '/admin/voyages', icon: Anchor },
  { name: '聚会管理', href: '/admin/meetups', icon: Calendar },
  { name: '广场管理', href: '/admin/square', icon: MessageSquare },
  { name: '系统设置', href: '/admin/settings', icon: Settings },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 顶部导航栏 */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <h1 className="text-xl font-bold text-gray-800">飞碟社OPC 后台管理</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              返回前台
            </Link>
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-sm font-semibold">
              A
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* 侧边栏 */}
        {sidebarOpen && (
          <aside className="w-64 bg-white border-r min-h-[calc(100vh-57px)] sticky top-[57px]">
            <nav className="p-4 space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href || 
                  (item.href !== '/admin' && pathname.startsWith(item.href))
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-600 font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
              
              <div className="pt-4 mt-4 border-t">
                <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 w-full transition-colors">
                  <LogOut className="h-5 w-5" />
                  <span>退出登录</span>
                </button>
              </div>
            </nav>
          </aside>
        )}

        {/* 主内容区 */}
        <main className={`flex-1 p-6 ${sidebarOpen ? '' : 'ml-0'}`}>
          {children}
        </main>
      </div>
    </div>
  )
}
