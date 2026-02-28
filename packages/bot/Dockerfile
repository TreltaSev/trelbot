FROM python:3.13.12
ENV PYTHONDONTWRITEBYTECODE=1

WORKDIR /trelbot

# Install Packages
COPY ./bot/requirements.txt /trelbot/requirements.txt
RUN pip install -r requirements.txt

# Installed Shared Package
COPY ./shared/pyproject.toml /shared/pyproject.toml
COPY ./shared/src /shared/src
RUN pip install -e /shared



# Test command
# CMD [ "sleep", "infinity" ] 
CMD ["python", "/trelbot/bot/src/main.py"]


