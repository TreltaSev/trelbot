"""
bot.cogs.commands.slash_banner
~~~~~~~~~~~~~~~~~~~~~
Banner Command Testing
"""


import discord
from discord.ext import commands
from exts.constants.cogs import Setup
from shared.core_tools import banner_tools
from exts.constants import client

class slash_banner(commands.Cog):

    def __init__(self, client) -> None:
        self.client = client

    @discord.app_commands.command(name="banner", description="Basic Banner Testing")
    async def slash_banner(self, interaction: discord.Interaction):

        if interaction.user.id not in client.Developers:
            await interaction.response.send_message(content="Nuh uh, not a dev :)", ephemeral=True)
            return
        
        await interaction.response.send_message(file=banner_tools.UserBanner("join", interaction.user)._get_file(), ephemeral=True)
        return

@Setup.basic(slash_banner, "SlashCommand:banner")
async def setup(client: commands.Bot):
    pass
