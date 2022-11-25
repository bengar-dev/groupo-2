FROM node:16

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install -g pnpm

COPY . .

RUN pnpm install

RUN pnpm run build

EXPOSE 5173

CMD ["pnpm", "run", "preview"]

