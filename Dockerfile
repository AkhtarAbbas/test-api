FROM node:alpine

USER node

# RUN mkdir /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm install --development
RUN mkdir node_modules/.cache && chmod -R 777 node_modules/.cache

# CMD [ "npm", "start" ]
CMD ["node", "dist/main"]
EXPOSE 3000

# Install development packages if NODE_ENV is set to "development"
ARG NODE_ENV=development
ENV NODE_ENV $NODE_ENV
RUN if [ "$NODE_ENV" == "development" ]; then npm install ; fi



# FROM node:16-alpine 

# # ARG NODE_ENV=dev
# # ENV NODE_ENV=${NODE_ENV}

# WORKDIR /usr/src/app

# COPY package.json ./
# COPY . .
# # COPY ./nest-cli.json ./
# # COPY ./tsconfig.build.json ./
# # COPY ./tsconfig.json ./

# RUN npm install -g @nestjs/cli
# # RUN npm ci --only=dev

# RUN npm run build

# ENV PORT 3000
# # ENV PORT 9229

# CMD ["node", "dist/main"]
