# CSV Importer Learning Path

This is a hands-on learning path for building a CSV import dashboard from the ground up. You will create a pnpm workspace with a React web app, a NestJS API, a separate NestJS worker, PostgreSQL, Redis, and shared TypeScript packages.

The repository starts with the learning materials. The applications are built as you work through the phases; there is no finished implementation to install or run at the start.

## Start here

Begin with [Phase 00: Overview](docs/00-overview.md), then follow the phases in order. Each phase has a goal, implementation steps, an explanation of the design, a validation checkpoint, and review questions.

For each phase, read only the goal, initial state, and **Your exercise** first. Pause and sketch a design or write pseudocode before looking at the implementation guidance. Then:

1. Build the smallest working result for that phase. The steps describe requirements and constraints; you write the application code.
2. Run the phase's validation and fix failures before moving on. Later phases depend on the current one working.
3. Read the lesson and compare it with your design. Note one decision you made and one thing you would change after seeing the trade-offs.
4. Answer the review questions in your own words. Keep a Git checkpoint after each phase so you can inspect how the application grew.
5. Use the questions as a mastery check: answer from memory, explain why the system behaves that way, and trace at least one scenario through the relevant components. If you can name a term but cannot predict the outcome or trade-off, revisit that phase's lesson and validation before moving on.

If you get stuck, ask for a hint about the next step or for an explanation of an error before asking for a complete implementation. Some difficult phases also have collapsible hints: open Hint 1 first, then reveal another only if needed. The goal is to make the decisions and write the code yourself. The complete automated test suite is introduced in Phase 19; earlier validations are focused build, smoke, and manual checks.

## Build tracker

Mark each phase when its expected result works in your checkout.

- [ ] [00: Overview](docs/00-overview.md) — draw the architecture and failure boundaries
- [ ] [01: Environment](docs/01-environment-setup.md) — verify the local toolchain
- [ ] [02: Workspace](docs/02-monorepo-setup.md) — create the pnpm and Turbo root
- [ ] [03: API](docs/03-api-setup.md) — serve `GET /health`
- [ ] [04: Web](docs/04-web-setup.md) — build and render the React shell
- [ ] [05: Worker](docs/05-worker-setup.md) — start a Nest context without an HTTP port
- [ ] [06: Services](docs/06-postgres-and-redis.md) — run healthy local PostgreSQL and Redis
- [ ] [07: TypeORM](docs/07-typeorm-setup.md) — connect both apps and run migrations
- [ ] [08: Domain](docs/08-domain-model.md) — migrate import and row tables
- [ ] [09: Contracts](docs/09-shared-contracts-with-zod.md) — validate customer rows at runtime
- [ ] [10: Upload endpoint](docs/10-create-import-endpoint.md) — persist a file and pending import
- [ ] [11: Queue](docs/11-bullmq-setup.md) — enqueue the import ID
- [ ] [12: Worker](docs/12-csv-processing-worker.md) — consume and inspect a queued import
- [ ] [13: CSV processing](docs/13-import-row-validation.md) — persist valid and invalid row outcomes
- [ ] [14: Progress API](docs/14-import-status-and-progress.md) — query durable summaries and pages
- [ ] [15: Upload UI](docs/15-frontend-import-upload.md) — submit a file from the browser
- [ ] [16: Import list](docs/16-frontend-import-list.md) — browse paginated history
- [ ] [17: Details](docs/17-frontend-import-details.md) — view rows and live progress
- [ ] [18: Recovery](docs/18-error-handling-and-retries.md) — retry and reconcile safely
- [ ] [19: Tests](docs/19-tests.md) — protect the main contracts and failure boundaries
- [ ] [20: Final review](docs/20-final-review.md) — run and explain the finished application

## Before you begin

Read [Phase 01: Environment setup](docs/01-environment-setup.md) for the current tool requirements. You will need Node.js, pnpm, Docker with Compose, and Git. The API and worker run locally; Docker Compose is used for PostgreSQL and Redis.

The path intentionally keeps the first version small: one CSV shape, a local directory shared by the API and worker, polling in the browser, and no authentication. [Phase 00](docs/00-overview.md) explains the boundaries and trade-offs.
