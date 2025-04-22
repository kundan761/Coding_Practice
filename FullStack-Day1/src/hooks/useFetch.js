import { useEffect, useRef, useState } from "react";

const TTL = 5 * 60 * 1000; 

const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const abortControllerRef = useRef(null);

  const fetchData = async (bypassCache = false) => {
    const cacheKey = `useFetch::${url}`;

    if (!bypassCache) {
      const cached = sessionStorage.getItem(cacheKey);
      if (cached) {
        const { data, ts } = JSON.parse(cached);
        const isFresh = Date.now() - ts < TTL;
        if (isFresh) {
          setData(data);
          setLoading(false);
          return;
        }
      }
    }

    try {
      setLoading(true);
      abortControllerRef.current = new AbortController();
      const response = await fetch(url, {
        ...options,
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const result = await response.json();
      setData(result);
      sessionStorage.setItem(
        cacheKey,
        JSON.stringify({ data: result, ts: Date.now() })
      );
    } catch (err) {
      if (err.name !== "AbortError") {
        setError(err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  const refetch = () => {
    fetchData(true); // bypass cache
  };

  return { data, error, loading, refetch };
};

export default useFetch;
