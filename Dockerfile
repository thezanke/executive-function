ARG NODE_VERSION=gallium-alpine
ARG NGINX_VERSION=latest

FROM node:${NODE_VERSION} AS web-builder
WORKDIR /app
COPY package.json package-lock.json tsconfig.json .eslintrc /app/
ENV NODE_ENV=development
RUN npm ci
COPY src /app/src
COPY public /app/public
ENV NODE_ENV=production
RUN npm run build

FROM nginx:${NGINX_VERSION} AS web
COPY --from=web-builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
