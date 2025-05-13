from typing import List, Dict, Any

def filter(data: Dict[str, Any], keys: List[str]) -> Dict[str, Any]:
    """
    Filters a dictionary to include only the specified keys.
    
    :param data: The dictionary to filter.
    :typeof data: Dict[str, Any]
    :param keys: A list of keys to retain in the filtered dictionary.
    :typeof keys: List[str]
    
    :return: A new dictionary containing only the specified keys.
    :rtype: Dict[str, Any]
    """
    
    # Result placeholder
    filtered: Dict[str, Any] = {}
    
    # Iterate through the list of keys
    for key in keys:
        if key in data:
            filtered[key] = data[key]
    
    return filtered
