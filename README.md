# Greenwich Academic Programme Management System

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">A comprehensive Academic Programme Management System built with <a href="http://nodejs.org" target="_blank">Node.js</a> and the progressive <a href="http://nestjs.com" target="_blank">NestJS</a> framework.</p>

<p align="center">
<img src="https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen" alt="Node Version" />
<img src="https://img.shields.io/badge/yarn-%3E%3D1.22.0-brightgreen" alt="Yarn Version" />
<img src="https://img.shields.io/badge/typescript-%5E5.7.3-blue" alt="TypeScript" />
<img src="https://img.shields.io/badge/nestjs-%5E11.0.0-red" alt="NestJS" />
<img src="https://img.shields.io/badge/postgresql-15-blue" alt="PostgreSQL" />
<img src="https://img.shields.io/badge/docker-ready-blue" alt="Docker Ready" />
</p>

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Creating New Modules](#creating-new-modules)
- [Database Migrations](#database-migrations)

## 🔧 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (>= 20.0.0)
- **Yarn** (>= 1.22.0)
- **Docker & Docker Compose**

## Recommended VSCode Extensions

For the best development experience, install these VSCode extensions:

- Prettier - Code formatter (esbenp.prettier-vscode)
- ESLint (dbaeumer.vscode-eslint)

## 🚀 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd greenwich-ap-backend
   ```

2. **Install NestJS CLI globally**

   ```bash
   yarn global add @nestjs/cli
   ```

3. **Install project dependencies**

   ```bash
   yarn install
   ```

4. **Set up environment variables**

   ```bash
   # Copy environment template files
   cp .env.example .env
   ```

5. **Start Docker services**

   ```bash
   # Start PostgreSQL, Redis, and pgAdmin for development
   docker compose -f docker-compose.yml up -d
   ```

6. **Set up the database**
   1. Open pgAdmin in your browser: http://localhost:5050
   2. Login with credentials:
      - Email: `admin@greenwich.edu`
      - Password: `secret`
   3. Right-click on "Servers" → "Register" → "Server"
   4. In "General" tab:
      - Name: `Greenwich Local`
   5. In "Connection" tab:
      - Host: `postgres` (if using Docker) or `localhost`
      - Port: `5432`
      - Username: `root` (if using Docker) or `postgres`
      - Password: `secret`
   6. Click "Save"
   7. Right-click on the server → "Create" → "Database"
   8. Database name: `greenwich_ap`
   9. Click "Save"

7. **Start the development server**
   ```bash
   yarn start:dev
   ```

## 🏗️ Creating New Modules

Use the NestJS CLI to generate new modules and resources:

```bash
# Navigate to the modules directory
cd src/modules

# Generate a complete CRUD resource (recommended)
nest g res ResourceName

# Generate individual components
nest g module ModuleName
nest g controller ControllerName
nest g service ServiceName
nest g guard GuardName
nest g interceptor InterceptorName
nest g pipe PipeName
nest g filter FilterName

# Generate with specific path
nest g module modules/custom-module
```

## 🗃️ Database Migrations

### Migration Commands

```bash
# Generate a new migration based on entity changes
yarn migration:generate src/database/migrations/MigrationName

# Create an empty migration file
yarn migration:create src/database/migrations/MigrationName

# Run all pending migrations
yarn migration:run

# Revert the last executed migration
yarn migration:revert

# Show migration status
yarn typeorm migration:show

# Run database seeds
yarn seed:run
```

---

<p align="center">
  Built with ❤️ for Greenwich University Academic Programme Management
</p>
