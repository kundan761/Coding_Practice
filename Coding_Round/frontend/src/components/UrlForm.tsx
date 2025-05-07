import React, { useState } from 'react';
import { createShortUrl } from '../services/urlService.tsx';

interface UrlFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setShortUrlData: React.Dispatch<React.SetStateAction<any>>;
}

const UrlForm: React.FC<UrlFormProps> = ({ setShortUrlData }) => {
  const [longUrl, setLongUrl] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!longUrl) {
      setError('Please enter a valid URL');
      return;
    }

    try {
      const data = await createShortUrl(longUrl);
      setShortUrlData(data);
      setError('');
    } catch (err) {
      setError('Failed to shorten URL. Please try again.');
      console.error(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="url"
          placeholder="Enter Long URL"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          required
        />
        <button type="submit">Shorten URL</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default UrlForm;
