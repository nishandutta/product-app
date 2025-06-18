'use client'

import { X } from 'lucide-react'
import { ReactNode } from 'react'

export default function Modal({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}) {
  if (!isOpen) return null

  return (
    <div className='fixed inset-0 bg-black/90 bg-opacity-40 flex items-center justify-center z-50 '>
      <div className=' rounded-lg p-6 w-full max-w-md relative shadow-2xs'>
        <button
          onClick={onClose}
          className='absolute top-8 right-8 text-gray-500 hover:text-gray-700 text-xl'
        >
          <X />
        </button>

        {children}
      </div>
    </div>
  )
}
