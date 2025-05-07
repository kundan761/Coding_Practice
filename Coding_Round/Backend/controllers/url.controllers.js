import generateShortId from "../utils/generateShortId.js";
import Url from "../models/url.models.js";
const createShortUrl = async (req, res) => {
    const { longUrl } = req.body;
  
    if (!longUrl) {
      return res.status(400).json({ message: 'Long URL is required' });
    }
  
    try {
      // Check if URL already exists
      let existing = await Url.findOne({ longUrl });
      if (existing) {
        return res.json(existing);
      }
  
      let shortCode;
      let shortUrlExists = true;
  
      // Ensure unique short code
      while (shortUrlExists) {
        shortCode = generateShortId();
        const urlWithCode = await Url.findOne({ shortCode });
        if (!urlWithCode) {
          shortUrlExists = false; // No existing URL with this shortCode
        }
      }
  
      const baseUrl = "http://localhost:5000/api/url";
      const shortUrl = `${baseUrl}/${shortCode}`;
  
      const newUrl = await Url.create({
        longUrl,
        shortCode,
        shortUrl,
      });
  
      res.status(201).json(newUrl);
    } catch (err) {
      res.status(500).json({ message: 'Server Error', error: err.message });
    }
  };
  
  // GET /:shortCode
  const redirectToLongUrl = async (req, res) => {
    const { shortCode } = req.params;
  
    try {
      const url = await Url.findOne({ shortCode });
      if (!url) {
        return res.status(404).json({ message: 'Short URL not found' });
      }
      console.log(url);
      if (url) {
        url.hitCount += 1;
        await url.save();
        // Redirect the user to the long URL
        return res.redirect(url.longUrl);  // Correct the redirect target to `longUrl`
      } else {
        return res.status(404).json({ message: 'Short URL not found' });
      }
    } catch (err) {
      res.status(500).json({ message: 'Server Error', error: err.message });
    }
  };
  
  const getAllUrls = async (req, res) => {
    try {
      const urls = await Url.find();
      // console.log("Fetched URLs:", urls);
      res.status(200).json(urls);
    } catch (err) {
      console.error('Fetch error:', err);
      res.status(500).json({ message: 'Server Error', error: err.message });
    }
  };
  
    

  export { createShortUrl, redirectToLongUrl ,getAllUrls};