import { getAllProducts } from '@/lib/productStore'
import Link from 'next/link'

export default function ProductDetailPage({ params }: any) {
  const productId = parseInt(params.id)
  const products = getAllProducts()
  const product = products.find((p: any) => p.id === productId)

  if (!product) {
    return <p className='p-4'>Product not found</p>
  }

  return (
    <div className='p-6 max-w-xl mx-auto'>
      <Link href='/products'>
        <button className='mb-4 text-blue-600 hover:underline hover:text-blue-800 text-sm'>
          ← Back to Products
        </button>
      </Link>

      <img
        src={product.imageUrl}
        alt={product.name}
        className='w-full h-64 object-cover rounded mb-4'
      />
      <h1 className='text-2xl font-bold mb-2'>{product.name}</h1>
      <p className='text-gray-700 mb-1'>₹{product.price}</p>
      <p className='text-gray-500 text-sm'>Category: {product.category}</p>
    </div>
  )
}
