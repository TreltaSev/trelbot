"""
bot.cogs.commands.slash_banner
~~~~~~~~~~~~~~~~~~~~~
Banner Command Testing
"""


import discord
from discord.ext import commands
from exts.constants.cogs import Setup
from shared.core_tools import banner_tools
from shared import db
from exts.constants import client
import traceback
import typing

class slash_banner(commands.GroupCog, name="banner"):

    def __init__(self, client) -> None:
        self.client = client

    @discord.app_commands.command(name="view", description="Basic Banner Testing")
    async def slash_view(self, interaction: discord.Interaction, type: typing.Literal["on_join", "on_leave", "on_ban"] = "on_join"):
        """ /banner view """

        if interaction.user.id not in client.Developers:
            await interaction.response.send_message(content="Nuh uh, not a dev :)", ephemeral=True)
            return
        try:
            await interaction.response.send_message(file=banner_tools.UserBanner(type, interaction.user)._get_file(), ephemeral=True)
        except Exception as e:
            tb = traceback.format_exc()
            print(tb)
        return
    
    
    @discord.app_commands.command(name="edit")
    @discord.app_commands.checks.has_permissions(administrator=True)
    async def slash_edit(self, interaction: discord.Interaction, type: typing.Literal["on_join", "on_leave", "on_ban"], new_settings: str):
        """ /banner edit """

        await interaction.response.send_message(content="Edit")


        try:
            db.Settings(interaction.guild_id)._update_banner(type, new_settings)
        except:
            tb = traceback.format_exc()
            print(tb)


        return
    
    @slash_edit.error
    async def _handle_banner_edit_error(interaction: discord.Interaction, error: discord.app_commands.AppCommandError):
        if isinstance(error, discord.app_commands.MissingPermissions):
            await interaction.response.send_message("Missing Administrator Privilages", ephemeral=True)
            return
        await interaction.response.send_message("Some other error happend...", True)
        raise error

@Setup.basic(slash_banner, "SlashCommand:banner")
async def setup(client: commands.Bot):
    pass
