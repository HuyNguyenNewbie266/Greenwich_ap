# Multi-stage build
# --- Builder Stage ---
# This stage installs all dependencies (including dev) and builds the application.
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package manifest and lock file
COPY package.json yarn.lock ./

# Install all dependencies using Yarn's equivalent of 'npm ci'
RUN yarn install --frozen-lockfile

# Copy the rest of the source code and configuration files
# IMPORTANT: Copy tsconfig files BEFORE copying everything else
COPY tsconfig*.json ./
COPY src ./src
# Copy any other necessary files (nest-cli.json, .env.example, etc.)
COPY nest-cli.json* ./

# Build the NestJS application
RUN yarn build

# --- DEBUGGING STEP ---
# Verify the build output in the builder stage
RUN echo "=== Builder stage contents ===" && ls -la /app/dist

# --- Production Stage ---
FROM node:20-alpine

WORKDIR /app

# Copy package manifest and lock file
COPY package.json yarn.lock ./

# Install production-only dependencies
RUN yarn install --frozen-lockfile --production

# Copy the built application from the builder stage
COPY --from=builder /app/dist ./dist

# --- DEBUGGING STEP ---
# Verify what was actually copied to production stage
RUN echo "=== Production stage contents ===" && ls -la /app/dist

# Create a dedicated, non-root user and group for better security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Change ownership of the application directory to the new user
RUN chown -R appuser:appgroup /app

# Switch to the non-root user
USER appuser

# Expose the port the application will run on
EXPOSE 3000

# The command to start the application
CMD ["node", "dist/main.js"]