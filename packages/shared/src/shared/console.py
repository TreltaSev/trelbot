import sys
import inspect
from typing import Any, Callable, List
from functools import wraps

from pathlib import Path
from datetime import datetime
from rich.console import Console as RichConsole

class Stream:
    def __init__(self, *streams):
        self.streams = streams

    def write(self, data):
        for s in self.streams:
            s.write(data)
            s.flush()

    def flush(self):
        for s in self.streams:
            s.flush()

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.flush()

    def isatty(self):
        return False


rich_log = RichConsole().log


class Console:
    """
    Console object, used to log server events, debug statements, and error handling all in one.
    """
    
    logs_exist: bool = Path("/logs").exists()

    def __init__(self) -> None:
        # Path object of the server.log file
        file = None
        self.stream = None
        
        if self.logs_exist:
            file = Path("/logs") / "./server.log"
            self.stream = Stream(sys.stdout, file.open(mode="a+"))

        # Private console object
        self.__console = RichConsole(width=120, file=self.stream, force_terminal=True, log_path=False) # type: ignore
        self.clear = self.__console.clear
        self.print_exception = self.__console.print_exception

    @staticmethod
    def __prepend(*args, **kwargs):
        """

        Decorator used to easily prepend pieces of data through to the console.

        Usage
        -----

        ```python
        def get_const():
            return "hello"

        @prepend(get_const, "testing")
        def foo(*args):
            return args

        foo("yup")
        >>>> hello testing yup
        ```
        """

        def decorator(f: Callable):

            def wrapper(self, *f_args, **f_kwargs):

                # Empty Array
                buffer: List[Any] = []

                # Iterate and possibly unpackage arguments
                for argument in args:

                    # Is callable, should get returned value
                    if isinstance(argument, Callable):
                        _signature = inspect.signature(argument)

                        if len(_signature.parameters) == 0:
                            buffer.append(argument())
                            continue

                        buffer.append(argument(*args, **kwargs))
                        continue

                    # No special conditions passed
                    buffer.append(argument)

                # Repackage function arguments
                f_args = buffer + list(f_args)
                return f(self, *f_args, **f_kwargs)
            return wrapper
        return decorator

    def __append(*args, **kwargs):
        """
        Decorator used to append extra data to the end of a function's arguments before calling it.

        Usage
        -----

        ```python
        def get_const():
            return "world"

        @append("hello", get_const)
        def greet(*args):
            print(*args)

        greet("and")
        >>>> and hello world
        ```

        :param args: Static values or callables to evaluate and append to the argument list
        :param kwargs: Optional keyword arguments passed to callables (if needed)
        :return: A decorated function with modified argument list
        """
        def decorator(f: Callable):
            def wrapper(self, *f_args, **f_kwargs):

                # Empty Array
                buffer: List[Any] = []

                # Iterate and possibly unpackage arguments
                for argument in args:

                    # Is callable, should get a returned value
                    if isinstance(argument, Callable):
                        _signature = inspect.signature(argument)

                        if len(_signature.parameters) == 0:
                            buffer.append(argument())
                            continue

                        buffer.append(argument(*args, **kwargs))
                        continue

                    # No special conditions passed
                    buffer.append(argument)

                # Repackage function arguments
                f_args = list(f_args) + buffer
                return f(self, *f_args, **f_kwargs)
            return wrapper
        return decorator

    @staticmethod
    def __create_file(path: Path) -> None:
        """
        Just creates an empty File, nothing too advanced happening here.
        :arg path: :class:`pathlib.Path`: Path Object
        """
        with path.open(mode="w") as _:
            return

    @classmethod
    def __rotate_if_too_large(cls, max_bytes: int = 2.56 * 1024**2):
        """
        Rotates the server log file if the server.log becomes too big.

        :param int max_bytes: Size in bytes of the server.log file before its flushed
        """

        _time_extra: str = datetime.now().strftime("%m-%d-%Y--%H-%M-%S")

        _serverlog: Path = Path("/logs") / 'server.log'
        _logdir: Path = Path("/logs") / '.log/'

        if not _logdir.exists():
            _logdir.mkdir(exist_ok=True)

        if not _serverlog.exists():
            cls.__create_file(_serverlog)

        if _serverlog.stat().st_size >= max_bytes:
            _flush_path: Path = _logdir / _time_extra

            # Ensure flush file exists
            if not _flush_path.exists():
                cls.__create_file(_flush_path)

            _flush_path.write_text(_serverlog.read_text(), newline="\n")
            _serverlog.write_text("")  # Flush

    @staticmethod
    def __print(_: Callable):
        """
        Simply prints out *args through the rich text handler and rotates log files if needed.
        """

        @wraps(rich_log)
        def decorator(self, *args, **kwargs):
            self.__console.log(*args, **kwargs)
            
            if Console.logs_exist:
                self.__rotate_if_too_large()

        return decorator

    @staticmethod
    def __make_tag(tag: str, style: str = "spring_green1", pad: int = 3):
        """
        Makes a tag so the source isn't too ugly. A tag is like DBG, ERR, INF, etc
        """
        return lambda: f"[{style}]{tag:<{pad}}[/{style}]"

    @staticmethod
    def __get_caller():

        def get_file_and_line():
            for frame in inspect.stack():
                if "console.py" not in frame.filename:
                    parent: str = Path(frame.filename).parent.name
                    filename = Path(frame.filename).stem
                    lineno = frame.lineno
                    return f"[dim]{parent}/{filename}:{lineno}[/dim]"
            return "[dim]unknown:0[/dim]"
        
        def with_padding():
            return f"{get_file_and_line():<30}"

        return lambda: f"{with_padding()}"

    @__prepend(__make_tag("DBG", "spring_green1"), __get_caller())
    @__print
    def debug(self, *_) -> None:
        pass

    @__prepend(__make_tag("LOG", "deep_sky_blue2"), __get_caller())
    @__print
    def log(self, *_) -> None:
        pass

    @__prepend(__make_tag("IFO", "purple3"), __get_caller())
    @__print
    def info(self, *_) -> None:
        pass

    @__prepend(__make_tag("WRN", "dark_orange3"), __get_caller())
    @__print
    def warn(self, *_) -> None:
        pass

    @__prepend(__make_tag("ERR", "red3"), __get_caller())
    @__print
    def error(self, *_, **__) -> None:
        pass
    
    def print(self, *args, **kwargs) -> None:
        """
        Wrapper for console print
        """
        return self.__console.print(*args, **kwargs)


console = Console()
