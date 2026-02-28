# === Core ===
import yaml
from yaml import FullLoader

from typing import Any, Literal
from pydantic import BaseModel

# === Shared ===
from shared.project import Project
from shared.console import console

class Bot(BaseModel):
    secret: str | None = None
    token: str | None = None
    
class OpenAI(BaseModel):
    token: str | None = None

class Database(BaseModel):
    username: str | None = None
    password: str | None = None
    host: str | None = None
    root: str | None = None
    uri_override: str | None = None    

class Parsed(BaseModel):
    mode: Literal["development", "production"] = "development"
    guilds: list[int] | None = None
    bot: Bot
    openai: OpenAI
    database: Database

class Config:
    
    file = Project.root / "config.yml"
    example_file = Project.root / "config.example.yml"
    
    @property
    def raw(self) -> str:
        """
        Return raw text output of config file
        """
        return self.file.read_text()
    
    @property
    def loaded(self) -> dict[str, Any]:
        """
        Return pyyaml loaded output of config file
        """
        return yaml.load(self.raw, Loader=FullLoader)

    @property
    def parsed(self) -> Parsed:
        """
        Return parsed loaded output of config file
        """
        return Parsed.model_validate(self.loaded)
    
    def __init__(self) -> None:
        pass
        
    def enure(self) -> None:
        """
        Ensures a config.yml file exists, if it doesn't, use `config.example.yml` to create it.
        
        :raises FileNotFound: If the config.example.yml file doesn't exist
        """
        
        console.debug(f"Ensuring config @ {self.file.as_posix()}...")
        
        if not self.example_file.exists():
            raise FileNotFoundError(f"Example config file doesn't exist: {self.example_file.as_posix()}")
        
        if not self.file.exists():
            self.file.write_text(self.example_file.read_text())
        
        console.debug(f"Config Status: [green]LOADED[/]")
        
config = Config()