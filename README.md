```mermaid

%% ---------------------------
%% RentEzy — Architecture Map
%% ---------------------------
flowchart LR
  %% Clients
  subgraph Clients
    L[UI / App\nfor Landlords]
    C[UI / App\nfor Customers]
  end

  LB[API Gateway / Load Balancer]
  CDN[Content Delivery Network]

  %% Services
  subgraph Services
    PS[Property Service\n(Django + DRF)]
    SS[Search Service\n(Django/FAST API)]
    NC[Notification Service]
    SC[Search Consumer\n(Kafka -> ES Indexer)]
  end

  %% Data + Infra
  subgraph Data & Infra
    PG[(PostgreSQL)]
    ES[(Elasticsearch Cluster)]
    K{{Kafka\n(property-events,\nsearch-index)}}
  end

  %% Flows
  L -->|CRUD Listings| LB --> PS
  L -->|Static Assets| CDN

  PS -->|Write| PG
  PS -- publish events --> K

  %% Indexing path
  K -- property_created/updated --> SC
  SC -->|Index/Update| ES

  %% Read path
  C -->|Search| LB --> SS --> ES

  %% Notifications
  K -- booking/alert events --> NC
  NC -->|WebSocket / Push| C
```
