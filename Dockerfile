FROM node:16

WORKDIR /srv/app
COPY package*.json ./
ENV PATH /app/node_modules/.bin:$PATH
RUN apt-get update && apt-get -y upgrade && apt-get install --yes \
    ghostscript \
    graphicsmagick \
    poppler-data  \
    poppler-utils 
RUN yarn install
RUN npm i nodemon -g
COPY . .
RUN chmod 777 images
CMD ["nodemon", "index.js"]
