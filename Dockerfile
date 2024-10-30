FROM node:20-alpine
WORKDIR /backend-challenger-arrow-digital
COPY . .
RUN npm install
EXPOSE 3000
ENTRYPOINT [ "sh", "-c" ," npm start" ]
