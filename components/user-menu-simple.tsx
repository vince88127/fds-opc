'use client'

import { useState } from 'react'

export function UserMenuSimple() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => {
          console.log('Button clicked!')
          setIsOpen(!isOpen)
        }}
        className="h-9 w-9 rounded-full bg-purple-500 text-white font-bold"
      >
        U
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg p-4 z-50">
          <p>菜单已打开!</p>
          <p className="text-sm text-gray-500">isOpen: {String(isOpen)}</p>
        </div>
      )}
    </div>
  )
}
