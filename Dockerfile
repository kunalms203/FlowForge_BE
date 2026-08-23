FROM oven/bun:1.2.22 AS builder

WORKDIR /app

COPY package.json bun.lock ./

RUN bun install --frozen-lockfile

COPY . .

RUN bunx prisma generate
RUN bun run build


FROM oven/bun:1.2.22 AS production

WORKDIR /app

ENV NODE_ENV=production

COPY package.json bun.lock ./

RUN bun install --frozen-lockfile --production --ignore-scripts

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/generated ./generated

EXPOSE 5000

CMD ["bun", "run", "start"]