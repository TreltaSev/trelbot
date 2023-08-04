import os
import re
import sys
# Prevent program from creating __pycache__ dirs
sys.dont_write_bytecode = True
sys.path.append(os.path.abspath(f"{os.getcwd()}/../"))

from shared import db

class ConfigInterperter:

    def __init__(self, config: str):
        self.actions = {
            "background": self._parse_background,
            "pfp": self._parse_pfp,
            "pfp_location": self._parse_pfp,
            "pfp_border_color": self._parse_pfp,
            "pfp_border_width": self._parse_pfp
        }
        self.config = config

        self.pfp: bool = True
        self.pfp_location: list = ["center", "center"]
        self.pfp_border_color: str = "#fff"
        self.pfp_border_width: int = 20


        self.convert()

    def convert(self):
        """Convert banner settings format into a dictionary for easy use"""
        for _section in self.config.split(";"):
            if len(_section.split(":")) == 1:
                continue

            key, value = _section.split(":")
            if self.actions.__contains__(key):
                self.actions.get(key)(key, value)
    
    def _parse_background(self, _, value: str):
        """Parse background as color or image"""
        match = self._match_color(value)
        if match[0] == True:
            self.pfp_border_color = match[1]
        return

    def _parse_pfp(self, _k, value):
        """Parses pfp, pfp_border_color, pfp_location, and pfp_border_width"""
        value: str
        # Check for pfp type
        if _k == "pfp":
            if value.lower() == "false":
                self.pfp = False
            elif value.lower() == "true":
                self.pfp = True
            return

        # Check for pfp location
        if _k == "pfp_location":
            splitted = value.replace(" ", "").replace("[", "").replace("]", "").split(",")
            if len(splitted != 2):
                return            
            self.pfp_location = splitted
            return
        
        # Check for border color
        if _k == "pfp_border_color":
            match = self._match_color(value)
            if match[0] == True:
                self.pfp_border_color = match[1]
            return
        
        # Check for pfp border width
        if _k == "pfp_border_width":
            if value.isnumeric():
                if int(value) > 100:
                    return                
                self.pfp_border_width = int(value)
            return
        
    
    def _match_color(self, _to_match: str):
        """Checks and gets hex value in between color()"""
        match = re.search(r'color\((\#[a-fA-F0-9]{3, 6})\)', _to_match)
        if match:
            return [True, match.group(1)]
        return [False, None]
    
    def _match_image(self, _to_match: str):
        """Checks and gets url value in between image()"""
        match = re.search(r'image\((https?://\S+)\)', _to_match)
        if match:
            return [True, match.group(1)]
        return [False, None]
        

        





    # Other parses
                
ConfigInterperter(db.Settings("0").get()["banner"])
