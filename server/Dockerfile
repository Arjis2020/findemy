FROM node:19-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm install pm2 -g
EXPOSE 9000
CMD ["pm2-runtime", "index.js"]