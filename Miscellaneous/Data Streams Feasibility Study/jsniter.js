const axios = require("axios");
const cheerio = require("cheerio");

// Define a working Nitter instance
const NITTER_INSTANCE = "https://nitter.net";
const USERNAME = "elonmusk";  // Change this to any username

// Construct the URL
const url = `${NITTER_INSTANCE}/${USERNAME}`;

async function fetchTweets() {
    try {
        const { data } = await axios.get(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
            }
        });

        const $ = cheerio.load(data);
        let tweets = [];

        // Scraping tweets from Nitter
        $(".timeline-item").each((i, el) => {
            const text = $(el).find(".tweet-content").text().trim();
            const date = $(el).find("a.tweet-date").attr("title");

            tweets.push({ text, date });
        });

        console.log("Scraped Tweets:", tweets);
    } catch (error) {
        console.error("Error fetching tweets:", error.message);
    }
}

// Run the scraper
fetchTweets();
