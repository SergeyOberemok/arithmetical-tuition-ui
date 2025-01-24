FROM node:22

WORKDIR /usr/src/app

COPY ./package*.json ./
COPY . .

# RUN ls

RUN npm install
RUN npm install rimraf -S

ENV PATH=/usr/src/app/node_modules/.bin:$PATH

RUN npm run build

CMD ["npm", "run", "preview"]