import React from "react";

const ResultsList = ({ results }) => {
  if (results.length === 0) {
    return <p>No results found.</p>;
  }

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {results.map((item) => (
        <li
          key={item.id}
          style={{
            marginBottom: "1rem",
            padding: "1rem",
            border: "1px solid #ccc",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <h4 style={{ margin: "0 0 0.5rem 0" }}>{item.title}</h4>
          <p style={{ margin: 0 }}>{item.body}</p>
        </li>
      ))}
    </ul>
  );
};

export default ResultsList;
