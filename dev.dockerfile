FROM node:8-slim

WORKDIR treten

COPY ./package.json /treten/package.json

RUN npm install

COPY . .

EXPOSE 49153

CMD ["npm", "run", "dev"]