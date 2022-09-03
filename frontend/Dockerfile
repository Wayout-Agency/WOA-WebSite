FROM node:16.13.0 as dependencies
WORKDIR /app
COPY wayout/package.json wayout//yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:16.13.0 as builder
WORKDIR /app
COPY wayout .
COPY --from=dependencies /app/node_modules ./node_modules
RUN yarn build

FROM node:16.13.0 as runner
WORKDIR /app
ENV NODE_ENV production

COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
CMD ["yarn", "start"]