```mermaid

%% RentEzy — High-level Architecture (GitHub-compatible version)
flowchart LR

subgraph Clients
  Manager[UI / APP for Landlords]
  Customer[UI / APP for Customers]
end

LB[Load Balancer / API Gateway]

Manager --> LB
Customer --> LB

subgraph Services
  PropertySvc[Property Service]
  SearchSvc[Search Service]
  BookingSvc[Booking Service]
  PaymentSvc[Payment Service (Stripe)]
end

LB --> PropertySvc
LB --> SearchSvc
LB --> BookingSvc
LB --> PaymentSvc

subgraph Databases
  subgraph PG[Property DB (PostgreSQL Cluster)]
    PGPrimary[(Primary)]
    PGReplica1[(Replica 1)]
    PGReplica2[(Replica 2)]
  end
  ES[(Elasticsearch Cluster)]
  CDN[(Content Delivery Network)]
end

PropertySvc --> PGPrimary
PGPrimary --> PGReplica1
PGPrimary --> PGReplica2
PropertySvc --> CDN

subgraph Kafka
  direction TB
  topicProps[(property-events)]
  topicBookings[(booking-events)]
  topicPayments[(payment-events)]
  DLQ[(Dead-Letter Queue)]
end

PropertySvc --> topicProps
BookingSvc --> topicBookings
PaymentSvc --> topicPayments

subgraph Consumers
  direction TB
  SearchConsumer[Search Kafka Consumer]
  NotifyConsumer[Notification Kafka Consumer]
end

topicProps --> SearchConsumer
SearchConsumer --> ES

topicProps --> NotifyConsumer
topicBookings --> NotifyConsumer
topicPayments --> NotifyConsumer
NotifyConsumer --> LB

SearchSvc --> ES



```
