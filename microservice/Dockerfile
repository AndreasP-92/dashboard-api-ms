FROM node:alpine
WORKDIR /microservice
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm install typescript -g
RUN npm install nodemon
EXPOSE 3001
CMD ["npm", "run", "build", "npm", "run", "prod"]