Start-Process -FilePath "./venv/Scripts/Activate.ps1"
pip install -r ./requirements.txt
Set-Location -Path ./Web
npm i