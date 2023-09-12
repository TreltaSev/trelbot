import re
from . import time

class colors:
    cvRed = "<38;2;214;71;60}"
    cvOrange = "<38;2;244;117;0}"
    cvBlue = "<38;2;0;175;244}"
    cvlRed = "<38;2;244;108;99}"
    cvlOrange = "<38;2;246;145;51}"
    cvlBlue = "<38;2;51;191;246}"
    cvlPurple = "<38;2;246;100;246}"
    cvlGreen = "<38;2;50;200;50}"

class console:
    """
    Uses ansi escape codes to form a message with colors
    put your ansi cods in <code} if format string is present use <code}}

    Arugments
    ~~~~~~~~~
    `REQUIRED` input_str : str
        The input string to be used

    `Example`:
        ```
        bcolors("<94}This is amazing text <92} Yes it is!").send()
        # Creates text with purple "This is amazing text" and green "Yes it is!"
        ```
    """

    @staticmethod
    def _parse(input_str) -> str:
        input_str += "<0;38;48}"
        regex = r"\<([^}]*)\}"
        pattern = re.compile(regex)
        match = pattern.search(input_str)
        while match:
            groups = match.groups()
            match_str = groups[0]
            input_str = input_str.replace("<"+match_str+"}", "\u001B["+match_str+"m")
            match = pattern.search(input_str)            
        return input_str

    def info(input_str: str):      
        print(console._parse(f"<48;2;130;75;240}} INFO <0;38;48}} <38;2;10;10;10}}{time.absolute()}<0;38;48}} {input_str}"))

    def fail(input_str: str):
        print(console._parse(f"<48;2;255;113;113}} FAIL <0;38;48}} <38;2;10;10;10}}{time.absolute()}<0;38;48}} {input_str}"))
