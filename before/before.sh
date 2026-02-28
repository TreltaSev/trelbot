#!/bin/bash
set -e

# Setup python bin path
export PROJECT_ROOT=$1

PYTHON_BIN=$1/venv/bin/python

# # Generate config file
python ./config.py

# # Ensure the database runs seamlessly
python ./database.py