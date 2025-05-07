import React, { useEffect, useState } from 'react';
import UrlForm from '../components/UrlForm.tsx';
import ShortenedUrl from '../components/ShortenedUrl.tsx';
import type { UrlData } from '../services/urlService.tsx';
import axios from 'axios';

const Home: React.FC = () => {
  const [shortUrlData, setShortUrlData] = useState<UrlData | null>(null);
  const [urlList, setUrlList] = useState<UrlData[]>([]);

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const res = await axios.get<UrlData[]>('http://localhost:5000/api/url/getAllUrls');
        // console.log('Fetched URLs:', res.data); // Debugging line
        setUrlList(res.data);
      } catch (err) {
        console.error('Failed to fetch all URLs', err);
      }
    };

    fetchUrls();
  }, [shortUrlData]); 

  console.log(shortUrlData)

  return (
    <div className="home-container">
      <h1>URL Shortener</h1>
      <UrlForm setShortUrlData={setShortUrlData} />      
      <h2>All Shortened URLs</h2>
      {urlList.map((url) => (
        <ShortenedUrl
          key={url._id}
          shortUrl={url.shortUrl}
          longUrl={url.longUrl}
          hitCount={url.hitCount}
        />
      ))}
    </div>
  );
};

export default Home;
