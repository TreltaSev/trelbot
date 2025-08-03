"""
# On message event
Crazy logic
---
cog: crazy_listener
"""

import random
import discord
from discord.ext import commands

class crazy_listener(commands.Cog):

    def __init__(self, client: commands.Bot) -> None:
        self.client = client
        self.crazy_count = 0

    @commands.Cog.listener()
    async def on_message(self, message: discord.Message):
        
        # Stop if the user isn't a bot...
        if message.author.bot:
            return
        
        dialog = "Crazy? I was crazy once, they locked me in a room, a rubber room, a rubber room with rats. The rats made me crazy. "
        
        crazy_message = dialog * int(2000 / len(dialog))
        crazy_message = crazy_message[:2000]
                
        if any(word in message.content.lower() for word in ["crazy", "crazier", "craziness", "crazed"]):
            
            self.crazy_count += 1
                            
            threshold = 5
            chance = 0.3 # 30% chance to respond when threshold is met
                        
            if self.crazy_count >= threshold and random.random() < chance:
                print("send")
                await message.reply(content=crazy_message)
                self.crazy_count = 0  # Reset counter after responding
        