# Greenwich AP Micro Clone Handbook

## 1. Technology DNA of the Original Project

### Core stack
- **Runtime & Frameworks:** Node.js 20+, NestJS 11 with modular architecture and TypeORM for ORM. 【F:package.json†L1-L46】
- **API Tooling:** Swagger decorators, class-validator/transformer for DTO validation, and Passport strategies for authentication. 【F:src/modules/student/student.controller.ts†L1-L61】【F:src/modules/auth/auth.module.ts†L1-L65】
- **Database Layer:** PostgreSQL 15 with migrations and seeds managed through TypeORM CLI. 【F:README.md†L53-L128】【F:src/database/migrations/1760198346386-InitialTables.ts†L1-L120】
- **Testing:** Jest with dedicated unit and e2e configurations. 【F:package.json†L9-L33】
- **DevOps:** Docker Compose orchestrates PostgreSQL, Redis, pgAdmin, and Redis Commander to support local development. 【F:README.md†L77-L120】

### Architectural fingerprints
- **Layered modules:** Controllers orchestrate services, which coordinate repositories/entities. Example: Student controller/service pair demonstrates RESTful layering with DTO validation and role-based guards. 【F:src/modules/student/student.controller.ts†L1-L61】【F:src/modules/student/student.service.ts†L1-L146】
- **Declarative documentation:** Custom Swagger decorators centralize API descriptions to keep docs consistent. 【F:src/modules/student/student.controller.ts†L11-L22】
- **Security patterns:** JWT guards and role guards enforce auth boundaries per module. 【F:src/modules/auth/guards/jwt-auth.guard.ts†L1-L11】【F:src/modules/auth/guards/roles.guard.ts†L1-L61】
- **Config-first bootstrapping:** Global ConfigModule loads typed settings (database, JWT). 【F:src/app.module.ts†L1-L47】
- **Database migrations:** Each domain feature adds explicit migrations ensuring reproducible schema evolution. 【F:src/database/migrations/1760888265585-TermTables.ts†L1-L129】

### Design philosophy
- **DDD-inspired domains:** Each bounded context (student, staff, attendance, etc.) ships with its own DTOs, entities, and services, fostering modular growth. 【F:src/modules/student†L1-L1】【F:src/modules/staff†L1-L1】
- **Convention-driven extensibility:** Nest CLI structure plus shared decorators enforce consistent module scaffolding. 【F:README.md†L129-L171】
- **Explicit infrastructure:** Docker, migrations, and seeds are first-class citizens, reflecting a production-aligned local environment. 【F:README.md†L77-L128】
- **Documentation as code:** Swagger decorators and README operate as onboarding guardrails for new contributors. 【F:README.md†L1-L207】【F:src/modules/student/student.controller.ts†L11-L22】

## 2. Micro Project Overview

The **`micro-clone/`** directory contains a runnable mini-implementation that mirrors the production stack while staying laser-focused on the Programme → Term domain. 【F:micro-clone†L1-L1】 It preserves:

- NestJS + TypeORM + PostgreSQL configuration through ConfigModule and DatabaseModule. 【F:micro-clone/src/modules/app.module.ts†L1-L24】【F:micro-clone/src/modules/database.module.ts†L1-L21】
- Auth pipeline using Passport (local + JWT), user entity, and guards. 【F:micro-clone/src/modules/auth/auth.module.ts†L1-L30】【F:micro-clone/src/modules/auth/strategies/local.strategy.ts†L1-L18】
- Programme & Term domain with composite uniqueness, pagination, and CRUD controllers. 【F:micro-clone/src/modules/programme/programme.controller.ts†L1-L56】【F:micro-clone/src/modules/term/term.service.ts†L1-L63】
- Infrastructure artifacts: migrations, seeds, Docker Compose, env templates, Swagger setup, and Jest e2e spec. 【F:micro-clone/src/database/migrations/1700000000000-InitialMigration.ts†L1-L111】【F:micro-clone/src/database/seed.ts†L1-L53】【F:micro-clone/docker-compose.yml†L1-L25】【F:micro-clone/.env.example†L1-L11】【F:micro-clone/src/main.ts†L1-L32】【F:micro-clone/test/app.e2e-spec.ts†L1-L61】

### Running the micro project
1. `cp micro-clone/.env.example micro-clone/.env` and adjust secrets.
2. `cd micro-clone && yarn install`.
3. `docker compose up -d` to start Postgres.
4. `yarn build` and `yarn migration:run` to apply schema.
5. `yarn seed:run` to load default admin/programme/term.
6. `yarn start:dev` to launch API at `http://localhost:3100/docs`.
7. `yarn test:e2e` to execute Supertest smoke test (uses in-memory sqlite). 【F:micro-clone/package.json†L6-L29】【F:micro-clone/src/config/database.config.ts†L1-L24】

