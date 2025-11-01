```mermaid

%% RentEzy — High-level Architecture (flowchart-style, like the screenshot)
flowchart LR
  %% layout hints
  %%{init: {'flowchart': {'curve': 'basis'}} }%%

  %% Clients / Edge
  subgraph Clients[ ]
    Manager[UI / APP<br/>for Landlords]
    Customer[UI / APP<br/>for Customers]
  end
  LB[Load Balancer / API Gateway]

  Manager --- LB
  Customer --- LB

  %% Core Services
  subgraph Services[ ]
    direction TB
    PropertySvc[[Property Service]]
    SearchSvc[[Search Service]]
    BookingSvc[[Booking Service]]
    PaymentSvc[[Payment Service (Stripe)]]
  end

  LB --> PropertySvc
  LB --> SearchSvc
  LB --> BookingSvc
  LB --> PaymentSvc

  %% Data Stores & Infra
  subgraph Stores[ ]
    direction TB
    subgraph PG[Property DB — PostgreSQL Cluster]
      PGPrimary[(Primary)]
      PGReplica1[(Replica 1)]
      PGReplica2[(Replica 2)]
    end
    ES[(Elastic Search<br/>Cluster)]
    CDN[(Content Delivery<br/>Network)]
  end

  PropertySvc --> PGPrimary
  PGPrimary --> PGReplica1
  PGPrimary --> PGReplica2
  PropertySvc --> CDN

  %% Kafka backbone
  subgraph Kafka[Kafka]
    direction TB
    topicProps[(topic: property-events)]
    topicBookings[(topic: booking-events)]
    topicPayments[(topic: payment-events)]
    DLQ[(Dead-Letter Queue)]
  end

  %% Producers
  PropertySvc -- publish --> topicProps
  BookingSvc  -- publish --> topicBookings
  PaymentSvc  -- publish --> topicPayments

  %% Consumers
  subgraph Consumers[ ]
    direction TB
    SearchConsumer[[Search Kafka Consumer]]
    NotifyConsumer[[Notification Kafka Consumer]]
  end

  topicProps --> SearchConsumer
  SearchConsumer --> ES

  topicProps --> NotifyConsumer
  topicBookings --> NotifyConsumer
  topicPayments --> NotifyConsumer
  NotifyConsumer --> LB

  %% Read path
  SearchSvc --> ES

  %% Styling to match the look of the screenshot
  classDef client fill:#c6e9c6,stroke:#2e7d32,stroke-width:1px,color:#1b5e20;
  classDef gateway fill:#efefef,stroke:#616161,stroke-width:1px,color:#263238;
  classDef service fill:#cfe8ff,stroke:#1e88e5,stroke-width:1px,color:#0d47a1;
  classDef store fill:#f8b4b4,stroke:#d32f2f,stroke-width:1px,color:#b71c1c;
  classDef broker fill:#ffcccb,stroke:#c62828,stroke-width:1px,color:#6d1b1b;
  classDef consumer fill:#cde7f0,stroke:#0288d1,stroke-width:1px,color:#01579b;

  class Manager,Customer client
  class LB gateway
  class PropertySvc,SearchSvc,BookingSvc,PaymentSvc service
  class PG,PGPrimary,PGReplica1,PGReplica2,ES,CDN store
  class Kafka,topicProps,topicBookings,topicPayments,DLQ broker
  class SearchConsumer,NotifyConsumer consumer


```
