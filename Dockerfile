FROM node

WORKDIR /app

COPY *.json /app

RUN npm i

COPY . /app

CMD ["npm", "run", "dev"]