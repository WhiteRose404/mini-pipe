FROM node:20.5.0 AS build
# Path: frontend/my-app/Dockerfile
WORKDIR /app

# install app dependencies
COPY package.json ./
RUN npm install

# add app
COPY . ./

# build app
RUN npm run build


FROM node:20.5.0-alpine3.18 AS main
# Path: frontend/my-app/Dockerfile
WORKDIR /app

# copy artifact build from the 'build environment'
COPY --from=build /app/build ./build
COPY --from=build /app/package.json ./


# expose port
EXPOSE 3000

# start app
CMD ["npm", "run", "start"]