@echo off
call ./venv/Scripts/activate.bat
pip install -r requirements.txt
cd ./web
npm i
