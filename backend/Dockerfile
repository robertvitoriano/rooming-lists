FROM node:20-slim

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY .env.example ./.env

COPY . .

RUN npm install
RUN npm run build

CMD npm run migration:run && npm run start


