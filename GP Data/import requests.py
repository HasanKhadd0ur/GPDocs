import csv
import requests
import time
from random import randint
from bs4 import BeautifulSoup

def get_tweet_text_scrape(tweet_id):
    """Scrape tweet page to get text (fragile method)"""
    url = f"https://twitter.com/i/web/status/{tweet_id}"
    headers = {"User-Agent": "Mozilla/5.0"}
    try:
        r = requests.get(url, headers=headers)
        if r.status_code == 429:
            print("Rate limit hit. Sleeping...")
            time.sleep(randint(1,10))  # Wait 1 minute and return empty
            return "", "rate_limited"
        if r.status_code == 200:
            soup = BeautifulSoup(r.text, "html.parser")
            desc_tag = soup.find("meta", {"property": "og:description"})
            return desc_tag["content"] if desc_tag else "", ""
        return "", "not_found"
    except Exception as e:
        return f"Error: {e}", "error"

def process_tweets_csv(input_csv_path, output_csv_path):
    not_found_count = 0
    rate_limited_count = 0
    error_count = 0

    with open(input_csv_path, newline='', encoding='utf-8') as infile, \
         open(output_csv_path, mode='w', newline='', encoding='utf-8') as outfile:

        reader = csv.DictReader(infile)
        fieldnames = ['tweet_id', 'label', 'text', 'user_url']
        writer = csv.DictWriter(outfile, fieldnames=fieldnames)
        writer.writeheader()

        for row in reader:
            tweet_id = row['\ufeffID']
            tweet_id=tweet_id[1:len(tweet_id)-1]
            label = row.get('Information type', '')

            # Handle oEmbed
            oembed_url = "https://publish.twitter.com/oembed"
            params = {"url": f"https://twitter.com/anyuser/status/{tweet_id}"}

            retries = 0
            success = False
            while retries < 3:
                r = requests.get(oembed_url, params=params)
                if r.status_code == 429:
                    print("Rate limit reached on oEmbed. Waiting...")
                    time.sleep(60 * (retries + 1))  # Exponential backoff
                    retries += 1
                else:
                    success = True
                    break

            if not success or r.status_code != 200:
                user_url = ""
                text = ""
                not_found_count += 1
            else:
                embed_data = r.json()
                user_url = embed_data.get("author_url", "")
                text, status = get_tweet_text_scrape(tweet_id)

                if status == "not_found":
                    not_found_count += 1
                elif status == "rate_limited":
                    rate_limited_count += 1
                elif status == "error":
                    error_count += 1

            writer.writerow({
                "tweet_id": tweet_id,
                "label": label,
                "text": text,
                "user_url": user_url
            })

    print(f"\nFinished writing enriched data to {output_csv_path}")
    print(f"Not found tweets: {not_found_count}")
    print(f"Rate limited tweets: {rate_limited_count}")
    print(f"Errors: {error_count}")

process_tweets_csv(".\\kawarith\Labelled Data\\Beirut_explosion\\Beirut_explosion_L.csv", "output.csv")
