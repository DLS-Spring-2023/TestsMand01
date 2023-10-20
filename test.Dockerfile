FROM node:18-bookworm-slim

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

# RUN npm run lint
RUN npm test