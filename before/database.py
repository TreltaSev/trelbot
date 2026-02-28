from shared.config import config
from shared.console import console
from shared.project import project

console.debug("Before: Database")

database_package = project.root / "packages/database"

init_file = database_package / "init.js"
template_file = database_package / "template.init.js"


db_conf = config.parsed.database

if not db_conf.username:
    raise KeyError(f"Database config missing username")

if not db_conf.password:
    raise KeyError(f"Database config missing password")


template_raw = template_file.read_text()
template_raw = template_raw.replace("{username}", db_conf.username)
template_raw = template_raw.replace("{password}", db_conf.password)

init_file.write_text(template_raw)

console.debug("Wrote database init.js file")