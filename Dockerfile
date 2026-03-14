FROM oven/bun:1-alpine AS build
WORKDIR /app
COPY package.json bun.lock instrument.server.mjs ./
RUN bun install --frozen-lockfile
COPY . .
RUN bun run build
EXPOSE 3000
CMD ["bun", "run", ".output/server/index.mjs"]