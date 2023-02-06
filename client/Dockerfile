FROM node:19-alpine
WORKDIR /app
COPY . .
# use -f flag because there are conflicting peer dependencies in the dependencies used for this project
# thoroughly tested...the -f flag works fine and we can ignore the peer dependencies conflicts
ENV NODE_ENV=production
ENV GENERATE_SOURCEMAP=false
RUN npm install -f
RUN npm run build

#stage 2 production
FROM nginx:alpine as production
WORKDIR /var/www/html
RUN rm -rf ./*
COPY --from=build /app/build /var/www/html
#COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
#VOLUME ./nginx/nginx.conf /etc/nginx/conf.d/
CMD ["nginx", "-g", "daemon off;"]