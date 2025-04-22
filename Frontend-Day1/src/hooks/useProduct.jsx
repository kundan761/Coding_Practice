import { useEffect, useState } from "react";

export default function useProduct() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch("/product.json")
            .then((res) => res.json())
            .then((data) => setProducts(data));
    }, []);
    return products;
}