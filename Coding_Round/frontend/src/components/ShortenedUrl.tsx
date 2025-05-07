import React from 'react';
import './ShortenedUrl.css'; // We’ll create this CSS file for custom styling

interface ShortenedUrlProps {
  shortUrl: string;
  longUrl?: string; 
  hitCount?: number; 
}

const ShortenedUrl: React.FC<ShortenedUrlProps> = ({ shortUrl, longUrl , hitCount}) => {
  return (
    <div className="shortened-url-container">
      <div className="url-column">
        <span className="label">Long URL:</span>
        <span className="value">{longUrl}</span>
      </div>
      <div className="url-column">
        <span className="label">Short URL:</span>
        <a className="value" href={shortUrl} target="_blank" rel="noopener noreferrer">
          {shortUrl}
        </a>
      </div>
      <div className="url-column">
        <span className="label">Hit Count</span>
        <p className="value">{hitCount ?? 0}</p>
      </div>
    </div>
  );
};

export default ShortenedUrl;
