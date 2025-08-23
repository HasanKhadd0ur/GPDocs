import pandas as pd
import requests
from bs4 import BeautifulSoup
import re

def extract_coordinates_from_script(url):
    """Extract latitude and longitude from the webpage source code."""

    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
            }
    try:


        response = requests.get(url,headers=headers)

        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Find script tag that contains coordinates
        script_tags = soup.find_all('script')
        for script in script_tags:
            if script.string and "lat=" in script.string and "lng=" in script.string:
                # Use regex to extract latitude and longitude
                lat_match = re.search(r'lat\s*=\s*(-?\d+\.\d+)', script.string)
                lng_match = re.search(r'lng\s*=\s*(-?\d+\.\d+)', script.string)

                if lat_match and lng_match:
                    return float(lat_match.group(1)), float(lng_match.group(1))
        
    except requests.RequestException as e:
        print(f"Error fetching {url}: {e}")
    except Exception as e:
        print(f"Unexpected error: {e}")
    
    return None, None

def update_dataset(file_path):
    df = pd.read_csv(file_path)
    
    if 'Link' not in df.columns:
        print("Dataset must contain a column named 'URL'")
        return
    
    df[['Latitude', 'Longitude']] = df['Link'].apply(lambda url: pd.Series(extract_coordinates_from_script(url)))
    
    updated_file_path = "updated_" + file_path
    df.to_csv(updated_file_path, index=False)
    print(f"Updated dataset saved to {updated_file_path}")

# Example usage
file_path = "liveuamap-2024-12.csv"  # Change this to your actual dataset file name
update_dataset(file_path)
