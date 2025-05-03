import React, { useEffect, useState } from 'react';

const ThemeToggle = () => {
  const [dark, setDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    document.body.className = dark ? 'dark' : '';
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <button onClick={() => setDark(!dark)}>
      {dark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    </button>
  );
};

export default ThemeToggle;
