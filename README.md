```mermaid
flowchart LR

%% Clients / Edge
Manager[UI / App for Landlords]
Customer[UI / App for Customers]
LB[Load Balancer / API Gateway]

Manager --- LB
Customer --- LB

%% Core Services
subgraph Services
  direction TB
  PropertySvc[Property Service]
  SearchSvc[Search Service]
  BookingSvc[Booking Service]
  PaymentSvc[Payment Service (Stripe)]
end

LB --> PropertySvc
LB --> SearchSvc
LB --> BookingSvc
LB --> PaymentSvc

%% Data Stores
subgraph "Property DB — PostgreSQL"
  PGPrimary[(Primary)]
  PGReplica1[(Replica 1)]
  PGReplica2[(Replica 2)]
end

PropertySvc --> PGPrimary
PGPrimary --> PGReplica1
PGPrimary --> PGReplica2

ES[(Elasticsearch Cluster)]
CDN[(Content Delivery Network)]
PropertySvc --> CDN

%% Kafka Backbone
subgraph Kafka
  topicProps((property-events))
  topicBookings((booking-events))
  topicPayments((payment-events))
  DLQ((dead-letter-queue))
end

%% Producers
PropertySvc -- publish --> topicProps
BookingSvc -- publish --> topicBookings
PaymentSvc -- publish --> topicPayments

%% Consumers
SearchConsumer[Search Kafka Consumer]
NotifyConsumer[Notification Kafka Consumer]

topicProps --> SearchConsumer
SearchConsumer --> ES

topicProps --> NotifyConsumer
topicBookings --> NotifyConsumer
topicPayments --> NotifyConsumer
NotifyConsumer --> LB

%% Read path
SearchSvc --> ES



```
