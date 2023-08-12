import io
import os
import requests
from typing import List, Literal
from PIL.ImageFont import FreeTypeFont
from PIL import Image, ImageDraw, ImageOps, ImageFont
from discord import Member, File
from shared import interpreter, db
import traceback

def get_suffix(num: int):
    """ Gets number suffix, th, rd, st"""
    if num % 100 in [11, 12, 13]:
        suffix = "th"
    else:
        suffix = {1: "st", 2: "nd", 3: "rd"}.get(num % 10, "th")
    return f"{num}{suffix}"

class Banner:
    """
    Banner
    ~~~~~~
    Contains methods used for basic creation of images
    """

    def __init__(self, member: Member = None):
        self.member = member
    
    def _construct_image(self, color: str):
        """Constructs a basic image template and saves to self.image"""

        self.image = Image.new("RGBA", (1100, 500),color)     

    
    def _construct_text(self, text: str, font: FreeTypeFont, position: List[int], color = "#fff"):
        """Constructs a basic text compoennt and draws to self.image"""

        ImageDraw.Draw(self.image).text(position, text, color, font)

    
    def _get_file(self, name="image.png") -> File:
        """Gets the image in a file format for discord"""

        byte_array = io.BytesIO()
        self.image.save(byte_array, format="PNG")
        byte_array.seek(0)
        return File(byte_array, filename=name)
    
    
    def _parse_location(self, values: list, size: list) -> list:
        """Parses any location string format"""
        print(values, size)
        # Make sure values make sense
        if len(values) != 2:
            return [0, 0]
        
        # Logic for if bbox has 4 items, x, y, w, h get replace v with [v, h]
        if len(size) == 4:
            size = [size[2], size[3]]
        
        # Logic for formatting "center"
        for i, value in enumerate(values):
            if "center" in value:
                # Get _parts
                _value_parts = value.split("+") if "+" in value else value.split("-")

                # Handle + or -
                if len(_value_parts) == 2 and _value_parts[1].strip().isnumeric():
                    _value_offset = int(_value_parts[1].strip())

                    # Handle - if - is present
                    if "-" in value:
                        _value_offset = -_value_offset

                    # Make sure value isn't negative, if its negative return 0
                    values[i] = max(int((self.image.size[i] - size[i]) / 2) + _value_offset, 0)
                    continue

                values[i] = int((self.image.size[i] - size[i]) / 2)
                continue                

            if value == "center":
                values[i] = int((self.image.size[i] - size[i]) / 2)
                continue
            if not value.isnumeric():
                values[i] = 0
                continue
            values[i] = int(value)
            continue

        return values


class UserBanner(Banner):
    """
    UserBanner
    ~~~~~~~~~~

    Inherits From: Banner

    Specialized methods for applying customized assets to the banner
    """

    def __init__(self, event: Literal["join", "leave"],  member: Member = None):
        super().__init__(member=member)
        self.event = event
        self.config: interpreter.ConfigInterperter = interpreter.ConfigInterperter(db.Settings(str(member.guild.id)).get()["banner"])
        try:
            self._apply_background()
            self._apply_pfp()
            self._apply_message()
            self._apply_secondary_message()
            self._apply_username()
            self._apply_server_count()
        except Exception as e:
            traceback.print_exception(e)       

    def _apply_background(self):
        """Applies a background color as well as constructs the actual image"""
        self._construct_image(color=self.config.background)

    def _apply_pfp(self):
        """Applies a users profile picture by url"""

        if not self.config.pfp:
            return

        # Save pfp to bytes
        rendered_profile_picture = Image.open(io.BytesIO(requests.get(self.member.avatar.url).content)).resize([200, 200]).convert("RGBA")
        
        # Get Center
        position = self._parse_location(self.config.pfp_location, [200, 200])
        print(position)

        # Crop
        cropped_mask = Image.new("L", rendered_profile_picture.size, 0)
        cropped_draw = ImageDraw.Draw(cropped_mask)
        cropped_draw.ellipse((0, 0, 200, 200), fill=255)
        cropped_pfp = ImageOps.fit(rendered_profile_picture, cropped_mask.size)
        cropped_pfp.putalpha(cropped_mask)

        # Paste
        self.image.paste(cropped_pfp, position, cropped_mask)  

        # Add border
        _origional_size = self.image.size
        _mag = 4
        self.image = self.image.resize((_origional_size[0]*_mag, _origional_size[1]*_mag))

        np = [
            (position[0]*_mag) - int((self.config.pfp_border_width * _mag) / 2),
            (position[1]*_mag) - int((self.config.pfp_border_width * _mag) / 2),
            (position[0]*_mag) + int((self.config.pfp_border_width * _mag) / 2) + (200*_mag),
            (position[1]*_mag) + int((self.config.pfp_border_width * _mag) / 2) + (200*_mag)
        ]

        ImageDraw.Draw(self.image).ellipse(np, width=int((self.config.pfp_border_width * _mag)/2) + 5, outline=self.config.pfp_border_color)

        self.image = self.image.resize((_origional_size[0], _origional_size[1]))
    
    def _apply_message(self):
        """Applies a basic welcome/goodbye text centered in the image"""

        if self.event == "join":
            Message = self.config.join_main_text
        else:
            Message = self.config.leave_main_text

        LatoFont = ImageFont.truetype("./resources/lato.ttf", self.config.main_text_size)
        position = self._parse_location(["center", "center"], LatoFont.getbbox(Message))
        position[1] += self.config.main_text_size
        self._construct_text(Message, LatoFont, position)        

    def _apply_secondary_message(self):
        """Applies a secondary message"""

        if self.event == "join":
            Message = self.config.join_sub_text
        else:
            Message = self.config.leave_sub_text

        LatoFont = ImageFont.truetype("./resources/lato.ttf", self.config.sub_text_size)
        position = self._parse_location(["center", "center + 50"], LatoFont.getbbox(Message))
        position[1] += self.config.main_text_size + self.config.sub_text_size
        self._construct_text(Message, LatoFont, position, (255, 255, 255, 128))  
    
    def _apply_username(self):

        if not self.config.display_name:
            return
        
        """Applies the username of a member under the applied message"""
        LatoFont = ImageFont.truetype(f"{os.getcwd()}/resources/lato.ttf", 24)
        position = [10, 10]
        self._construct_text(f"@{self.member.name}", LatoFont, position, "#fff")     

    def _apply_server_count(self):
        """Applies member count of the server"""

        if not self.config.display_member_count:
            return
        
        Message = f"{get_suffix(self.member.guild.member_count)} Member"
        LatoFont = ImageFont.truetype(f"{os.getcwd()}/resources/lato.ttf", 24)
        message_size = LatoFont.getbbox(Message)
        position = [int(self.image.size[0] - message_size[2] - 10), int(self.image.size[1] - message_size[3] - 10)]
        self._construct_text(Message, LatoFont, position, "#fff")
