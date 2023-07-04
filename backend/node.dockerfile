FROM node:16.10.0

WORKDIR /usr/backend

COPY package.json .
COPY tsconfig.json .
COPY resources dist/resources
RUN npm install --quiet

COPY . .