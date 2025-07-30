# GraduationProjectDocs
the reports, diagrams and references for my 5tth year project 
----

System Design

![alt text](<System Design/System Architecture-Design-2.png>)


## Services 

### Events Service 

[Events Service](https://github.com/HasanKhadd0ur/SAS.EventsService)

### Detection Service 

[Detection Service](https://github.com/HasanKhadd0ur/SAS.DetectionService)

### Location Inference Service 

[Location Inference Service](https://github.com/HasanKhadd0ur/SAS.LocationInference)

### Scraping Agent
[Scraping Agent](https://github.com/HasanKhadd0ur/SAS.ScapingAgent)

### Scraping Management Service 

[Scraping Management Service](https://github.com/HasanKhadd0ur/SAS.ScrapingManagementService)

### API Gateway 

[API Gateway](https://github.com/HasanKhadd0ur/SAS.ApiGateway)
 

### UI Frontend
 
[Front End](https://github.com/HasanKhadd0ur/SAS.Frontend)

### Identity Service
 
[Identity Service](https://github.com/HasanKhadd0ur/SAS.IdentityService)

### Ner Service  

[NER Service](https://github.com/HasanKhadd0ur/SAS.NerServiced)


## 🔍 Why Microservices?

The system adopts microservices due to its requirements for:

* **Independent scalability**: Services can scale based on specific load requirements.
* **Technological flexibility**: Each service can use the most suitable tools and languages.
* **Continuous delivery**: Services can be deployed independently, supporting CI/CD pipelines.
* **Decoupled development**: Teams can work on services independently, speeding up development.

---

## 🧩 Services Overview

### 1. Scraping Agent Service

Responsible for extracting data from social media platforms according to assigned tasks. Implements `Pipes and Filters` and `Strategy` design patterns.

*
---

### 2. Event Detection Service

Processes social media data to detect events and generate summaries using a large language model and communicates with the location inference service.

---

### 3. Scraping Management Service

Handles the orchestration and scheduling of scraping tasks. Follows a master-worker communication model with the scraping agents.

---

### 4. Events Service

Manages detected events, user preferences, and notifications. Acts as a central storage and querying hub for event data.

---

### 5. Location Inference Service

Performs geolocation extraction from messages or events using NER tools or LLMs. Implements the `Strategy` design pattern for inference logic.


---

### 6. Identity Service

Handles user management, authentication (JWT), authorization, and role-based access control using `ASP.NET Identity`.

---

### 7. API Gateway Service

Acts as a reverse proxy and unified entry point for the system. Built using YARP to route incoming requests to appropriate internal services.


---

### 8. Frontend Service

A modular frontend application where each module reflects a backend service. Built with a vertical slice architecture.


---

## 🛠️ DevOps and Deployment

The system supports CI/CD using GitHub, Jenkins, and Docker:

* **Source Control**: Managed using Git and GitHub.
* **Automation**: Jenkins automates the build, test, and deployment pipelines.
* **Containerization**: Docker is used to encapsulate each service in an isolated environment for easy deployment and scaling.

---

## 📬 Communication Patterns

* **Message Queues**: Asynchronous communication via Kafka or RabbitMQ.
* **HTTP**: Synchronous request-response communication for critical services.
* **Distributed Services**: Some services are deployed multiple times based on domain specialization (e.g., localized event detection).

---

## 🧪 Testing and Quality

* **Unit and Integration Tests**: Implemented for each service to validate business logic and service interoperability.
* **Architecture Tests**: Ensure adherence to clean architecture principles (e.g., layer dependency rules).
* **Load and Stress Testing**: Validate system performance under high data throughput conditions.

---

## 👤 Authors & Contributors

To be completed...

