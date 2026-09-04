#!/bin/sh

echo "Running Prisma migrations..."

bunx prisma migrate deploy

echo "Starting backend..."

exec bun run start
