FROM node:20

WORKDIR /srv/node/app

COPY package*.json ./

RUN npm install

COPY . .

RUN chown -R node /srv/node/app

USER node

EXPOSE 3000

CMD ["sh", "-c", "npm run db:sync && npx prisma generate && node server.js"]