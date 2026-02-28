# ========================================= LOGIC ========================================= #

VENV_DIR := 'venv'

# Create virtual environment
[working-directory: './']
setup-venv:
    python3 -m venv {{VENV_DIR}}
    # Install Deps
    ./{{VENV_DIR}}/bin/pip install -r requirements.txt
    ./{{VENV_DIR}}/bin/pip install ./packages/shared

PIP_BIN := 'venv/bin/pip'

# Run the virtual environment's pip command
[working-directory: './']
pip *ARGS:
    {{PIP_BIN}} {{ARGS}}

# Dump all the pip packages to requirements.txt
[working-directory: './']
pip-dump *ARGS:
    {{PIP_BIN}} freeze | grep -v shared > requirements.txt

# Run the before script to generate all necessary files
[working-directory: './before']
before: setup-venv
    bash before.sh {{justfile_directory()}}

# ========================================= COMMANDS ========================================= #

compose *ARGS: before
    docker compose {{ARGS}}