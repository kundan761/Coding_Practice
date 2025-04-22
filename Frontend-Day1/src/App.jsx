import { useMemo, useState } from "react";
import ProductCard from "./Components/ProductCard";
import useProduct from "./hooks/useProduct";
import "./App.css"; // 👈 Import external CSS

function App() {
  const products = useProduct();
  const [favs, setFavs] = useState(() => JSON.parse(localStorage.getItem("productFavs")) || []);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("none");

  const filtered = products.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));
  const toggleFav = (id) => {
    const updated = favs.includes(id) ? favs.filter(f => f !== id) : [...favs, id];
    setFavs(updated);
    localStorage.setItem("productFavs", JSON.stringify(updated));
  };
  

  const sorted = useMemo(() => {
    if (sortOrder === "asc") return [...filtered].sort((a, b) => a.price - b.price);
    if (sortOrder === "desc") return [...filtered].sort((a, b) => b.price - a.price);
    return filtered;
  }, [filtered, sortOrder]);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">🛍 Product List</h1>
        <div className="favs-count">Favourites: {favs.length}</div>
      </header>

      <div className="controls">
        <input
          type="text"
          placeholder="Search..."
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="sort-select"
        >
          <option value="none">Sort by</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      <div className="product-grid">
        {sorted.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            isFav={favs.includes(product.id)}
            toggleFav={toggleFav}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
