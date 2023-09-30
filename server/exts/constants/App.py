"""
server.exts.constants.App
~~~~~~~~~~~~~~~~~~~~~~~~~

Contains a class which inherits from quart.Quart
"""
import importlib.machinery
import importlib.util
import os
import secrets
import typing
from typing import Optional

import quart
from pyucc import colors, console, symbols

from shared.core_tools import errors


@console.register("quart")
def _(*values, **optional):
  console.cprint(f"{colors.chex('#f1aa00', 'background')} QUART {symbols.reset} {colors.chex('#aaaaaa')}{optional.get('time')}{symbols.reset}", *values)


class App(quart.Quart):

  """|class|

  Inherits from quart.Quart,
  simple class that runs some methods to make organizing easier

  """

  def __init__(self, import_name: str, static_url_path: str | None = None, static_folder: str | None = "static", static_host: str | None = None, host_matching: bool = False, subdomain_matching: bool = False, template_folder: str | None = "templates", instance_path: str | None = None, instance_relative_config: bool = False, root_path: str | None = None) -> None:
    super().__init__(import_name, static_url_path, static_folder, static_host, host_matching, subdomain_matching, template_folder, instance_path, instance_relative_config, root_path)
    self.before_serving_funcs.append(self._before_serving)

  def _before_serving(self):
    console.quart("Before Serving")


class BlueprintsManager:
  """|class|

  Blueprints manager that basically copies discords version of cogs, 
  this is basically cogs but for blueprints    
  """

  extenders: dict = {}

  app: quart.Quart

  @classmethod
  def apply_app(cls, app):
    """Saves app for later usage"""
    cls.app = app

  @classmethod
  def find_all(cls, directory: str, extension: str = ".py", exclusions: typing.Union[typing.List[str], str] = ["__init__.py"]) -> list:
    """
    finds all available blueprints within a directory

    Arguments
    ~~~~~~~~~~~~~~~~~~

    `REQUIRED` directory : str 
        Location to surf for files

    `REQUIRED` extension : str
        Ending of a file to be considered a blueprint

    `OPTIONAL` exculsions : list 
        A list containing a list of exculsions to pass, set to ["__init__.py"] as default

    """

    if isinstance(exclusions, str):
      exclusions = [exclusions]

    file_locations = []
    for root, _, files in os.walk(directory):
      for file in files:
        file: str

        if not isinstance(file, str):
          continue

        if not file.endswith(extension) or file in exclusions:
          continue

        file_locations.append(os.path.relpath(os.path.join(root, file), os.getcwd()).replace("\\", ".").replace(extension, "").replace("/", "."))
    return file_locations

  @classmethod
  def _resolve_name(cls, name: str, package: typing.Optional[str]) -> typing.Union[str, None]:
    """Resolves the name of a package, private."""
    try:
      return importlib.util.resolve_name(name, package)
    except ImportError:
      return None

  @classmethod
  def load_from_spec(cls, spec: importlib.machinery.ModuleSpec, key: str) -> None:
    """
    Loads a blueprint from importlib.machinery.ModuleSpec
    """

    lib = importlib.util.module_from_spec(spec)

    try:
      spec.loader.exec_module(lib)
    except Exception as error:
      raise errors.BaseBlueprintException(error, name=key)
    if hasattr(lib, "config"):
      if getattr(lib, "config")["ignore"]:
        return

    if not hasattr(lib, "blueprint"):
      raise errors.BlueprintHasNoBlueprintVariable(key)

    _pulled_blueprint = getattr(lib, "blueprint")

    if not isinstance(_pulled_blueprint, quart.Blueprint):
      raise errors.BlueprintHasWrongBlueprintType(key)

    cls.app.register_blueprint(_pulled_blueprint)

    cls.extenders[key] = lib

  @classmethod
  def load(cls, name: str, *, package: typing.Optional[str] = None) -> typing.Union[bool, None]:
    """|method|

    Loads a blueprint.

    A blueprint can be loaded with this method, a function within the blueprint should be visible,
    the "setup" method.

    """

    name = cls._resolve_name(name, package)
    if name in cls.extenders:
      raise errors.BlueprintAlreadyLoadedException(name)

    spec = importlib.util.find_spec(name)
    if spec is None:
      return None

    cls.load_from_spec(spec, name)
    return True
