import React, { useState, useEffect } from "react";
import SearchInput from "./components/SearchInput.jsx";
import ResultsList from "./components/ResultsList.jsx";
import PaginationControls from "./components/PaginationControls.jsx";

const ITEMS_PER_PAGE = 10;

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [results, setResults] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setResults([]);
      setTotalResults(0);
      return;
    }

    const controller = new AbortController();
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(`https://jsonplaceholder.typicode.com/posts`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error("Failed to fetch data");

        const data = await res.json();

        // Filter based on searchTerm in title or body
        const filtered = data.filter(
          (item) =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.body.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const total = filtered.length;
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const pageItems = filtered.slice(
          startIndex,
          startIndex + ITEMS_PER_PAGE
        );

        setResults(pageItems);
        setTotalResults(total);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Cancel request on cleanup
    return () => controller.abort();
  }, [searchTerm, currentPage]);

  const totalPages = Math.ceil(totalResults / ITEMS_PER_PAGE);

  const handleSearch = (term) => {
    if (term !== searchTerm) {
      setSearchTerm(term);
      setCurrentPage(1); // Reset only when the search term really changes
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h2>Search Posts</h2>
      <SearchInput onSearch={handleSearch} />
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && <ResultsList results={results} />}
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        goToNextPage={goToNextPage}
        goToPrevPage={goToPrevPage}
      />
    </div>
  );
}

export default App;
