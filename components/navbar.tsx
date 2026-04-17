'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Search, Bell } from 'lucide-react'
import { cn } from '@/lib/utils'
import { UserMenu } from './user-menu'
import { UserMenuSimple } from './user-menu-simple'

const navItems = [
  { name: '首页', href: '/' },
  { name: '项目库', href: '/projects' },
  { name: '航海', href: '/voyages' },
  { name: '聚会', href: '/meetups' },
  { name: '广场', href: '/square' },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative h-12 w-12">
                <Image
                  src="/logo.jpg"
                  alt="飞碟社OPC"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <span className="text-lg font-bold text-gray-800">
                飞碟社OPC
              </span>
            </Link>
            
            {/* 导航链接 */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "px-3 py-2 text-sm font-medium transition-colors rounded-md",
                      isActive 
                        ? "text-green-600 bg-green-50" 
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    )}
                  >
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </div>

          {/* 右侧功能区 */}
          <div className="flex items-center gap-4">
            {/* 搜索框 */}
            <div className="hidden lg:flex items-center gap-2 bg-gray-100 rounded-full px-4 py-1.5 w-64">
              <Search className="h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="搜索内容、用户、项目..."
                className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-gray-400"
              />
            </div>

            {/* 通知 */}
            <button className="relative p-2 hover:bg-gray-100 rounded-full">
              <Bell className="h-5 w-5 text-gray-600" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>

            {/* AI问答 */}
            <button className="hidden md:block px-4 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
              AI问答
            </button>

            {/* 用户菜单 */}
            <UserMenu />
          </div>
        </div>
      </div>
    </nav>
  )
}
