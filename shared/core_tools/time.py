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