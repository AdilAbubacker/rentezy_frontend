RentEzy - A Scalable Property Management PlatformRentEzy is a comprehensive property management and rental platform built on a modern, event-driven microservices architecture. It is designed for high availability, fault tolerance, and horizontal scalability, handling everything from property listings and user chats to complex, concurrency-safe booking and automated payments.This project is a demonstration of a distributed system designed to solve real-world engineering challenges.🚀 Key Engineering & Architectural FeaturesThis platform was built from the ground up to be scalable, resilient, and maintainable. Here are the core technical highlights:Event-Driven Microservices: The entire system is built on a loosely coupled architecture with 10+ independent services (see diagram below). Services communicate asynchronously using Apache Kafka as an event broker, which ensures system resilience, fault tolerance, and eliminates single points of failure.Concurrency-Safe Bookings: Solves the classic "race condition" problem in bookings. The system uses a robust, database-first approach to ensure booking integrity. By combining transaction.atomic() with F() expression updates and a database-level CheckConstraint (available_slots >= 0), the system guarantees that property viewings are booked reliably without conflicts or double-bookings, even under high concurrent load.# This implementation avoids a classic get-then-save race condition
# by enforcing constraints at the database level.

# --- models.py ---
class ClassSession(models.Model):
    available_slots = models.IntegerField()

    class Meta:
        constraints = [
            # Never allow available_slots to go negative
            models.CheckConstraint(
                check=Q(available_slots__gte=0),
                name="available_slots_non_negative"
            )
        ]

# --- views.py ---
try:
    with transaction.atomic(): 
        # 1. Create the booking
        booking = Booking.objects.create(
            session_id=session_id,
            client_name=client_name,
            client_email=client_email
        )

        # 2. Atomically decrement slot count at the DB level
        ClassSession.objects.filter(id=session_id).update(
            available_slots=F("available_slots") - 1
        )

except IntegrityError as e:
    # 3. Catch the DB-level constraint violation
    msg = str(e).lower()
    if "available_slots_non_negative" in msg:
        return Response({"detail": "Session is fully booked."}, 
                        status=status.HTTP_400_BAD_REQUEST)
    return Response({"detail": "Booking failed: " + msg}, 
                    status=status.HTTP_400_BAD_REQUEST)

return Response({"message": "Booking successful!", "booking_id": booking.id}, 
                status=status.HTTP_201_CREATED)

Automated Recurring Payments: A robust scheduling system using Celery Beat and Redis manages all automated tasks. This includes monthly recurring rent collection, automated late fee implementation, and real-time payment reminders, all securely processed via the Stripe API.Real-Time Communication: A stateful service built with Django Channels and WebSockets powers real-time chat between tenants and property managers. This same service is used for pushing event-driven, real-time notifications to users (e.g., "Your booking is confirmed").High-Performance Search: A dedicated search service leveraging Elasticsearch provides millisecond-level, full-text search across all property listings, with advanced filtering and faceting capabilities.Cloud-Native Deployment: The entire application is fully containerized with Docker and orchestrated using Kubernetes (AWS EKS). This allows for automated scaling of individual services based on demand. Persistent storage for stateful services is managed via AWS EFS.Centralized API Gateway: A custom API Gateway (built with Django) acts as the single, secure entry point for all client requests. It is responsible for authentication (JWT), service discovery, request routing, and rate limiting.🏛️ System Architecture DiagramThis diagram illustrates the event-driven flow of information between the key microservices.graph TD
    subgraph Client
        WebApp[React JS Client]
    end

    subgraph "Kubernetes Cluster (AWS EKS)"
        GW[API Gateway<br>(Django, JWT Auth, Routing)]

        subgraph "Core Services"
            Auth[Auth Service<br>(Django REST)]
            Prop[Property Service<br>(Django REST, PostgreSQL)]
            Book[Booking Service<br>(Django REST, PostgreSQL)]
            Rent[Rent Service<br>(Django REST, PostgreSQL)]
        end

        subgraph "Real-time Services"
            Chat[Chat Service<br>(Django Channels, WebSockets)]
            Notif[Notification Service<br>(Django Channels, WebSockets)]
        end

        subgraph "Search & Async Services"
            Search[Search Service<br>(Elasticsearch)]
            Celery[Celery Workers<br>(Redis Broker)]
            Beat[Celery Beat<br>(Scheduler)]
        end

        subgraph "Event Bus"
            Kafka[Apache Kafka<br>(Event Stream)]
        end
    end

    %% Client to Gateway
    WebApp -- REST API/WebSocket --> GW

    %% Gateway to Services
    GW -- /auth --> Auth
    GW -- /properties --> Prop
    GW -- /book --> Book
    GW -- /rent --> Rent
    GW -- /chat --> Chat
    GW -- /notifications --> Notif
    GW -- /search --> Search

    %% Kafka Event Producers
    Book -- Booking Event --> Kafka
    Prop -- Property Update Event --> Kafka
    Rent -- Payment Event --> Kafka
    Chat -- New Message Event --> Kafka

    %% Kafka Event Consumers
    Kafka -- Property Update --> Search
    Kafka -- Booking/Payment/Message --> Notif
    Kafka -- Booking Confirmed --> Rent

    %% Celery Tasking
    Beat -- Triggers Monthly --> Rent
    Rent -- Payment Task --> Celery
    Celery -- Executes Payment --> Stripe[Stripe API]
    Book -- Payment Failure --> Celery

