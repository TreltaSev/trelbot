from utils.types import Struct
from utils.exception import RequirementUnfulfilledError
from typing import List, Any

def requires(obj: dict | Any, required: List[str]):
    """
    Checks if a given `obj` has the items in `required`
    
    
    :param obj: Object that will be checked
    :typeof obj: dict | Struct | any
    :param required: List of required keys that will be checked
    :typeof required: List[str]    
    
    :raises RequirementUnfulfilledError: If not passed.
    """
    
    # Missing Placeholder
    missing: List[str] = []
    
    # Convert dict to object
    if isinstance(obj, dict):
        obj = Struct(**obj)
    
    for required_item in required:
        if not hasattr(obj, required_item):
            missing.append(required_item)
    
    if missing:
        raise RequirementUnfulfilledError(missing=missing)
     
    
