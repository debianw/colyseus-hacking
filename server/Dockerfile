FROM node:10.15-alpine
LABEL Gambit dev@gambit.com
RUN mkdir -p /usr/src/game
WORKDIR /usr/src/game
ADD package.json /usr/src/game
ADD package-lock.json /usr/src/game
RUN npm install --production
ADD . /usr/src/game
CMD ["npm", "start"]
