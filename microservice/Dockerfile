FROM node:alpine
WORKDIR /microservice
ENV NODE_ENV: production
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
# COPY tsconfig.json ./
# COPY src/ ./src/
RUN npm install
RUN npm install -g typescript
RUN sh -c tsc
EXPOSE 3001
CMD ["npm", "run", "prod"]