FROM node:16

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install -g pnpm

RUN npm install -g nodemon

RUN npm install -g typescript

COPY . .

RUN pnpm install

RUN pnpm run build

EXPOSE 8080

CMD ["pnpm", "run", "start"]