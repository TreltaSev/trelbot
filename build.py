import os
import platform

OperatingSystem: str = platform.system()

try:
    os.system("python -m venv venv")
except Exception as error:
    print("Virtual Enviornment is Already setup.")

if OperatingSystem == "Windows":
    os.system("call ./venv/Scripts/activate")
elif OperatingSystem == "Linux":
    os.system("source ./venv/bin/activate")
else:
    raise Exception(message="OS not supported")

os.system("pip install -r ./requirements.txt")

os.chdir("web")

os.system("npm i")