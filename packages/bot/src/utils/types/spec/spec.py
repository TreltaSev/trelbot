import importlib
from importlib.machinery import ModuleSpec
import importlib.util
from multiprocessing import Value
from types import ModuleType

from pydantic import BaseModel, ConfigDict, Field, computed_field


class SpecBody(BaseModel):
    """
    Spec body for cogs, contains the doc, and key values of a cog    
    """
    
    
    doc: str | None = None
    spec: ModuleSpec | None = None
    module: ModuleType | None = None
    
    model_config = ConfigDict(extra="allow", arbitrary_types_allowed=True)
    
class Spec(BaseModel):
    cog_string: str
    
    model_config = ConfigDict(arbitrary_types_allowed=True)
    
    @computed_field
    @property
    def spec(self) -> ModuleSpec | None:
        """
        Gets the given spec using a cog_string
        """
        return importlib.util.find_spec(self.cog_string)
    
    @computed_field
    @property
    def body(self) -> SpecBody | None:
        """
        Computes the body field using the given spec and cog_string
        """
        
        spec = self.spec
        
        if not spec:
            raise ValueError(f"Couldn't find spec with {self.cog_string}")
        
        if not spec.loader:
            raise ValueError(f"Failed to get loader from spec {self.spec}")
        
        # Load module
        module = importlib.util.module_from_spec(spec)
        
        # Run module
        spec.loader.exec_module(module)
        
        return SpecBody(
            doc=module.__doc__,
            spec=spec,
            module=module
        )
    
    def load(self):
        """
        Attempts to load the spec provided by finding its spec object,
        loading its module, then finally executing it.
        """
        
        # Parse module
        self.parse()
        
        
    def parse(self):
        """
        Parses the module
        If the module has a setup function and it returns a valid cog object
        """
        
        if not self.spec or not self.body:
            raise ValueError(f"Missing spec or body in {self}")

    
    