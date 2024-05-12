
FROM node:21.7.1-alpine


WORKDIR /usr/src/app

COPY package*.json ./


RUN npm install --silent

# copy local files to app folder
COPY . .

EXPOSE 5173

CMD ["npm","start"]