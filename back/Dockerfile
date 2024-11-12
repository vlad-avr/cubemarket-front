FROM node:alpine AS base
RUN corepack enable
COPY . /app
WORKDIR /app

FROM base AS build
RUN npm install
RUN npm run build

FROM base
COPY --from=build /app/dist /app/dist
EXPOSE 5050
CMD [ "npm", "run", "dev" ]