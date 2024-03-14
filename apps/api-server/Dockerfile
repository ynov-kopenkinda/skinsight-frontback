##### DEPENDENCIES

FROM --platform=linux/amd64 node:18-alpine AS builder
RUN apk update
WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=@skinsight/api-server --docker
RUN ls -lah

##### INSTALLER

FROM --platform=linux/amd64 node:18-alpine AS installer
RUN apk update
WORKDIR /app

COPY .gitignore .gitignore
COPY  --from=builder /app/tsconfig.json ./tsconfig.json
COPY --from=builder /app/out/json .

RUN yarn global add pnpm && pnpm fetch && pnpm install -r --offline --frozen-lockfile

COPY --from=builder /app/out/full .

RUN pnpm turbo build --filter=api-server


##### RUNTIME

FROM --platform=linux/amd64 node:18-alpine AS runner
RUN apk update
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 api-server
USER api-server
EXPOSE 3000
ENV PORT 3000

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=installer /app/apps/api-server/next.config.mjs ./
COPY --from=installer /app/apps/api-server/package.json ./

COPY --from=installer --chown=api-server:nodejs /app/apps/api-server/dist ./

CMD ["node", "apps/api-server/main.js"]