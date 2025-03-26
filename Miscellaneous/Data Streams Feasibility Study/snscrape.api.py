import snscrape.modules.twitter as sntwitter

query = "AI since:2024-01-01 until:2024-03-20"
tweets = sntwitter.TwitterSearchScraper(query).get_items()
print(tweets)
for i, tweet in enumerate(tweets):
    if i >= 10:  # Limit to 10 tweets
        break
    print(tweet.content)
