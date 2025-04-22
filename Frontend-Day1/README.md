# 🛍️ Dynamic Product List

This is a dynamic product listing React application that allows users to:

- View a list of products
- Search products by name
- Sort products by price (Low to High / High to Low)
- Mark/unmark products as favourites ❤️, which are saved to `localStorage`

## 🚀 Getting Started

Clone the repository and install dependencies:

```markdown
npm i
npm run dev
```

## 📁 Folder Structure

```
/client
 ├─ public/
 │   └─ products.json
 └─ src/
     ├─ components/
     │   └─ ProductCard.jsx
     ├─ hooks/
     │   └─ useProduct.js
     └─ App.jsx
```
## Home image
![Home Page Image](./public/Screenshot%202025-04-23%20005750.png)

## Design Notes

- **State vs. Context**: We manage state locally inside the `App.jsx` component because the data (favourites, search, sort) is not needed globally or across multiple deeply nested components. Using Context would have added unnecessary complexity for this scale.
  
- **Memoization**: We use `useMemo` to memoize the sorted product list so that sorting operations don't re-run unnecessarily unless dependencies (`filtered`, `sortOrder`) change. This improves performance especially when working with larger product data.

## Testing

🧪 Testing powered by **Vitest** and **React Testing Library**.
```markdown
npm run test
```
## Licence
Happy coding!
