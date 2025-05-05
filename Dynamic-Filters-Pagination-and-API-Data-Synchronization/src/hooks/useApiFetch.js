import { useEffect, useState } from 'react';
import axios from 'axios';

const getStatusTag = (id) => {
  const tags = ['New', 'Popular', 'Discounted'];
  return tags[id % tags.length];
};

const useApiFetch = (filters, page) => {
  const [data, setData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        let url = 'https://fakestoreapi.com/products';

        if (filters.category) {
          url = `https://fakestoreapi.com/products/category/${filters.category}`;
        }

        const res = await axios.get(url, { signal: controller.signal });

        let items = res.data;

        // Apply mocked status filtering
        if (filters.status) {
          items = items.filter(
            (item) => getStatusTag(item.id) === filters.status
          );
        }

        // Pagination logic
        const itemsPerPage = 10;
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedItems = items.slice(start, end);

        setTotalItems(items.length);
        setData(paginatedItems);
      } catch (err) {
        if (err.name !== 'CanceledError') {
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup
    return () => controller.abort();
  }, [filters, page]);

  return { data, loading, error, totalItems };
};

export default useApiFetch;
