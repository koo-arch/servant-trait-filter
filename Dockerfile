FROM node:24.0.2-bookworm

WORKDIR /frontend

COPY package*.json ./

COPY . .

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "dev"]