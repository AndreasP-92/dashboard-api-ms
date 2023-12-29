FROM node:alpine
WORKDIR /microservice
ENV NODE_ENV: production
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm install
RUN npm install -g typescript
RUN sh -c tsc
EXPOSE 3001
CMD ["npm", "run", "prod"]