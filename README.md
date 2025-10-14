# Greenwich Academic Programme Management System

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">A comprehensive Academic Programme Management System built with <a href="http://nodejs.org" target="_blank">Node.js</a> and the progressive <a href="http://nestjs.com" target="_blank">NestJS</a> framework.</p>

<p align="center">
<img src="https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen" alt="Node Version" />
<img src="https://img.shields.io/badge/yarn-%3E%3D1.22.0-brightgreen" alt="Yarn Version" />
<img src="https://img.shields.io/badge/typescript-%5E5.7.3-blue" alt="TypeScript" />
<img src="https://img.shields.io/badge/nestjs-%5E11.0.0-red" alt="NestJS" />
<img src="https://img.shields.io/badge/postgresql-15-blue" alt="PostgreSQL" />
<img src="https://img.shields.io/badge/docker-ready-blue" alt="Docker Ready" />
</p>

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Recommended Tools](#recommended-tools)
- [Installation](#installation)
- [Creating New Modules](#creating-new-modules)
- [Database Migrations](#database-migrations)
- [Available Scripts](#available-scripts)

## 🔧 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (>= 20.0.0)
- **Yarn** (>= 1.22.0)
- **Docker & Docker Compose**

## 💡 Recommended Tools

### VSCode Extensions

For the best development experience, install these VSCode extensions:

- **Prettier - Code formatter** (esbenp.prettier-vscode)
- **ESLint** (dbaeumer.vscode-eslint)
- **Thunder Client** or **REST Client** (for API testing)

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd greenwich-ap-backend
```

### 2. Install Dependencies

```bash
yarn install
```

### 3. Set Up Environment Variables

```bash
# Copy environment template file
cp .env.example .env
```

Edit the `.env` file with your configuration settings.

### 4. Start Docker Services

```bash
# Start PostgreSQL, Redis, pgAdmin and Redis Commander
docker compose -f docker-compose.yml up -d
```

### 5. Set Up the Database

#### Using pgAdmin (Web Interface)

1. Open pgAdmin in your browser: http://localhost:5050
2. Login with credentials:
   - **Email:** `admin@greenwich.edu`
   - **Password:** `secret`
3. Register the PostgreSQL server:
   - Right-click on **"Servers"** → **"Register"** → **"Server"**
   - In **"General"** tab:
     - **Name:** `Greenwich Local`
   - In **"Connection"** tab:
     - **Host:** `postgres` (Docker service name)
     - **Port:** `5432`
     - **Username:** `root`
     - **Password:** `secret`
   - Click **"Save"**
4. Create the database:
   - Right-click on the server → **"Create"** → **"Database"**
   - **Database name:** `greenwich_ap`
   - Click **"Save"**

### 6. Run Database Migrations

```bash
# Run all pending migrations
yarn migration:run
```

### 7. Seed the Database

```bash
# Run database seeds
yarn seed:run
```

### 8. Start the Development Server

```bash
yarn start:dev
```

The API will be available at: http://localhost:3000

## 🏗️ Creating New Modules

The NestJS CLI is included as a project dependency. Use it via `yarn nest`:

```bash
# Navigate to the modules directory
cd src/modules

# Generate a complete CRUD resource (recommended)
yarn nest g res ResourceName

# Generate individual components
yarn nest g module ModuleName
yarn nest g controller ControllerName
yarn nest g service ServiceName
yarn nest g guard GuardName
yarn nest g interceptor InterceptorName
yarn nest g pipe PipeName
yarn nest g filter FilterName

# Generate with specific path
yarn nest g module modules/custom-module
```

### Example: Creating a "Students" Module

```bash
cd src/modules
yarn nest g res students
```

This will generate:

- Module file
- Controller with CRUD endpoints
- Service with CRUD methods
- DTO classes
- Entity class

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
```

### Migration Workflow

1. **Create/Update Entity**: Modify your TypeORM entities
2. **Generate Migration**:
   ```bash
   yarn migration:generate src/database/migrations/AddUserTable
   ```
3. **Review Migration**: Check the generated migration file
4. **Run Migration**:
   ```bash
   yarn migration:run
   ```

## 📜 Available Scripts

### Development

```bash
# Start development server with hot reload
yarn start:dev

# Start development server with debug mode
yarn start:debug
```

### Building

```bash
# Build the application
yarn build

# Start production server
yarn start:prod
```

### Code Quality

```bash
# Format code with Prettier
yarn format

# Lint and fix code
yarn lint
```

### Testing

```bash
# Run unit tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run tests with coverage
yarn test:cov

# Run end-to-end tests
yarn test:e2e

# Debug tests
yarn test:debug
```

### Database

```bash
# Run migrations
yarn migration:run

# Revert last migration
yarn migration:revert

# Generate new migration
yarn migration:generate src/database/migrations/MigrationName

# Create empty migration
yarn migration:create src/database/migrations/MigrationName

# Run seeds
yarn seed:run
```

## 🐳 Docker Commands

```bash
# Start all services
docker compose up -d

# Stop all services
docker compose down

# View logs
docker compose logs -f

# Restart a specific service
docker compose restart postgres

# Remove all containers and volumes
docker compose down -v
```

## 📚 Project Structure

```
greenwich-ap-backend/
├── src/
│   ├── modules/          # Application modules
│   ├── database/         # Database configuration and migrations
│   │   ├── migrations/   # TypeORM migrations
│   │   ├── seeds/        # Database seeders
│   │   └── ormconfig.ts  # TypeORM configuration
│   ├── common/           # Shared utilities and decorators
│   ├── config/           # Configuration files
│   └── main.ts           # Application entry point
├── test/                 # E2E tests
├── docker-compose.yml    # Docker services configuration
├── .env                  # Environment variables
└── package.json          # Project dependencies
```

## 🔒 Environment Variables

Key environment variables to configure in `.env`:

```bash
# Application
NODE_ENV=development
PORT=3000

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=root
DB_PASSWORD=secret
DB_DATABASE=greenwich_ap

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRATION=7d

# Google OAuth (if applicable)
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
```

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit your changes: `git commit -m 'Add some feature'`
3. Push to the branch: `git push origin feature/your-feature`
4. Submit a pull request

## 📝 License

This project is [UNLICENSED](LICENSE).

---

<p align="center">
  Built with ❤️ for Greenwich University Academic Programme Management
</p>
