FROM node:18-bookworm-slim

COPY package.json .
COPY package-lock.json .

RUN npm install
# RUN npm run build

COPY . .

CMD ["npm", "run", "db:seed", "&&", "npm", "test"]