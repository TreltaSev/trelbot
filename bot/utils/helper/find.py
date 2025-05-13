from typing import List, Any

def find(collection: List[Any], property: str, match: Any, convert: Any, default: Any = object()) -> Any | None:
    """
    Attempts to locate and return a element from a searchable array

    Parameters
    ----------
    `collection: List[Any]`
        List that will be checked
    `property: str`
        String format of property to be checked
    `match: str`
        Value the collectionElement.property should have
    `convert : Any`
        Class object the element will be turned into.
    `default : Any`
        If specified, if no element is found, this value is returned
    """
    # Locate
    for element in collection:

        # Unsafe conversion
        element = convert(element)
        
        
        # Handle Dict Objects
        if isinstance(element, dict):
            if property not in element:
                raise TypeError(
                    f"Dictionary \"{element}\" is missing property \"{property}\"")
                
            value = element.get(property)
            
            if value == match:
                return element
            continue
        
            
        
        # Check if element has property
        if not hasattr(element, property):
            raise TypeError(
                f"Element \"{element}\" is missing property \"{property}\"")
        
        value = getattr(element, property)

        if value == match:
            return element

    if default == object():
        raise KeyError(f"No Matching Element Found in collection. <property: {property} | match: {match}>")

    return default
