# syntax = docker/dockerfile:experimental
FROM --platform=${BUILDPLATFORM:-linux/amd64,linux/arm64} node:20-buster AS builder

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /src
COPY ./ ./

# RUN两次方便观察install和build, 也可以用pnpm cache and locked
RUN pnpm install
RUN npm run build

FROM --platform=${BUILDPLATFORM:-linux/amd64,linux/arm64} ghcr.io/rookie-luochao/nginx-runner:latest

COPY --from=builder /src/dist /app