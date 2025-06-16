# === STAGE 1: Build ===
FROM node:22-alpine AS builder

ARG NEXT_PUBLIC_PLASMIC_PROJECT_ID
ARG NEXT_PUBLIC_PLASMIC_PROJECT_TOKEN
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
ARG NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN

ENV NEXT_PUBLIC_PLASMIC_PROJECT_ID=$NEXT_PUBLIC_PLASMIC_PROJECT_ID \
    NEXT_PUBLIC_PLASMIC_PROJECT_TOKEN=$NEXT_PUBLIC_PLASMIC_PROJECT_TOKEN \
    NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL \
    NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY \
    NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=$NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci  && npm cache clean --force

COPY . .

RUN npm run build

# === STAGE 2: Runtime ===
FROM node:22-alpine AS runner
WORKDIR /app

COPY --from=builder /app/.next .next
COPY --from=builder /app/public public
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json .

RUN npm ci --only=production

EXPOSE 3000
CMD ["npm", "start"]
