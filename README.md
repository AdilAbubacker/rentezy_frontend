### 🔍 Search Service Architecture

To handle large-scale search queries efficiently, RentEzy separates the **Search Service** (query layer) from the **Search Consumer** (indexing layer).

- **Property Service (PostgreSQL)** handles CRUD for landlords — structured, low-frequency writes.
- **Kafka** acts as the async event bridge between the property DB and search index.
- **Search Consumer** listens to property events and updates **Elasticsearch**, ensuring eventual consistency.
- **Search Service** focuses solely on read queries, scaling horizontally to handle high traffic.

This separation ensures:
- Independent scaling for read-heavy and write-light workloads.
- Search uptime independent of data ingestion.
- Replayable Kafka streams for reindexing or schema migrations.


### 🔍 Search Indexing Flow

```mermaid
graph TD
    UI_APP_CUSTOMERS["UI / APP for Customers"]
    SEARCH_SERVICE["Search Service (Queries)"]
    PROPERTY_SERVICE["Property Service (Writes)"]
    POSTGRESQL_DB[(PostgreSQL DB)]
    KAFKA_BROKER{Kafka}
    SEARCH_CONSUMER["Search Consumer (Indexing)"]
    ELASTICSEARCH_CLUSTER[(Elasticsearch Cluster)]

    UI_APP_CUSTOMERS --> SEARCH_SERVICE
    SEARCH_SERVICE -- "Search Queries" --> ELASTICSEARCH_CLUSTER

    PROPERTY_SERVICE -- "Writes / Reads" --> POSTGRESQL_DB
    PROPERTY_SERVICE -- "Property Events" --> KAFKA_BROKER

    KAFKA_BROKER -- "Search Events" --> SEARCH_CONSUMER
    SEARCH_CONSUMER -- "Indexes Data" --> ELASTICSEARCH_CLUSTER
```

```mermaid
flowchart LR
Manager["UI / App for Landlords"]
Customer["UI / App for Customers"]
LB["Load Balancer / API Gateway"]

PropertySvc["Property Service"]
SearchSvc["Search Service"]
BookingSvc["Booking Service"]
PaymentSvc["Payment Service (Stripe)"]

PGPrimary["PostgreSQL Primary"]
PGReplica1["Replica 1"]
PGReplica2["Replica 2"]

ES["Elasticsearch Cluster"]
CDN["Content Delivery Network"]

topicProps["Kafka topic: property-events"]
topicBookings["Kafka topic: booking-events"]
topicPayments["Kafka topic: payment-events"]
DLQ["Kafka Dead-Letter Queue"]

SearchConsumer["Search Kafka Consumer"]
NotifyConsumer["Notification Kafka Consumer"]

Manager --- LB
Customer --- LB

LB --> PropertySvc
LB --> SearchSvc
LB --> BookingSvc
LB --> PaymentSvc

PropertySvc --> PGPrimary
PGPrimary --> PGReplica1
PGPrimary --> PGReplica2
PropertySvc --> CDN

PropertySvc -- publish --> topicProps
BookingSvc -- publish --> topicBookings
PaymentSvc -- publish --> topicPayments
topicPayments --> DLQ

topicProps --> SearchConsumer
SearchConsumer --> ES

topicProps --> NotifyConsumer
topicBookings --> NotifyConsumer
topicPayments --> NotifyConsumer
NotifyConsumer --> LB

SearchSvc --> ES

```
