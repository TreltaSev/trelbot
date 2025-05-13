# Starts up the discord bot
[working-directory: './']
@bot:
    siblink run ./bot

# Compose the whole project or a specific set of services
[working-directory: './']
dc SERVICE="":
    docker compose up -d --build {{SERVICE}}

# Stops the docker compose
[working-directory: './']
dc-down SERVICE="":
    docker compose down {{SERVICE}}

# Compose only a specific service using a alternative file
[working-directory: './']
dc-alt ALT SERVICE="":
    docker compose -f docker-compose.yml -f docker-compose-{{ALT}}.yml up -d --build {{SERVICE}}

# Builds a specific service with an alt file while also sh into it.
[working-directory: './']
dc-int ALT SERVICE="":
    just dc-alt {{ALT}} {{SERVICE}} 
    docker exec -it {{SERVICE}} sh