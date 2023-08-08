"""
server.exts.constants.App
~~~~~~~~~~~~~~~~~~~~~~~~~

Contains a class which inherits from quart.Quart
"""
from typing import Optional
import quart

class App(quart.Quart):

    """|class|

    Inherits from quart.Quart,
    simple class that runs some methods to make organizing easier
    
    """

    def __init__(self, import_name: str, static_url_path: str | None = None, static_folder: str | None = "static", static_host: str | None = None, host_matching: bool = False, subdomain_matching: bool = False, template_folder: str | None = "templates", instance_path: str | None = None, instance_relative_config: bool = False, root_path: str | None = None) -> None:
        super().__init__(import_name, static_url_path, static_folder, static_host, host_matching, subdomain_matching, template_folder, instance_path, instance_relative_config, root_path)
        self.before_serving_funcs.append(self._before_serving)

    def _before_serving(self):
        print("Before Serving")

class BlueprintsManager:
    """|class|

    Blueprints manager that basically copies discords version of cogs, 
    this is basically cogs but for blueprints    
    """

    pass