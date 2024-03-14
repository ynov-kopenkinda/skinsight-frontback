##### DEPENDENCIES

FROM --platform=linux/amd64 node:18-alpine AS builder
RUN apk update
WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=@skinsight/client --docker



##### INSTALLER

FROM --platform=linux/amd64 node:18-alpine AS installer
RUN apk update
WORKDIR /app

COPY .gitignore .gitignore
COPY --from=builder /app/apps/api-server/swagger.json ./apps/api-server/swagger.json
COPY --from=builder /app/out/full .
COPY --from=builder /app/out/pnpm-lock.yaml\* ./

RUN yarn global add pnpm && pnpm fetch && pnpm install --frozen-lockfile

RUN pnpm turbo build --filter=client



##### RUNTIME

FROM --platform=linux/amd64 node:18-alpine AS runner
RUN apk update
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 client
USER client
EXPOSE 3000
ENV PORT 3000

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=installer /app/apps/client/next.config.mjs ./
COPY --from=installer /app/apps/client/package.json ./

COPY --from=installer --chown=client:nodejs /app/apps/client/.next/standalone ./
COPY --from=installer --chown=client:nodejs /app/apps/client/.next/static ./apps/client/.next/static
COPY --from=installer --chown=client:nodejs /app/apps/client/public ./apps/client/public

CMD ["node", "apps/client/server.js"]