FROM node:16-alpine AS build
WORKDIR /usr/src/app

RUN apk add --no-cache chromium 

COPY . .

RUN yarn install
RUN yarn build

FROM node:16-alpine
WORKDIR /app

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/package.json ./
COPY --from=build /usr/src/app/node_modules ./node_modules

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

RUN apk add --no-cache chromium 

CMD ["yarn", "start:prod"]