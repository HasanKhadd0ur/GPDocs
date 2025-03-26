from telethon.sync import TelegramClient

# Replace with your own API credentials
api_id = "21251628"
api_hash = "54b0a60c66aaa82e7b39030be375a088"
channel_username = "freesyria102"  # Example: 't.me/somechannel' (just use 'somechannel')

# Connect to Telegram
client = TelegramClient("session_name", api_id, api_hash)

async def fetch_last_messages(channel, limit=1):
    async with client:
        messages = await client.get_messages(channel, limit=limit)
        for message in messages:
            print(message)
            print(f"[{message.date}] {message.sender_id}: {message.text}")

# Run the script
client.loop.run_until_complete(fetch_last_messages(channel_username, limit=5))
