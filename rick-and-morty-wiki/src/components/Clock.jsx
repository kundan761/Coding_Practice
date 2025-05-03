import React, { useEffect, useState } from 'react';
import '../styles/Clock.css';

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = date =>
    date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

  const formatDate = date =>
    date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });

  return (
    <footer className="footer-clock">
      {formatTime(time)} {formatDate(time)}
    </footer>
  );
};

export default Clock;
