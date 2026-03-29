# Architecture Overview

## Purpose
This repository is organized as a multi-service platform with strict separation between frontend, backend, shared code, and infrastructure assets. The architecture prioritizes production readiness, secure defaults, and clear boundaries between layers.

## Repository Layout
```
/ (repo root)
├── backend/                 # Node/Express services + domain modules
│   ├── src/
│   │   ├── api/v1/           # Versioned REST controllers + routes
│   │   ├── config/           # Environment configuration
│   │   ├── models/           # Domain models
│   │   ├── services/         # Business logic services
│   │   └── utils/            # Backend utilities
│   ├── services/            # Dedicated AI/Blockchain/XR services
│   └── tests/               # Unit + integration tests
├── common/
│   └── types/               # Shared TypeScript types + contracts
├── frontend/                # React/Next.js compatible frontend
│   └── src/
│       ├── components/       # Reusable UI components
│       ├── contexts/         # Context providers
│       ├── pages/            # Route-level UI
│       ├── services/         # API adapters
│       ├── styles/           # Tailwind + theme configuration
│       └── utils/            # Frontend utilities
├── database/                # SQL schema, migrations, seeds
├── infrastructure/          # K8s, monitoring, logging assets
├── docs/                    # Architecture notes and guides
├── scripts/                 # Local automation scripts
├── nginx/                   # Reverse proxy configuration
└── .github/                 # CI/CD workflows
```

## Technology Stack
- **Frontend:** React/Next.js with TypeScript and Tailwind CSS.
- **Backend:** Node.js with Express, TypeScript, and structured middleware.
- **API Gateway:** Dedicated Express service for routing, rate limiting, and request normalization.
- **Datastores:** PostgreSQL, MongoDB, Redis.
- **CI/CD:** GitHub Actions with linting, tests, and build steps.

## Code Organization Principles
- API controllers live in `backend/src/api/v1/controllers` and must remain thin.
- Business logic belongs in `backend/src/services`.
- Shared types live in `common/types` and are imported by both backend and frontend.
- Frontend UI components live in `frontend/src/components` with no direct access to backend internals.

## Security Guidelines
- Authenticate via JWT with short-lived access tokens and refresh tokens stored securely.
- Validate all input at the API boundary with schema validators.
- Enforce RBAC (role-based access control) within middleware.
- Encrypt secrets and never commit credentials.

## Testing Guidelines
- Backend tests live in `backend/tests` and cover controllers, services, and auth.
- Frontend tests live in `frontend/tests` and cover components and stores.
- Integration tests verify service boundaries and gateway routing.

## Roadmap Notes
- Introduce database migrations and seeded fixtures in `backend/src/db`.
- Add observability stack configuration in `docs/observability.md`.
- Expand CI/CD to include security scans and container builds.
