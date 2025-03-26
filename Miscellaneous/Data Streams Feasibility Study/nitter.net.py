# # # import requests
# # # from bs4 import BeautifulSoup

# # # url ="https://nitter.net/search?f=tweets&q=syria&since=&until=&near="
# # # headers = {"User-Agent": "Mozilla/5.0"}
# # # response = requests.get(url)
# # # soup = BeautifulSoup(response.text, "html.parser")

# # # print(soup.contents)

# # # for tweet in soup.find_all("div", class_="tweet-content"):
# # #     print(tweet.text.strip())
# # #     print(tweet)


# # import requests
# # from bs4 import BeautifulSoup

# # NITTER_URL = "https://nitter.net/search?f=tweets&q=x"  # Try a different instance if needed
# # username = ""
# # url = f"{NITTER_URL}/{username}"

# # headers = {
# #     "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
# # }

# # response = requests.get(url, headers=headers)

# # if response.status_code != 200:
# #     print(f"Failed to fetch page, status code: {response.status_code}")
# # else:
# #     print(response.text)
# #     soup = BeautifulSoup(response.text, "html.parser")
    
# #     # DEBUG: Print the HTML content
# #     with open("nitter_debug.html", "w", encoding="utf-8") as file:
# #         file.write(soup.prettify())
    
# #     print("Saved page content to nitter_debug.html - Open it and check!")

# #     # Find tweets
# #     tweets = soup.find_all("div", class_="main-tweet")

# #     if not tweets:
# #         print("No tweets found. The HTML structure might have changed.")
# #     else:
# #         for tweet in tweets[:5]:
# #             tweet_text = tweet.find("div", class_="tweet-content")
# #             if tweet_text:
# #                 print(tweet_text.text.strip())
# #             else:
# #                 print("Tweet structure changed, check HTML.")

# from pprint import pprint

# import nitter_scraper
# from nitter_scraper import NitterScraper

# users = ["dgnsrekt"]

# print("Scraping with local nitter docker instance.")

# with NitterScraper(host="0.0.0.0", port=8008) as nitter:
#     for user in users:
#         for tweet in nitter.get_tweets(user, pages=2):
#             print()
#             pprint(tweet.dict())
#             print(tweet.json(indent=4))


# print("Scraping from https://www.nitter.net.")

# for user in users:
#     for tweet in nitter_scraper.get_tweets(user, pages=2):
#         print()
#         pprint(tweet.dict())
#         print(tweet.json(indent=4))
import requests

# Define a working Nitter instance (check: https://github.com/zedeus/nitter/wiki/Instances)
NITTER_INSTANCE = "https://nitter.net/search?f=tweets&q=damascus"
USERNAME = ""  # Change to any Twitter username

# Construct the Nitter URL for the user’s tweets
url = f"{NITTER_INSTANCE}/{USERNAME}"

# Send the GET request
try:
    response = requests.get(url, headers={"User-Agent": "Mozilla/5.0"}, timeout=10)
    response.raise_for_status()  # Raise an error for HTTP failures (4xx, 5xx)
    print(response.connection)
    print("Response Status Code:", response.status_code)
    print("Response Content (First 500 chars):")
    print(response.text[:500])  # Print the first 500 characters of the response HTML

except requests.exceptions.RequestException as e:
    print("Request failed:", e)
