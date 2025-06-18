'use client'

import { ProductCardType } from '@/types/product'
import { Trash2 } from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'

export default function ProductCard({ product, onDelete }: ProductCardType) {
  const handleDelete = async () => {
    const confirmed = confirm(`Delete ${product.name}?`)
    if (!confirmed) return

    try {
      const res = await fetch(`/api/products/${product.id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        onDelete(product.id)
        toast.success('Product deleted')
      } else {
        const error = await res.json()
        console.error('Delete failed:', error)
        toast.error(error?.error || 'Failed to delete product')
      }
    } catch (err) {
      console.error('API error:', err)
      toast.error('Failed to delete product')
    }
  }

  return (
    <div className='relative group'>
      {/* Delete Button OUTSIDE the Link */}
      <button
        onClick={handleDelete}
        title='Delete Product'
        className='absolute top-2 right-2 z-10 bg-red-100 text-red-600 p-2 rounded-full hover:bg-red-200 transition'
      >
        <Trash2 size={16} />
      </button>

      {/* Clickable Link Card */}
      <Link href={`/products/${product.id}`} className='block'>
        <div className='border rounded shadow-sm p-4 hover:shadow-md transition-all'>
          <img
            src={product.imageUrl}
            alt={product.name}
            className='w-full h-48 object-cover rounded'
          />
          <div className='mt-3'>
            <h2 className='font-semibold text-lg'>{product.name}</h2>
            <p className='text-gray-700'>₹{product.price}</p>
            <p className='text-sm text-gray-500'>{product.category}</p>
          </div>
        </div>
      </Link>
    </div>
  )
}