## 3. Mini-course: Component Explanations

### Bootstrap (`src/main.ts`)
- **Syntax:** Creates Nest app, applies global prefix, validation pipe, HTTP exception filter, and Swagger document. 【F:micro-clone/src/main.ts†L1-L32】
- **Meaning:** Mirrors production bootstrap (global config, versioned routes, docs). In the original project, similar logic lives in `main.ts`, but enriched with helmet/compression. 【F:src/main.ts†L1-L38】
- **Best practices:** Always enable `ValidationPipe` with whitelist to avoid mass-assignment, and publish API docs from code to reduce drift. Handle exceptions with centralized filters to keep responses consistent. 【F:micro-clone/src/common/filters/http-exception.filter.ts†L1-L36】

### Configuration (`src/config/*.ts`)
- **Syntax:** `registerAs` exports typed config slices (app, database, jwt). Database config switches to sqlite when `NODE_ENV=test`. 【F:micro-clone/src/config/app.config.ts†L1-L12】【F:micro-clone/src/config/database.config.ts†L1-L24】【F:micro-clone/src/config/jwt.config.ts†L1-L12】
- **Meaning:** Aligns with the original's config-first approach for TypeORM and JWT secrets. 【F:src/config/database.config.ts†L1-L43】【F:src/config/jwt.config.ts†L1-L32】
- **Best practices:** Provide deterministic test config to keep Jest fast and hermetic; never couple secrets to source control.

### Database Module & Migration
- **Syntax:** `DatabaseModule` bootstraps TypeORM with entity list; migration defines UUID tables and composite unique for terms, plus extension setup. 【F:micro-clone/src/modules/database.module.ts†L1-L21】【F:micro-clone/src/database/migrations/1700000000000-InitialMigration.ts†L1-L111】
- **Meaning:** Reflects how the main project registers TypeORM asynchronously with config injection and evolves schema by migrations. 【F:src/app.module.ts†L5-L35】【F:src/database/migrations/1760888265585-TermTables.ts†L1-L129】
- **Best practices:** Always create `uuid-ossp` extension before using `uuid_generate_v4`, keep `down` migrations clean, and ensure foreign keys cascade appropriately.

### Auth Module (`src/modules/auth`)
- **Syntax:** Combines `LocalStrategy`, `JwtStrategy`, guards, controller, and service that signs JWTs. 【F:micro-clone/src/modules/auth/auth.module.ts†L1-L30】【F:micro-clone/src/modules/auth/auth.controller.ts†L1-L33】
- **Meaning:** Mirrors the production auth pipeline (local login, JWT guard) albeit without OAuth. 【F:src/modules/auth/auth.module.ts†L1-L60】【F:src/modules/auth/strategies/local.strategy.ts†L1-L33】
- **Best practices:** Return minimal user shape in tokens, protect `me` endpoints with `JwtAuthGuard`, and wrap credential checks in service to keep controllers thin.

### Programme Module
- **Syntax:** DTOs enforce validation, service handles pagination/search via TypeORM repository, and controller wires endpoints behind JWT guard. 【F:micro-clone/src/modules/programme/dto/create-programme.dto.ts†L1-L17】【F:micro-clone/src/modules/programme/programme.service.ts†L1-L57】【F:micro-clone/src/modules/programme/programme.controller.ts†L1-L56】
- **Meaning:** Inspired by the student module’s layering & guard usage. 【F:src/modules/student/student.service.ts†L1-L146】【F:src/modules/student/student.controller.ts†L1-L61】
- **Best practices:** Use repository `findAndCount` for pagination, centralize search filters, and raise `NotFoundException` for missing IDs to keep HTTP semantics accurate.

### Term Module
- **Syntax:** Ensures composite uniqueness, exposes `findByProgramme` listing with pagination, and converts DB errors into `ConflictException`. 【F:micro-clone/src/modules/term/entities/term.entity.ts†L1-L36】【F:micro-clone/src/modules/term/term.service.ts†L1-L63】
- **Meaning:** Mirrors production term migrations and relations but with focused operations. 【F:src/database/migrations/1760888265585-TermTables.ts†L1-L129】
- **Best practices:** Catch duplicate-key errors to provide domain-friendly messages, and prefer cascade deletes for child records.

