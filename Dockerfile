FROM oven/bun:1.2.22 AS builder

WORKDIR /app

RUN apt-get update -y && apt-get install -y openssl

COPY package.json bun.lock ./

RUN bun install --frozen-lockfile

COPY . .

# Only needed during image build for Prisma generate
ENV DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy"

RUN bunx prisma generate

RUN bun run build


FROM oven/bun:1.2.22 AS production

WORKDIR /app

ENV NODE_ENV=production

RUN apt-get update -y && apt-get install -y openssl

COPY package.json bun.lock ./

RUN bun install --frozen-lockfile --production --ignore-scripts

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/generated ./generated
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts
COPY --from=builder /app/docker-entrypoint.sh ./docker-entrypoint.sh

RUN chmod +x docker-entrypoint.sh

EXPOSE 5000

CMD ["./docker-entrypoint.sh"]