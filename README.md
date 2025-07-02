# RentEzy Backend

![RentEzy Logo](./docs/logo.png)

A comprehensive microservices-based backend for the RentEzy property management platform. RentEzy streamlines property listings, bookings, rent payments, and tenant-landlord communication with a fault-tolerant, scalable architecture.

---

## Table of Contents

1. [Features](#features)
2. [Architecture](#architecture)
3. [Microservices](#microservices)
4. [Getting Started](#getting-started)

   * [Prerequisites](#prerequisites)
   * [Local Development](#local-development)
5. [API Documentation](#api-documentation)
6. [Event Schemas & Topics](#event-schemas--topics)
7. [Deployment](#deployment)
8. [Observability](#observability)
9. [Contributing](#contributing)
10. [License](#license)

---

## Features

* **API Gateway** with JWT authentication and rate limiting
* **Auth Service** (signup, login, roles, token management)
* **Property Service** (CRUD for listings)
* **Booking Service** with concurrency-safe transactional locking
* **Schedule Visit Service** for viewing appointments
* **Rent Service** (recurring payments, late fees, Celery scheduling)
* **Chat Service** (real-time messaging via Django Channels)
* **Notification Service** (in-app, email, SMS alerts)
* **Search Service** (Elasticsearch indexing & querying)
* **Event-Driven Integration** using Apache Kafka
* **Background Tasks** via Celery & Redis
* **Kubernetes Ready**: Docker images, health checks, Helm charts

---

## Architecture

![Architecture Diagram](./docs/architecture.png)

1. **Clients** (Web, Mobile) communicate with the **API Gateway**.
2. Gateway routes to domain-specific services:

   * Auth, Property, Booking, Rent, Schedule, Chat, Notification, Search.
3. Domain events are published to Kafka topics and consumed by interested services (e.g., Search Consumer, Notification Consumer).
4. Celery processes background tasks (rent cycles, reminders, failed payments).
5. PostgreSQL stores persistent data; Redis serves as broker & cache.
6. Elasticsearch powers full-text search.
7. Deployed on Kubernetes (AWS EKS) with Helm charts and CI/CD.

---

## Microservices

| Service              | Function                               | Port | Tech Stack      |
| -------------------- | -------------------------------------- | ---- | --------------- |
| API Gateway          | Entry point, routing, auth, rate limit | 8000 | Django          |
| Auth Service         | User management, JWT                   | 8001 | Django REST     |
| Property Service     | Listing CRUD, image uploads            | 8002 | Django REST     |
| Booking Service      | Booking transactions, locking          | 8003 | Django REST     |
| Schedule Visit       | View scheduling                        | 8004 | Django REST     |
| Rent Service         | Payment cycles, Stripe integration     | 8005 | Django REST     |
| Chat Service         | WebSocket chat, Django Channels        | 8006 | Django Channels |
| Notification Service | In-app / email / SMS notifications     | 8007 | Django REST     |
| Search Service       | Indexing & query layer                 | 8008 | FastAPI + ES    |

---

## Getting Started

### Prerequisites

* Docker & Docker Compose
* Kubernetes CLI (`kubectl`)
* Helm 3
* Python 3.9+
* Node.js (for API docs UI)

### Local Development

1. **Clone the repo**

   ```bash
   git clone https://github.com/AdilAbubacker/rentezy_backend.git
   cd rentezy_backend
   ```

2. **Environment Variables**
   Copy `.env.example` to `.env` and fill in:

   * `DATABASE_URL`
   * `KAFKA_BOOTSTRAP_SERVERS`
   * `ELASTICSEARCH_URL`
   * `REDIS_URL`
   * `STRIPE_SECRET_KEY`

3. **Docker Compose**

   ```bash
   docker-compose -f docker-compose.dev.yml up --build
   ```

4. **Run Migrations & Seed**

   ```bash
   docker exec -it api-gateway python manage.py migrate
   docker exec -it api-gateway python manage.py loaddata initial_data.json
   ```

5. **Access Services**

   * API Gateway: [http://localhost:8000](http://localhost:8000)
   * Swagger UI: [http://localhost:8000/api/docs/](http://localhost:8000/api/docs/)

---

## API Documentation

All services expose Swagger/OpenAPI docs. Access via:

* API Gateway: `GET /api/docs/`
* [Auth Service Docs](http://localhost:8001/docs)
* [Property Service Docs](http://localhost:8002/docs)
* ...

For detailed contract definitions, see the `docs/openapi/` folder.

---

## Event Schemas & Topics

| Topic              | Producer         | Consumers            | Payload Schema         |
| ------------------ | ---------------- | -------------------- | ---------------------- |
| `booking.created`  | Booking Service  | Notification, Search | `booking_created.json` |
| `rent.payment_due` | Rent Service     | Notification         | `rent_due.json`        |
| `property.index`   | Property Service | Search Consumer      | `property_index.json`  |
| ...                |                  |                      |                        |

Schemas live in `schemas/` for reference.

---

## Deployment

1. Build and push Docker images:

   ```bash
   make docker-build ALL_SERVICES
   make docker-push ALL_SERVICES
   ```
2. Deploy to Kubernetes via Helm:

   ```bash
   helm repo add rentezy https://adilabubacker.github.io/rentezy-charts
   helm upgrade --install rentezy rentezy/rentezy-backend --namespace rentezy --create-namespace
   ```

---

## Observability

* **Logging**: JSON-structured logs to stdout (ELK-friendly).
* **Metrics**: Prometheus exporters on each service at `/metrics`.
* **Tracing**: OpenTelemetry integration ready (export to Jaeger).

---

## Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Open a Pull Request

Please follow the [Code of Conduct](./CODE_OF_CONDUCT.md).

---
flowchart LR
  subgraph Clients
    A[React Frontend]
    B[Mobile App]
  end

  subgraph “API Gateway”
    GW
  end

  subgraph “Auth Service”
    Auth
  end

  subgraph “Core Services”
    Prop[Property Service]
    Book[Booking Service]
    Rent[Rent Service]
    Visit[Schedule Visit Service]
  end

  subgraph “Auxiliary Services”
    Chat[Chat Service]
    Notif[Notification Service]
    Search[Search Service]
  end

  subgraph “Event Bus”
    Kafka
  end

  subgraph “Datastores”
    PG[(PostgreSQL)]
    ES[(Elasticsearch)]
    RD[(Redis)]
  end

  subgraph “Background Worker”
    Celery
  end

  A -->|HTTPS| GW
  B -->|HTTPS| GW

  GW --> Auth
  GW --> Prop
  GW --> Book
  GW --> Rent
  GW --> Visit
  GW --> Chat
  GW --> Notif
  GW --> Search

  Auth --> PG

  Prop --> PG
  Book --> PG
  Rent --> PG
  Visit --> PG

  Book -->|produce booking.events| Kafka
  Rent -->|produce rent.events| Kafka
  Visit -->|produce visit.events| Kafka

  Kafka --> Search
  Kafka --> Notif

  Search --> ES
  Notif --> RD
  Chat --> RD

  Celery --> Rent
  Celery --> Notif


## License

This project is licensed under the MIT License. See [LICENSE](./LICENSE) for details.
