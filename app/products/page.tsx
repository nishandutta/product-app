'use client'

import { useEffect, useState } from 'react'
import ProductCard from '@/components/ProductCard'
import AddProductForm from '@/components/AddProductForm'
import { ProductsType } from '@/types/product'
import Modal from '@/components/Modal'

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductsType[]>([])
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [showForm, setShowForm] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    setIsLoading(true)
    const res = await fetch('/api/products')
    const data = await res.json()
    setProducts(data)
    setIsLoading(false)
  }

  const handleProductAdded = () => {
    fetchProducts()
    setShowForm(false)
  }

  const handleDelete = (id: string) => {
    const updated = products.filter((p) => p.id !== id)
    setProducts(updated)
  }

  const filtered = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase())

    const matchesCategory =
      categoryFilter === 'All' || product.category === categoryFilter

    return matchesSearch && matchesCategory
  })

  const categories = ['All', ...new Set(products.map((p) => p.category))]

  return (
    <div className='p-4'>
      {showForm && <AddProductForm onProductAdded={handleProductAdded} />}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <AddProductForm
          onProductAdded={() => {
            handleProductAdded()
            setShowModal(false)
          }}
        />
      </Modal>

      <div className='mb-4 flex flex-col sm:flex-row sm:items-center gap-2'>
        <button
          onClick={() => setShowModal(true)}
          className='bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700'
        >
          + Add Product
        </button>
        <input
          type='text'
          placeholder='Search by name or category...'
          className='flex-1 p-2 border rounded'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className='p-2 border rounded'
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {isLoading ? (
        <p className='text-center text-gray-500'>Loading products...</p>
      ) : filtered.length === 0 ? (
        <p className='text-center text-gray-500'>No products found.</p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  )
}
