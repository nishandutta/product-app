import fs from 'fs'
import path from 'path'

const filePath = path.join(process.cwd(), 'data/products.json')

export function getAllProducts() {
  const data = fs.readFileSync(filePath, 'utf8')
  return JSON.parse(data)
}

export function saveProducts(products: any[]) {
  fs.writeFileSync(filePath, JSON.stringify(products, null, 2), 'utf8')
}
