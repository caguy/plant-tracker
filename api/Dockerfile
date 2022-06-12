# syntax=docker/dockerfile:1
FROM node:18-alpine3.15
WORKDIR /api
ENV NODE_ENV=production
COPY ["package.json", "./"]
RUN yarn install
COPY . .
RUN yarn build && yarn start
EXPOSE 9000