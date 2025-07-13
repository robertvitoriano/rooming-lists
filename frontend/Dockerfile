FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY .env.example ./.env
COPY . .

CMD ["npm", "run", "dev"]
