# Multi-stage build

# --- Builder Stage ---
# This stage installs all dependencies (including dev) and builds the application.
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package manifest and lock file
# Using yarn.lock is key for Yarn projects.
COPY package.json yarn.lock ./

# Install all dependencies using Yarn's equivalent of 'npm ci'
RUN yarn install --frozen-lockfile

# Copy the rest of the source code and configuration files
COPY tsconfig*.json ./
COPY . .

# Build the NestJS application
RUN yarn build

# --- DEBUGGING STEP ---
# List the contents of the /app directory to verify the build output.
# You should see a 'dist' folder with your compiled JavaScript files here.
RUN ls -laR

# --- Production Stage ---
# This stage creates the final, slim image with only what's needed to run the app.
FROM node:20-alpine

WORKDIR /app

# Copy package manifest and lock file for installing production dependencies
COPY package.json yarn.lock ./

# Install production-only dependencies. This keeps the final image size small.
RUN yarn install --frozen-lockfile --production

# Copy the built application from the builder stage
COPY --from=builder /app/dist ./dist

# Create a dedicated, non-root user and group for better security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Change ownership of the application directory to the new user
RUN chown -R appuser:appgroup /app

# Switch to the non-root user
USER appuser

# Expose the port the application will run on
EXPOSE 3000

# The command to start the application, with an explicit file extension
CMD ["node", "dist/main.js"]

