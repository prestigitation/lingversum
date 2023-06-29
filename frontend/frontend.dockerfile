FROM node:16.10.0-alpine
WORKDIR /usr/frontend

COPY package.json .
COPY tsconfig.json .

RUN npm install -g @vue/cli
RUN npm install --quiet

COPY . .