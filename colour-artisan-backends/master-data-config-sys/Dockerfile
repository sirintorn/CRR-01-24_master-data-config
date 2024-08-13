#Build stage
#FROM node:22-alpine as build

#WORKDIR /app

#COPY package*.json .

#RUN npm install

#COPY . .

#RUN npm run build

#Production stage
FROM node:22-alpine as production

WORKDIR /app

COPY package*.json .

RUN npm ci --only=production

COPY --from=build /app/dist ./dist

CMD ["node", "dist/index.js"]

