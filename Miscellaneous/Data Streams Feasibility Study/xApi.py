import tweepy

# Authenticate with API keys (from your Twitter Developer account)
client = tweepy.Client(bearer_token="AAAAAAAAAAAAAAAAAAAAANw60AEAAAAA1dYtltEVj%2BfKYQRy0MdNdDeVqvg%3DBdCaeD3I4WUiBq2x6xuinc2M1XFye1uHSXje1tGHDhFMBNOPWM")

# Retrieve recent tweets for a keyword
tweets = client.search_recent_tweets(query="AI", max_results=10)

for tweet in tweets.data:
    print(tweet.text)
