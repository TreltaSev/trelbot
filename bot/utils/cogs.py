from typing import List, Union

class Cogs:
    
    @classmethod
    def find_all(cls, directory: str, exclusions: Union[List[str], str] = ["__init__.py"]):
        """
        Finds all the relevant cogs within a specified directory and returns
        the paths in dot notation.
        """
        pass