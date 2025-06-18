import type { NextApiRequest, NextApiResponse } from 'next'
import { getAllProducts, saveProducts } from '@/lib/productStore'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    method,
  } = req

  const productId = parseInt(id as string)

  if (method === 'DELETE') {
    const products = getAllProducts()
    const index = products.findIndex((p: any) => p.id === productId)

    if (index === -1) {
      return res.status(404).json({ error: 'Product not found' })
    }

    products.splice(index, 1)
    saveProducts(products)

    return res.status(200).json({ message: 'Product deleted' })
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
