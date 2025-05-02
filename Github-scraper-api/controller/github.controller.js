import { scrapeGitHubProfile } from "../utils/scraper.js";

export const getGitHubUserDetails = async (req, res) => {
  const { username } = req.params;

  try {
    const profileData = await scrapeGitHubProfile(username);
    res.json(profileData);
  } catch (error) {
    console.error('Scraping failed:', error.message);
    res.status(500).json({
      error: 'Failed to fetch GitHub profile. Make sure the username is valid.',
    });
  }
};
