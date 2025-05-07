import axios from "axios";
export interface UrlData {
  _id: string;
  longUrl: string;
  shortUrl: string;
  hitCount: number;
}

const apiUrl = "http://localhost:5000/api/url";

export const createShortUrl = async (longUrl: string): Promise<UrlData> => {
  const response = await axios.post(`${apiUrl}/shorten`, { longUrl });
  return response.data;
};
