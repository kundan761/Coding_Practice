import React, { useState, useEffect } from "react";
import useDebounce from "../hooks/useDebounce";

const SearchInput = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState("");
  const debouncedSearchTerm = useDebounce(inputValue, 500);

  useEffect(() => {
    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearch]);

  return (
    <div style={{ marginBottom: "1rem" }}>
      <input
        type="text"
        placeholder="Search..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        style={{ padding: "8px", width: "300px" }}
      />
    </div>
  );
};

export default SearchInput;
