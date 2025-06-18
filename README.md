# 🛍️ Next.js Product Listing App

A simple and responsive Product Listing application built with **Next.js** and **TypeScript**. It allows users to view, add, delete, and filter products — with persistent data storage using a local `products.json` file (no database needed).

---

## 🚀 Features

- ✅ View all products with image, name, price, and category
- ✅ Add new products via modal form
- ✅ Delete products from UI
- ✅ Filter/search products by name or category
- ✅ View product details on `/products/[id]` page
- ✅ Persistent data using JSON file + `fs` module

---

## 📁 Project Structure

```
.
├── app/
│   ├── products/
│   │   ├── page.tsx          # Product listing page
│   │   └── [id]/page.tsx     # Single product detail page
├── components/
│   ├── AddProductForm.tsx    # Form to add new product
│   ├── ProductCard.tsx       # Individual product display
│   └── Modal.tsx             # Reusable popup modal
├── data/
│   └── products.json         # JSON-based product database
├── lib/
│   └── productStore.ts       # Read/write logic for products.json
├── pages/
│   └── api/
│       └── products/
│           ├── index.ts      # GET & POST API
│           └── [id].ts       # DELETE API
├── types/
│   └── product.ts            # Type definitions
```

---

## 🛠️ Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/product-listing-app.git
cd product-listing-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

Visit [http://localhost:3000/products](http://localhost:3000/products) in your browser.

---

## 🔌 API Endpoints

### `GET /api/products`
Returns the list of all products.

### `POST /api/products`
Adds a new product. Requires:
```json
{
  "name": "Product Name",
  "price": 999,
  "imageUrl": "/example.jpg",
  "category": "Category Name"
}
```

### `DELETE /api/products/:id`
Deletes a product by ID.

---

## 🧠 Tech Stack

- **Frontend:** Next.js (App Router), React, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes
- **Storage:** Local JSON file (`products.json`)
- **UI:** Custom components with Tailwind styling

---

## 📝 Notes

- ❗ Data is stored in `data/products.json`. This approach is ideal for demo or small-scale internal tools.
- 🔐 For real-world apps, consider moving to a database like MongoDB, PostgreSQL, or Firebase.

---

## ✨ Future Improvements

- [ ] Edit/Update product support
- [ ] Image file uploads
- [ ] Pagination / Infinite scroll
- [ ] Unit tests (Jest / React Testing Library)
- [ ] PWA support

---

## 📄 License

MIT License  
© 2025 Your Name