### Seeding & Tests
- **Syntax:** Seed script loads admin user and demo programme/terms using TypeORM repositories; e2e test spins up full stack (sqlite) to verify login + CRUD flow. 【F:micro-clone/src/database/seed.ts†L1-L53】【F:micro-clone/test/app.e2e-spec.ts†L1-L61】
- **Meaning:** Recreates the original repo’s emphasis on migrations + seeds + Supertest for integration confidence. 【F:src/database/seeds/seed.ts†L1-L76】【F:test/app.e2e-spec.ts†L1-L74】
- **Best practices:** Keep seeds idempotent, prefer hashed secrets, and run smoke e2e after migrations to validate wiring end-to-end.

## 4. Commit Milestone Curriculum

Each milestone is a hands-on “lesson + assignment.” Follow them sequentially; every step builds on the prior one.

1. **feat(init): scaffold NestJS baseline**
   - *Explain:* Generate Nest app skeleton, enable ConfigModule, and wire TypeORM asynchronously (mirrors production boot). 【F:micro-clone/src/modules/app.module.ts†L1-L24】
   - *Exercise:* Initialize repo, add `AppModule`, and confirm `yarn start` boots a blank API.
   - *Completion:* `GET /api/v1` returns 404 but server boots without errors.

2. **feat(config): add typed env configuration**
   - *Explain:* Split config slices for app, DB, JWT using `registerAs`, echoing main repo conventions. 【F:micro-clone/src/config/app.config.ts†L1-L12】
   - *Exercise:* Implement config files, load them globally, and expose `APP_NAME` + `PORT`.
   - *Completion:* Swagger document reflects custom app name.

3. **feat(database): introduce Programme entity & migration**
   - *Explain:* Create entity with timestamps and unique code; author initial migration similar to production DDL. 【F:micro-clone/src/modules/programme/entities/programme.entity.ts†L1-L29】【F:micro-clone/src/database/migrations/1700000000000-InitialMigration.ts†L1-L111】
   - *Exercise:* Run migration against local Postgres.
   - *Completion:* `programmes` table exists with UUID PK and unique `code`.

4. **feat(auth): scaffold user + auth module**
   - *Explain:* Compose Passport strategies, JWT module, and guards to replicate login flow. 【F:micro-clone/src/modules/auth/auth.module.ts†L1-L30】
   - *Exercise:* Build user entity/service, hashing helpers, and login endpoint that returns JWT.
   - *Completion:* `POST /api/v1/auth/login` returns token for seeded user.

5. **feat(programme): CRUD with validation and pagination**
   - *Explain:* Apply DTOs and service pagination `findAndCount`, inspired by student module patterns. 【F:micro-clone/src/modules/programme/programme.service.ts†L1-L57】
   - *Exercise:* Implement controller endpoints secured by JWT, along with pagination DTO.
   - *Completion:* Authenticated client can create/list/update/delete programmes; pagination metadata returned.

6. **feat(term): composite unique domain logic**
   - *Explain:* Model Term entity with `@Unique` decorator and guard against duplicate codes per programme. 【F:micro-clone/src/modules/term/entities/term.entity.ts†L1-L36】
   - *Exercise:* Add service/controller plus conflict handling.
   - *Completion:* Attempting to create duplicate term within same programme returns 409.

7. **feat(seed): reproducible data bootstrap**
   - *Explain:* Seeds align with production’s CLI and idempotent inserts. 【F:micro-clone/src/database/seed.ts†L1-L53】
   - *Exercise:* Write seed script for admin + sample programme/terms.
   - *Completion:* `yarn seed:run` creates admin user and demo data without duplication on rerun.

8. **feat(docker): devops parity**
   - *Explain:* Docker Compose ensures local Postgres/pgAdmin parity. 【F:micro-clone/docker-compose.yml†L1-L25】
   - *Exercise:* Create compose file, env template, and document connection info.
   - *Completion:* `docker compose up -d` exposes healthy Postgres on port 5434.

9. **test(e2e): smoke test auth + domain**
   - *Explain:* Supertest verifies login + CRUD, echoing production’s e2e harness. 【F:micro-clone/test/app.e2e-spec.ts†L1-L61】
   - *Exercise:* Configure sqlite test DB, seed admin in-memory, and assert programme/term workflow.
   - *Completion:* `yarn test:e2e` passes on clean checkout.

10. **docs(playbook): author micro clone handbook**
    - *Explain:* Capture knowledge transfer bridging original architecture to micro clone.
    - *Exercise:* Summarize stack, modules, and commit curriculum; map patterns to original repo.
    - *Completion:* Handbook (this file) reviewed and checked into `docs/`.

## 5. Parallel Learning Tracks

