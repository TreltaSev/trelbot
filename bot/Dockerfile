FROM python:3.13-slim

# Env labels to make pipx work properly
ENV PIPX_HOME=/root/.local/pipx \
    PIPX_BIN_DIR=/root/.local/bin \
    PATH=/root/.local/bin:$PATH

# Installing pipx and git and ensure path is set properly
RUN apt-get update && apt-get install -y --no-install-recommends \
        curl ca-certificates gcc git \
    && pip install pipx \
    && pipx ensurepath \
    && pipx install httpie \
    && apt-get purge -y --auto-remove gcc \
    && rm -rf /var/lib/apt/lists/*

# Install Siblink
RUN git clone https://github.com/TreltaSev/siblink.git && \
    cd ./siblink && \
    pipx install . && \
    cd ../ && \
    rm -rf ./siblink

# Set PATH to use the siblink command
ENV PATH="${PATH}:/root/.local/bin"

WORKDIR /trelbot

COPY ./requirements.txt /trelbot/requirements.txt

RUN pip install -r requirements.txt

# Now copy the rest of bot
WORKDIR /trelbot/bot
COPY ./bot .

# Go back to /trelbot
WORKDIR /trelbot

# Test command
CMD ["sleep", "infinity"]