🛡️ Security & Authentication ArchitectureThe platform uses a Centralized Authentication Pattern to ensure maximum security and separation of concerns. This design isolates all authentication logic to a single service, reducing the attack surface and simplifying all other internal services.Secure Gateway: All public traffic is routed through the api_gateway. All other microservices (e.g., booking_service, auth_service) are internal to the Kubernetes cluster and are not publicly accessible.Dedicated Auth Service: The api_gateway itself does not have the JWT secret key. It acts as an enforcer, not a validator.Token Validation Flow:A client sends a request with a JWT to the api_gateway.The api_gateway sends only the token to the auth_service.The auth_service (the only service with the secret key) validates the token.If valid, auth_service returns a success response with the user's data (e.g., user_id, role).Trusted Forwarding: The api_gateway then injects this trusted user data into the request headers (e.g., X-User-ID, X-User-Role) and forwards it to the appropriate internal service.Zero-Trust Services: The internal services (like booking_service) don't need to perform any authentication. They simply trust the incoming request from the gateway and use the X-User-ID header.Login & Rate Limiting: The gateway also routes login requests to the auth_service to mint new tokens and handles cross-cutting concerns like rate limiting.Authentication Flow DiagramsequenceDiagram
    actor Client
    participant API Gateway
    participant Auth Service
    participant Internal Service (e.g., Booking)

    alt Successful API Request
        Client->>API Gateway: GET /api/bookings (with JWT)
        API Gateway->>Auth Service: POST /validate (sends token)
        Note over Auth Service: Decodes & validates token
        Auth Service-->>API Gateway: 200 OK (returns user_id, role)
        API Gateway->>Internal Service: GET /bookings (injects X-User-ID)
        Internal Service-->>API Gateway: 200 OK (returns data)
        API Gateway-->>Client: 200 OK (returns data)
    else Invalid Token
        Client->>API Gateway: GET /api/bookings (with bad JWT)
        API Gateway->>Auth Service: POST /validate (sends token)
        Note over Auth Service: Validation fails
        Auth Service-->>API Gateway: 401 Unauthorized
        API Gateway-->>Client: 401 Unauthorized
    else Login Request
        Client->>API Gateway: POST /api/login (user/pass)
        API Gateway->>Auth Service: POST /login (user/pass)
        Note over Auth Service: Verifies credentials, generates new JWT
        Auth Service-->>API Gateway: 200 OK (returns new JWT)
        API Gateway-->>Client: 200 OK (returns new JWT)
    end

🛠️ Services OverviewThe repository is structured as a monorepo containing all independent services:api_gateway: Handles all incoming requests, authentication, and routing.auth_service: Manages user registration, login, and JWT token generation.property_service: CRUD operations for property listings and details.booking_service: Manages property viewing schedules and booking logic (with transactional locking).rent_service: Manages recurring payments, invoices, and Stripe integration.chat_service: WebSocket-based real-time chat.notification_service: WebSocket-based real-time notifications.search_service: Consumes from Kafka to update the Elasticsearch index.kafka, zookeeper: Configuration files for the Kafka cluster.redis: Configuration for Redis (Celery broker & cache).efs-role, storageclass: Kubernetes manifests for AWS EFS persistent storage.💻 Tech StackCategoryTechnologyBackendDjango, Django REST Framework, Django ChannelsFrontendReact.js, Redux Toolkit, Tailwind CSSDatabase & CachingPostgreSQL, Elasticsearch, RedisMessage BrokerApache KafkaTask QueuingCelery, Celery BeatDevOps & CloudDocker, Kubernetes, AWS EKS, AWS EFS, NginxPaymentsStripe APILanguagesPython, JavaScriptFeaturesSecure User Authentication (JWT)Detailed Property Listings with Search & FilteringReal-time Chat between UsersProperty Booking & Visit SchedulingAutomated Monthly Rent Payments (Stripe)Automated Late Fee & Reminder SystemReal-time NotificationsUser Profile Management
