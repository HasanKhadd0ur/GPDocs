import requests
import chardet
from bs4 import BeautifulSoup
import csv
import html
from datetime import datetime, timedelta

# Function to generate a list of dates within the specified range
def generate_date_range(start_date, end_date):
    start = datetime.strptime(start_date, "%d.%m.%Y")
    end = datetime.strptime(end_date, "%d.%m.%Y")
    return [(start + timedelta(days=i)).strftime("%d.%m.%Y") for i in range((end - start).days + 1)]

# Function to scrape data for a given date
def scrape_liveuamap(date):
    url = f"https://syria.liveuamap.com/ar/time/{date}"
    headers = {"User-Agent": "Mozilla/5.0"}

    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()

        # Detect and apply the correct encoding
        detected_encoding = chardet.detect(response.content)['encoding']
        response.encoding = detected_encoding if detected_encoding else "utf-8"

        soup = BeautifulSoup(response.text, "html.parser")
        posts = soup.find_all("div", class_="event")
        data = []

        for post in posts:
            title_element = post.find("div", class_="title")
            title = html.unescape(title_element.text.strip()) if title_element else "N/A"

            link = post.get("data-link", "N/A")
            post_id = post.get("data-id", "N/A")

            date_element = post.find("span", class_="date_add")
            date_text = html.unescape(date_element.text.strip()) if date_element else date  # Use requested date if missing

            data.append([date, title, link, post_id, date_text])

        return data

    except requests.RequestException as e:
        print(f"⚠️ Error fetching data for {date}: {e}")
        return []

# User-specified date range
start_date = "01.12.2024"  # Change this as needed
end_date = "31.12.2024"

# Generate all dates in the range
dates = generate_date_range(start_date, end_date)

# Prepare CSV file
csv_filename = "liveuamap_data_range.csv"
with open(csv_filename, "w", newline="", encoding="utf-8") as csvfile:
    writer = csv.writer(csvfile)
    writer.writerow(["Date", "Title", "Link", "Post ID", "Posted Date"])

    # Scrape data for each date
    for date in dates:
        print(f"📅 Fetching data for {date}...")
        data = scrape_liveuamap(date)
        writer.writerows(data)

print(f"\n✅ Data successfully saved to {csv_filename}")