### Track A – Backend Foundation
1. DTO validation with class-validator. 【F:micro-clone/src/modules/programme/dto/create-programme.dto.ts†L1-L17】
2. Pagination DTO and `findAndCount`. 【F:micro-clone/src/common/pagination/pagination.dto.ts†L1-L26】【F:micro-clone/src/modules/programme/programme.service.ts†L14-L39】
3. HTTP exception filter & consistent responses. 【F:micro-clone/src/common/filters/http-exception.filter.ts†L1-L36】
4. Composite unique enforcement & conflict handling. 【F:micro-clone/src/modules/term/term.service.ts†L1-L63】
5. Swagger integration with security schemes. 【F:micro-clone/src/main.ts†L14-L28】
6. Versioned routing & global prefix. 【F:micro-clone/src/main.ts†L11-L17】
7. Guards & decorators for protected routes. 【F:micro-clone/src/modules/programme/programme.controller.ts†L8-L55】
8. Service-level search filtering. 【F:micro-clone/src/modules/programme/programme.service.ts†L25-L37】
9. Reusable hashing helper for credentials. 【F:micro-clone/src/modules/user/utils/hash.ts†L1-L8】
10. Seeding patterns for initial content. 【F:micro-clone/src/database/seed.ts†L1-L53】

### Track B – DevOps & Tooling
1. Env templating and config loading. 【F:micro-clone/.env.example†L1-L11】【F:micro-clone/src/config/app.config.ts†L1-L12】
2. Docker Compose for Postgres + pgAdmin. 【F:micro-clone/docker-compose.yml†L1-L25】
3. TypeORM migrations CLI wrapper. 【F:micro-clone/package.json†L16-L21】
4. Migration authoring with UUID extension. 【F:micro-clone/src/database/migrations/1700000000000-InitialMigration.ts†L1-L111】
5. Seed CLI script via TypeORM DataSource. 【F:micro-clone/src/database/seed.ts†L1-L53】
6. Test database isolation (sqlite fallback). 【F:micro-clone/src/config/database.config.ts†L1-L24】
7. Jest + Supertest integration harness. 【F:micro-clone/test/jest-e2e.json†L1-L7】【F:micro-clone/test/app.e2e-spec.ts†L1-L61】
8. Build pipeline alignment with `nest build`. 【F:micro-clone/package.json†L10-L14】
9. Swagger generation in CI/CD (via `nest build`). 【F:micro-clone/src/main.ts†L18-L28】
10. Exception logging for observability. 【F:micro-clone/src/common/filters/http-exception.filter.ts†L1-L36】

### Track C – Architecture & Domain Thinking
1. Config-driven dependency injection. 【F:micro-clone/src/modules/app.module.ts†L1-L24】
2. Domain isolation via modules. 【F:micro-clone/src/modules/programme/programme.module.ts†L1-L12】【F:micro-clone/src/modules/term/term.module.ts†L1-L10】
3. Entity relationships & cascade rules. 【F:micro-clone/src/modules/term/entities/term.entity.ts†L1-L36】
4. Auth boundary enforcement with guards. 【F:micro-clone/src/modules/auth/jwt-auth.guard.ts†L1-L5】
5. Mapping service logic to HTTP semantics. 【F:micro-clone/src/modules/programme/programme.service.ts†L40-L56】
6. Aligning seeds with domain defaults. 【F:micro-clone/src/database/seed.ts†L21-L45】
7. Eventual scaling: pagination & search patterns. 【F:micro-clone/src/modules/programme/programme.service.ts†L14-L39】
8. Test-driven flow validation (login + CRUD). 【F:micro-clone/test/app.e2e-spec.ts†L27-L61】
9. Migration-first schema evolution. 【F:micro-clone/src/database/migrations/1700000000000-InitialMigration.ts†L1-L111】
10. Documentation-as-architecture (this handbook). 【F:docs/micro-clone-handbook.md†L1-L210】

## 6. Comparing Micro Clone vs Original

| Aspect | Original Project | Micro Clone |
| --- | --- | --- |
| Domains | Multiple (student, staff, attendance, etc.) | Programme + Term focus |
| Auth | JWT + roles + Google OAuth hooks | JWT + local login only |
| Infrastructure | Docker for Postgres + Redis + admin tools | Docker for Postgres + pgAdmin |
| Docs | README + Swagger decorators per module | Swagger bootstrap + this handbook |
| Testing | Jest unit + e2e suites per module | Single Supertest smoke test |
| Data lifecycle | Multi-migration timeline | Single initial migration |

The micro clone keeps the critical wiring—Nest modules, DTO validation, TypeORM migrations, JWT auth, Dockerized Postgres—while stripping the domain surface area down to a digestible lesson plan. Completing every milestone equips you with the same mental model needed to navigate and extend the production system with confidence.
