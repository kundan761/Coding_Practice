import puppeteer from 'puppeteer';

export const scrapeGitHubProfile = async (username) => {
  const url = `https://github.com/${username}`;
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Wait for the main profile elements to load
    await page.waitForSelector('h1.vcard-names', { timeout: 5000 }).catch(() => {});

    const data = await page.evaluate(() => {
      const getText = (selector) =>
        document.querySelector(selector)?.innerText.trim() || null;

      const name = getText('span.p-name.vcard-fullname');
      const username = getText('span.p-nickname.vcard-username');
      const bio = getText('div.p-note.user-profile-bio');

      const followers = parseInt(getText('a[href$="?tab=followers"] .text-bold')?.replace(',', '') || 0);
      const following = parseInt(getText('a[href$="?tab=following"] .text-bold')?.replace(',', '') || 0);
      const repositories = parseInt(getText('a[href$="?tab=repositories"] .Counter')?.replace(',', '') || 0);

      return { name, username, bio, repositories, followers, following };
    });

    // Navigate to the repositories tab to get top repositories
    const repoUrl = `${url}?tab=repositories`;
    await page.goto(repoUrl, { waitUntil: 'networkidle2' });

    const repos = await page.evaluate(() => {
      const repos = [];
      document.querySelectorAll('li[itemprop="owns"]')?.forEach((repoItem) => {
        const name = repoItem.querySelector('a[itemprop="name codeRepository"]')?.innerText.trim();
        const starsText = repoItem.querySelector('a[href$="/stargazers"]')?.innerText.trim() || '0';
        const stars = parseInt(starsText.replace(',', '') || 0);
        if (name) repos.push({ name, stars });
      });

      return repos
        .sort((a, b) => b.stars - a.stars)
        .slice(0, 3);
    });

    await browser.close();

    return {
      ...data,
      top_repositories: repos,
    };

  } catch (error) {
    await browser.close();
    throw error;
  }
};
