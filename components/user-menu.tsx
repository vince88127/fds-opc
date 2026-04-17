'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Home, Bookmark, Settings, Trophy, LogOut, Heart, FileText } from 'lucide-react'

export function UserMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  return (
    <div 
      className="relative z-50"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* 用户头像 - 点击跳转个人中心 */}
      <Link
        href="/profile"
        className="relative h-9 w-9 min-w-[36px] min-h-[36px] rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-base font-bold hover:shadow-lg transition-all hover:scale-105 border-2 border-transparent hover:border-blue-300 cursor-pointer"
        style={{ backgroundColor: '#8B5CF6' }}
      >
        <span className="text-white font-bold text-base select-none pointer-events-none">
          U
        </span>
      </Link>

      {/* 下拉菜单 */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2" style={{ zIndex: 9999 }}>
          {/* 用户信息 */}
          <div className="px-4 py-3 border-b">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold">
                U
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-800">飞碟用户</p>
                <p className="text-xs text-gray-500">星球编号: 201007</p>
              </div>
            </div>
            
            {/* 统计数据 */}
            <div className="flex items-center justify-around mt-3 pt-3 border-t">
              <div className="text-center">
                <p className="text-lg font-semibold">0</p>
                <p className="text-xs text-gray-500">关注</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold">0</p>
                <p className="text-xs text-gray-500">粉丝</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold">0</p>
                <p className="text-xs text-gray-500">获赞与点赞</p>
              </div>
            </div>
          </div>

          {/* 菜单项 */}
          <div className="py-2">
            <Link
              href="/profile"
              className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <Home className="h-4 w-4 text-gray-500" />
              <span className="text-sm">我的主页</span>
            </Link>
            
            <Link
              href="/profile/bookmarks"
              className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <Bookmark className="h-4 w-4 text-gray-500" />
              <span className="text-sm">我的收藏</span>
            </Link>

            <Link
              href="/profile/posts"
              className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <FileText className="h-4 w-4 text-gray-500" />
              <span className="text-sm">我的文章</span>
            </Link>

            <Link
              href="/profile/likes"
              className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <Heart className="h-4 w-4 text-gray-500" />
              <span className="text-sm">我的点赞</span>
            </Link>

            <Link
              href="/profile/voyages"
              className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <Trophy className="h-4 w-4 text-gray-500" />
              <span className="text-sm">我的航海</span>
            </Link>
          </div>

          <div className="border-t py-2">
            <Link
              href="/settings"
              className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <Settings className="h-4 w-4 text-gray-500" />
              <span className="text-sm">设置</span>
            </Link>

            <button
              className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors text-red-600"
              onClick={() => setIsOpen(false)}
            >
              <LogOut className="h-4 w-4" />
              <span className="text-sm">退出登录</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
