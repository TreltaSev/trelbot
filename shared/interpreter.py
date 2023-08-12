"""
shared.interpreter
~~~~~~~~~~~~~~~~~~

Contains Config Interpreter
"""
import re
import typing
from shared.core_tools import errors

class ConfigInterperter:
    """Converts a css like string base into a class object in python"""

    def __init__(self, config: str):
        self.actions = {
            "background": self._parse_background,
            "pfp": self._parse_pfp,
            "pfp_location": self._parse_pfp,
            "pfp_border_color": self._parse_pfp,
            "pfp_border_width": self._parse_pfp,
            "join_main_text": self._parse_text,
            "leave_main_text": self._parse_text,
            "main_text_size": self._parse_text_size,
            "join_sub_text": self._parse_text,
            "leave_sub_text": self._parse_text,
            "sub_text_size": self._parse_text_size,
            "display_name": self._parse_display_name,
            "display_member_count": self._parse_display_member_count
        }
        self.config = config

        self.background: str = "#fff"
        self.pfp: bool = True
        self.pfp_location: list = ["center", "50"]
        self.pfp_border_color: str = "#fff"
        self.pfp_border_width: int = 20
        self.join_main_text: str = "Welcome Main Text"
        self.leave_main_text: str = "Leave Main Text"
        self.join_sub_text: str = "Welcome Sub Text"
        self.leave_sub_text: str = "Leave Sub Text"
        self.main_text_size: int = 64
        self.sub_text_size: int = 12
        self.display_name: bool = True
        self.display_member_count: bool = True

        self.parse_errors: list = []

        self.convert(config)

    def convert(self, config: typing.Union[None, str] = None):
        """Convert banner settings format into a dictionary for easy use"""

        if isinstance(config, type(None)):
            config = self.config
        
        for _section in config.split(";"):
            if len(_section.split(":")) == 1:
                continue

            key, value = _section.split(":")
            if self.actions.__contains__(key):
                self.actions.get(key)(key, value)
            else:
                self.parse_errors.append(errors.BannerParseError(key, value, "Key Not Found", f"Check to make sure `{key}` is spelt correctly."))
        
        return self

    def cache_results(self):
        """Convert the parsed settings into a base css format"""
        _copy = dict(vars(self))

        for _to_remove in ["config", "actions"]:
            if _to_remove in _copy:
                del _copy[_to_remove]

        _cache_out = ""

        for _child_key, _child_value in _copy.items():
            _segment_out = ""

            if not isinstance(_child_value, list):
                _segment_out = str(_child_value)

            if isinstance(_child_value, list):
                _segment_out = "[" + ",".join([str(item) for item in _child_value]) + "]"

            _cache_out += f"{_child_key}:{_segment_out};"
    
        return _cache_out
    

    def _parse_background(self, _, value: str):
        """Parse background as color or image"""
        match = self._match_color(value)

        if match[0] == True:
            self.background = match[1]

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
            if len(splitted) != 2:
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
        
    def _parse_text(self, _k, value):
        """Parses main_text and sub_text"""
        value: str
        # Check for main_text
        if len(value) > 256:
            return
        setattr(self, _k, value)
        return
        

        
    def _parse_text_size(self, _k, value):
        """Parses main_text_size and sub_text_size"""
        value: str
        # Check for main_text_size
        if _k == "main_text_size":
            if value.isnumeric() and int(value) < 100:
                self.main_text_size = int(value)

        # Check for sub_text_size
        if _k == "sub_text_size":
            if value.isnumeric() and int(value) < 100:
                self.sub_text_size = int(value)
    
    def _parse_display_name(self, _k, value):
        """Parses display_name"""
        value: str
        # Check for display_name
        if value.lower() == "false":
            self.display_name = False
        elif value.lower() == "true":
            self.display_name = True

    def _parse_display_member_count(self, _, value):
        """Parses display member count"""
        value: str
        # Check for display memeber count
        if value.lower() == "false":
            self.display_member_count = False
        elif value.lower() == "true":
            self.display_member_count = True
    
    def _match_color(self, _to_match: str):
        """Checks and gets hex value in a string"""
        match = re.search(r'^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$', _to_match)
        print(match, _to_match)
        if match:
            return [True, _to_match]
        return [False, None]
    
    def _match_image(self, _to_match: str):
        """Checks and gets url value in between image()"""
        match = re.search(r'image\((https?://\S+)\)', _to_match)
        if match:
            return [True, match.group(1)]
        return [False, None]