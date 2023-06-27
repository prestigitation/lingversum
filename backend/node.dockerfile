FROM node:16.0.0-alpine

WORKDIR /usr/backend

COPY package.json .
COPY tsconfig.json .

RUN npm install --quiet

COPY . .