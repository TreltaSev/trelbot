import os
from pathlib import Path


class Project:
    root = Path(os.environ["PROJECT_ROOT"])
    
project = Project()