from utils.helper import find
from typing import Any

class Struct:
    """
    Converts a nested dictionary object into a discoverable object
    Example:
    ```python
    j: dict = {"a": "b", "c": {"d": "e"}}
    j_struct = Struct(**j)
    print(j_struct.c.d) # "e"
    ```
    """

    def __init__(self, obj=None, **kwargs) -> None:

        if obj:
            if isinstance(obj, Struct):
                obj = obj.dict

            self.__dict__.update(obj)
        else:
            self.__dict__.update(**kwargs)

    @property
    def dict(self):
        return self.__dict__

    @property
    def unwrap(self):
        """
        Converts the top level structure with
        """
        result = {}
        for key, value in self.dict.items():
            if isinstance(value, Struct):
                result[key] = value.unwrap
            elif isinstance(value, list):
                result[key] = [
                    item.unwrap if isinstance(item, Struct) else item for item in value
                ]
            else:
                result[key] = value
        return result
    
