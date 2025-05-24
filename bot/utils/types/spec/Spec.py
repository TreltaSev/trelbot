import importlib
from importlib.machinery import ModuleSpec
import importlib.util
from types import ModuleType
from typing import Union
from utils.types import Struct


class SpecBody(Struct):
    """
    Spec body for cogs, contains the doc, and key values of a cog.

    Parameters
    ----------
    doc: :class:`str`
        Raw unedited document string, includes the delimiter and actual doc info

    spec: :class:`ModuleSpec` | :class:`None`
        Spec object, given after finding it

    module: :class:`ModuleType`
        Module object, literally the module.

    cog: :class:`str`
        String of the main cog setup function

    """

    def __init__(self, obj=None, *args, **kwargs) -> None:
        # Type Annotation
        self.doc: str
        self.spec: ModuleSpec | None
        self.module: ModuleType
        self.cog: str

        super().__init__(obj, **kwargs)


class Spec(Struct):
    """
    Spec class, pass in a spec string, get its spec, lib, module, documentation,
    and extra args.


    Parameters
    ----------
    spec: :class:`str`
        Spec string, basically a path but replace '/' with '.'
        Im not quite sure what a spec is, just know that its just what
        python needs in order to import modules


    Attributes
    ----------

    body: :class:`SpecBody` | :class:`None`
        Body of the spec, contains the raw unedited document string,
        the string of the main cog setup function, the spec object and the loaded
        module. This is :class:`None` until :meth:`self.load()` is called

    """

    def __init__(self, spec: str, **kwargs):
        # Type Annotation
        self.spec: str = spec
        self.body: SpecBody | None

        super().__init__(**kwargs)

        # Create Defaults
        self.__defaults()

        self.load()
        

    def load(self):
        """
        Attempts to load the spec provided by finding its spec object,
        loading its module, then finally executing it. This makes :self:`self.body` visible.
        """

        # Load Spec Object
        spec = importlib.util.find_spec(self.spec)

        # Load Module
        module = importlib.util.module_from_spec(spec)

        # Run Module
        spec.loader.exec_module(module)

        self.body = SpecBody({
            "doc": module.__doc__,
            "spec": spec,
            "module": module
        })
        
        self.parse_doc(spec)

    def parse_doc(self, spec: Union[str, ModuleSpec, None] = None, doc: str | None = "") -> None:
        """
        Parses the documentation from a given module or doc string.
        If the documentation is found and valid, this function updates
        :self:`self.body`, specifically its doc and other kwargs.

        Parameters
        ----------
        spec: :class:`str` | :class:`ModuleSpec` | :class:`None`
            Spec object, string, or just nothing. This is what will be
            fed through if doc isn't specified but this is.

        doc: :class:`str` | :class:`None`
            Literal string representation of the docstring

        Raises
        ------
        ValueError:
            One or more values given aren't valid or don't exist.
            Missing spec AND doc parameters


        """

        if not spec and not doc:
            raise ValueError(
                "One or more values given aren't valid or don't exist.\nMissing spec AND doc parameters")

        docstring: str | None = None

        if spec:

            # Convert spec to ModuleSpec
            if isinstance(spec, str):
                spec = importlib.util.find_spec(spec)

            # Read Module Spec
            if isinstance(spec, ModuleSpec) and spec.loader is not None:
                module = importlib.util.module_from_spec(spec)
                spec.loader.exec_module(module)
                docstring = module.__doc__

        if docstring is None:
            docstring = doc

        if '---' not in docstring:
            raise ValueError(
                "Docstring must include a config section delimited by '---'")

        _lines = docstring.splitlines()

        start = _lines.index('---') + 1 

        config_lines = _lines[start:]
        _result = {}

        # Go through all config lines
        for line in config_lines:

            # Ignore empty or malformed lines
            if ':' not in line:
                continue
            key, value = line.split(":", 1)
            _result[key.strip().lower()] = value.strip()

        if self.body is None:
            raise RuntimeError("Cannot update, body has not been loaded.")

        self.body.dict.update({
            "_config": _result,
            **_result
        })

    def __defaults(self):
        """
        Sets defaults for :class:`Spec`
        """
        self.dict.setdefault("spec", "")
        self.dict.setdefault("body", None)
