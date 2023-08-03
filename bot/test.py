import io
import os
import requests
from typing import List
from PIL.ImageFont import FreeTypeFont
from PIL import Image, ImageDraw, ImageOps, ImageFont
from discord import Member

class Banner:
    """
    Banner
    ~~~~~~

    Contains methods used for basic creation of images
    """

    def __init__(self, member: Member = None):
        self.member = member
        self._construct_image()

    
    """Constructs a basic image template and saves to self.image"""
    def _construct_image(self):
        self.image = Image.new("RGBA", (1100, 500), "#121218")     

    """Constructs a basic text compoennt and draws to self.image"""
    def _construct_text(self, text: str, font: FreeTypeFont, position: List[int], color: str = "#fff"):
        ImageDraw.Draw(self.image).text(position, text, color, font)

    def show(self):
        self.image.show()
        
    

class UserBanner(Banner):
    """
    UserBanner
    ~~~~~~~~~~

    Inherits From: Banner

    Specialized methods for applying customized assets to the banner
    """

    def __init__(self, member: Member = None):
        super().__init__(member=member)
        self._apply_pfp()
        self._apply_message()

    
    def _apply_pfp(self):
        """Applies a users profile picture by url"""

        # Save pfp to bytes
        rendered_profile_picture = Image.open(io.BytesIO(requests.get(self.member.avatar.url).content)).resize([200, 200]).convert("RGBA")
        
        # Get Center
        position = [int((self.image.size[0] - 200) / 2), int((self.image.size[1] - 200) / 2) - 50]

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
        _bw = 10
        self.image = self.image.resize((_origional_size[0]*_mag, _origional_size[1]*_mag))

        np = [
            (position[0]*_mag) - int((_bw * _mag) / 2),
            (position[1]*_mag) - int((_bw * _mag) / 2),
            (position[0]*_mag) + int((_bw * _mag) / 2) + (200*_mag),
            (position[1]*_mag) + int((_bw * _mag) / 2) + (200*_mag)
        ]
        ImageDraw.Draw(self.image).ellipse(np, width=int((_bw * _mag)/2) + 5, outline="#f00")

        self.image = self.image.resize((_origional_size[0], _origional_size[1]))
             

    
    def _apply_message(self):
        """Applies a basic welcome/goodbye text centered in the image"""
        Message = "Welcome to the sever"
        LatoFont = ImageFont.truetype("./resources/lato.ttf", 40)
        message_size = LatoFont.getbbox(Message)
        position = [int((self.image.size[0] - message_size[2]) / 2), int((self.image.size[1] - message_size[3] + 150)/ 2)]
        self._construct_text(Message, LatoFont, position)        
    
    def _apply_username(self):
        """Applies the username of a member under the applied message"""
        LatoFont = ImageFont.truetype(f"{os.getcwd()}/resources/lato.ttf", 40)
        message_size = LatoFont.getbbox(self.member.name)
        position = [int((self.image.size[0] - message_size[2]) / 2), int((self.image.size[1] - message_size[3] + 150)/ 2)]
        self._construct_text(self.member.name, LatoFont, position)     



UserBanner().show()