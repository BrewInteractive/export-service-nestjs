FROM node:16-alpine AS build
WORKDIR /app

RUN apk add --no-cache chromium 

COPY . .

RUN yarn install
RUN yarn build

FROM node:16-alpine
WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./
COPY --from=build /app/node_modules ./node_modules


ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

RUN apk add --no-cache chromium

CMD ["yarn", "start:prod"]