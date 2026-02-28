from discord.ext import commands
from shared.console import console
from utils.client import Client


class on_command_error(commands.Cog):

    def __init__(self, client: commands.Bot) -> None:
        self.client = client

    @commands.Cog.listener()
    async def on_command_error(self, arg, error):
        console.error(f"ERROR: {arg} {error}")
        console.print_exception()
        
def setup(client: Client) -> commands.Cog:
    return on_command_error(client)