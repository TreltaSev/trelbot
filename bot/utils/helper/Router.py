from utils.exception import RouterException
from typing import Callable

class Router:
    """
    Allows the routing of logic based on "section"

    ## Usage
    ```python
    router: Router = Router()    

    @router.requires("name", str)
    @router.requires("type", str)
    @router.register(section="POST.section.automations")
    def POST_section_automations(name, type):
        print(name, type)
    ```
    """

    def __init__(self):

        self.section = {}
        self.current: str | None = None

    def register(self, section):
        """
        Registers a section in this classes :class:`Router.sections`

        Parameters
        ----------
        `section : str`
            Name of the section, 

        ## Usage
        ```python
        router: Router = Router()

        @router.register(section="foo.section")
        def foo_section():
            print("Hello World")

        section = "foo.section"
        router.run(section, json={})
        ```
        """

        # Check if section already registered
        if section in self.section:
            raise RouterException(
                f"Section \"{section}\" already registered", self)

        def decorator(f: Callable):
            """
            This part needs to register the method into :val:`self.section`
            """

            # Update Function with meta
            f.section = section

            self.section[section] = {
                'func': f,
                'required': []
            }

            self.current = section

            return f

        return decorator

    def require(self, name, type_):
        """
        Saves require data to a specified section

        Parameters
        ----------
        `name : str`
            name of value, will be passed down
        `type_ : any`
            expected type of value

        ## Usage
        ```python

        @router.requires("name", str)
        @router.requires("type", str)
        @router.register(section="POST.section.automations")
        def POST_section_automations(name, type):
            print(name, type)

        ```


        """

        def decorator(f: Callable):

            # Check if section exists
            if not hasattr(f, "section"):
                raise RouterException(
                    f"Func: \"{f.__name__}\" is missing section", self)

            self.section[f.section]["required"].append((name, type_))
            
            return f

        return decorator

    def run(self, section, **kwargs):
        """

        Parameters
        ----------
        `section : str`
            Name of registered logic

        ## Usage
        ```python
        router = Router()

        @router.require("name", str)
        @router.require("other", int)
        @router.register("foo.test")
        def foo(name, other, *args, **kwargs):
            print(name, other)
            return "OK"

        args = {
            "name": "pog",
            "other": 412937
        }

        response = router.run("foo.test", **args)
        >>> response # OK
        ```
        """
        
        # Section check
        if section not in self.section:
            raise RouterException(f"Section \"{section}\" not registered", self)
        
        sectionData: dict = self.section.get(section)
        required = sectionData.get("required")
        
        kwargs_out = dict(kwargs)
        
        for k in required:
            name, type_ = k
            
            if name not in kwargs:
                raise RouterException(f"Missing Required Value \"{name}\"", self)
            
            value = kwargs.get(name)
            
            if not isinstance(value, type_):
                raise RouterException(f"Type MissMatch, \"{name}\" should be of type {type_}, instead is {type(value)}")
            
            kwargs_out[name] = value
            
        # All checks passed
        func = sectionData["func"]
        
        return func(**kwargs_out)        
    
router = Router()