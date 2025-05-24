import datetime
import traceback
from typing import Any, Callable, Coroutine, Optional, Sequence, TypeVar, Union

from discord.utils import MISSING
from discord.ext.tasks import Loop

from pyucc import console


_func = Callable[..., Coroutine[Any, Any, Any]]
LF = TypeVar('LF', bound=_func)


def loop(
    *,
    seconds: float = MISSING,
    minutes: float = MISSING,
    hours: float = MISSING,
    time: Union[datetime.time, Sequence[datetime.time]] = MISSING,
    count: Optional[int] = None,
    reconnect: bool = True,
    name: Optional[str] = None,
):
    """
    Discord.py loop wrapper with error handling so that loops don't just silently fail

    Parameters
    ------------
    seconds: :class:`float`
        The number of seconds between every iteration.
    minutes: :class:`float`
        The number of minutes between every iteration.
    hours: :class:`float`
        The number of hours between every iteration.
    time: Union[:class:`datetime.time`, Sequence[:class:`datetime.time`]]
        The exact times to run this loop at. Either a non-empty list or a single
        value of :class:`datetime.time` should be passed. Timezones are supported.
        If no timezone is given for the times, it is assumed to represent UTC time.

        This cannot be used in conjunction with the relative time parameters.

        .. note::

            Duplicate times will be ignored, and only run once.


    count: Optional[:class:`int`]
        The number of loops to do, ``None`` if it should be an
        infinite loop.
    reconnect: :class:`bool`
        Whether to handle errors and restart the task
        using an exponential back-off algorithm similar to the
        one used in :meth:`discord.Client.connect`.
    name: Optional[:class:`str`]
        The name to assign to the internal task. By default
        it is assigned a name based off of the callable name
        such as ``discord-ext-tasks: function_name``.


    Raises
    --------
    ValueError
        An invalid value was given.
    TypeError
        The function was not a coroutine, an invalid value for the ``time`` parameter was passed,
        or ``time`` parameter was passed in conjunction with relative time parameters.
    """
    def decorator(func: LF) -> Loop[LF]:

        async def checked_func(*args, **kwargs):
            try:
                return await func(*args, **kwargs)
            except Exception:
                console.fail(f"Task Exception Detected for {name}")
                print(traceback.format_exc())

        return Loop[LF](
            checked_func,
            seconds=seconds,
            minutes=minutes,
            hours=hours,
            count=count,
            time=time,
            reconnect=reconnect,
            name=name
        )
    return decorator
