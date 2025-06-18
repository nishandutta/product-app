'use client'
import { AddProductCardType } from '@/types/product'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function AddProductForm({ onProductAdded }: AddProductCardType) {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    imageUrl: '',
    category: '',
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)

    if (
      !formData.name ||
      !formData.price ||
      !formData.imageUrl ||
      !formData.category
    ) {
      toast.error('All fields are required!')
      setLoading(false)
      return
    }

    const newProduct = {
      id: Date.now(), // or UUID
      name: formData.name,
      price: Number(formData.price),
      imageUrl: formData.imageUrl,
      category: formData.category,
    }

    if (process.env.NODE_ENV === 'production') {
      // 🟡 Fake add in production
      toast.success('Product added (not saved)')
      onProductAdded(newProduct) // ⬅️ pass new product object
      setFormData({ name: '', price: '', imageUrl: '', category: '' })
    } else {
      // ✅ Real API call in development
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      })

      const added = await res.json()
      if (res.ok) {
        toast.success('Product added!')
        onProductAdded()
        setFormData({ name: '', price: '', imageUrl: '', category: '' })
      } else {
        toast.error(added.error || 'Failed to add product')
      }
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className='p-4 border rounded mb-6'>
      <h2 className='text-xl font-semibold mb-4'>Add New Product</h2>
      <input
        name='name'
        value={formData.name}
        onChange={handleChange}
        placeholder='Product Name'
        className='w-full mb-2 p-2 border rounded'
        required
      />
      <input
        name='price'
        type='number'
        value={formData.price}
        onChange={handleChange}
        placeholder='Price'
        className='w-full mb-2 p-2 border rounded'
        required
      />
      <input
        name='imageUrl'
        value={formData.imageUrl}
        onChange={handleChange}
        placeholder='Image URL'
        className='w-full mb-2 p-2 border rounded'
        required
      />
      <input
        name='category'
        value={formData.category}
        onChange={handleChange}
        placeholder='Category (e.g., Electronics)'
        className='w-full mb-2 p-2 border rounded'
        required
      />
      <button
        type='submit'
        disabled={loading}
        className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
      >
        {loading ? 'Adding...' : 'Add Product'}
      </button>
    </form>
  )
}
