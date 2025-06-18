export interface ProductsType {
  id: string
  name: string
  price: string
  imageUrl: string
  category: string
}

export interface ProductCardType {
  product: ProductsType
  onDelete: (id: string) => void
}

export interface AddProductCardType {
  onProductAdded: (newProduct?: any) => void
}
