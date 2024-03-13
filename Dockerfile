# install deps and build app
FROM node:14-alpine AS builder
WORKDIR /build
# install deps
COPY . .
# somehow this combination of yarn installs reduce node_modules size
# https://nextjs.org/docs/deployment#docker-image
# install all the modules (dep and devDeps)
RUN yarn install --frozen-lockfile
# build the app
RUN yarn build 
# reinstall modules with production flag to ignore dev deps as they are not needed after build step
RUN yarn install --production --ignore-scripts --prefer-offline

# run app
FROM node:14-alpine
# working under node user (root in ungood)
USER node
RUN mkdir /home/node/code
WORKDIR /home/node/code
ENV NODE_ENV production
COPY --from=builder /build/next.config.js ./
COPY --from=builder /build/public ./public
COPY --from=builder --chown=node:node /build/.next ./.next
COPY --from=builder /build/node_modules ./node_modules
COPY --from=builder /build/package.json ./package.json
# app works on port 3001
EXPOSE 3001
# run app
CMD ["yarn", "start"]
