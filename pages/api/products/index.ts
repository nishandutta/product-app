import type { NextApiRequest, NextApiResponse } from 'next'
import { getAllProducts, saveProducts } from '@/lib/productStore'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const products = getAllProducts()
    return res.status(200).json(products)
  }

  if (req.method === 'POST') {
    const { name, price, imageUrl, category } = req.body

    if (!name || !price || !imageUrl || !category) {
      return res.status(400).json({ error: 'Missing fields' })
    }

    const products = getAllProducts()

    const newProduct = {
      id: Date.now(),
      name,
      price,
      imageUrl,
      category,
    }

    products.push(newProduct)
    saveProducts(products)

    return res.status(201).json(newProduct)
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
