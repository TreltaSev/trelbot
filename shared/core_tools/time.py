"""
bot.core_tools.time
~~~~~~~~~~~~~~~~~~~

Basic time methods, setters and getters.
"""

import datetime

def current() -> str:
    """
    A current time getter which should return a specific time which is now
    Time should ne in 12hr:min:sec pm/am
    """
    return datetime.datetime.now().strftime("%I:%M%p")

def absolute() -> str:
    """
    A current time getter which is more specific then time.current()
    Time should be in M/D/Y H/M/S am/pm    
    """
    return datetime.datetime.now().strftime("%m/%d/%Y %I:%M:%S %p")