# Docker, Kubernetes, and Deployment

## What is Docker and how does it relate to Spring Boot applications? <Badge type="tip" text="easy" />

::: details View Answer
Docker is an open-source platform that automates the deployment, scaling, and management of applications within lightweight, portable, and self-sufficient containers. 
For Spring Boot applications, Docker provides a consistent environment from development to production. Since a Spring Boot application typically compiles to a standalone JAR file containing an embedded server, it is an ideal candidate for containerization. You simply package the JAR along with a Java Runtime Environment (JRE) into a Docker image, which can then run reliably on any system that has Docker installed.
:::

## How do you create a Dockerfile for a basic Spring Boot application? <Badge type="tip" text="easy" />

::: details View Answer
A `Dockerfile` is a text document that contains the instructions used to build a Docker image. For a Spring Boot application, a basic `Dockerfile` typically uses a minimal JRE base image, copies the application JAR, and defines the startup command.

```dockerfile
# Use a lightweight JRE base image
FROM eclipse-temurin:17-jre-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the packaged JAR file into the container
COPY target/my-spring-boot-app.jar app.jar

# Expose the application port
EXPOSE 8080

# Run the Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]
```
:::

## What is the purpose of a `.dockerignore` file when containerizing a Spring Boot app? <Badge type="tip" text="easy" />

::: details View Answer
The `.dockerignore` file functions similarly to a `.gitignore` file. It allows you to specify files and directories that should be excluded from the Docker build context when creating an image.
By ignoring unnecessary files (such as the `.git` directory, IDE configurations like `.idea`, or raw source code if you are only copying the built JAR), you reduce the size of the build context sent to the Docker daemon. This speeds up the build process and prevents sensitive or redundant files from accidentally being included in the image.
:::

## How can you use Docker Compose to run a Spring Boot application and a database together? <Badge type="warning" text="medium" />

::: details View Answer
Docker Compose is a tool for defining and running multi-container Docker applications using a YAML file. It is extremely useful for running a Spring Boot app alongside dependencies like a PostgreSQL or MySQL database.

```yaml
version: '3.8'
services:
  db:
    image: postgres:15
    environment:
      POSTGRES_USER: myuser
      POSTGRES_PASSWORD: mypassword
      POSTGRES_DB: mydb
    ports:
      - "5432:5432"

  app:
    build: .
    ports:
      - "8080:8080"
    environment:
      SPRING_DATASOURCE_URL: jdbc:postgresql://db:5432/mydb
      SPRING_DATASOURCE_USERNAME: myuser
      SPRING_DATASOURCE_PASSWORD: mypassword
    depends_on:
      - db
```
In this `docker-compose.yml`, the Spring Boot `app` service connects to the `db` service using the service name `db` as the hostname.
:::

## What is Spring Boot's Cloud Native Buildpacks support (e.g., `spring-boot:build-image`)? <Badge type="warning" text="medium" />

::: details View Answer
Spring Boot 2.3+ introduced out-of-the-box support for Cloud Native Buildpacks, allowing you to generate OCI-compliant Docker images directly via Maven or Gradle without writing a `Dockerfile`.

With Maven, you run:
```bash
./mvnw spring-boot:build-image
```
This approach automatically determines the best base image, layers your application efficiently (separating dependencies from application code), and provides a secure, optimized container image. It simplifies containerization by removing the need to manually maintain Dockerfiles.
:::

## How can you externalize configuration (e.g., database credentials) in a Dockerized Spring Boot app? <Badge type="warning" text="medium" />

::: details View Answer
Spring Boot provides relaxed binding and allows overriding properties via environment variables. In a Dockerized environment, you typically pass configuration through environment variables when running the container.
For a property like `spring.datasource.password`, the corresponding environment variable is `SPRING_DATASOURCE_PASSWORD`.

Run the Docker container like this:
```bash
docker run -e SPRING_DATASOURCE_PASSWORD=supersecret -p 8080:8080 my-spring-boot-app
```
This is the recommended way to inject environment-specific configuration and secrets into Docker containers.
:::

## What is layered JAR packaging in Spring Boot and why is it useful for Docker images? <Badge type="warning" text="medium" />

::: details View Answer
A fat JAR contains all application classes and their dependencies. When building a Docker image by just copying the fat JAR, any small change to the application code requires Docker to rebuild the entire layer containing the JAR, which is slow and wastes storage.

Spring Boot supports **layered JARs**, which separate the JAR contents into logical layers:
1. `dependencies` (infrequently changed)
2. `spring-boot-loader`
3. `snapshot-dependencies`
4. `application` (frequently changed application classes)

By extracting these layers and copying them into the Docker image step-by-step, Docker can cache the dependencies layer. If you only change your application code, Docker only rebuilds the final, very small `application` layer, making builds significantly faster and images smaller.
:::

## What is Kubernetes (K8s) and why would you use it for Spring Boot apps? <Badge type="tip" text="easy" />

::: details View Answer
Kubernetes is an open-source container orchestration platform that automates the deployment, scaling, and management of containerized applications.
For Spring Boot applications, K8s provides:
- **High Availability & Auto-scaling**: Automatically scales pods up or down based on traffic/CPU usage.
- **Self-healing**: Restarts failed Spring Boot containers automatically.
- **Service Discovery & Load Balancing**: Routes traffic effectively to healthy Spring Boot instances.
- **Configuration Management**: Manages external configurations and secrets.
:::

## How do you define a Kubernetes Deployment for a Spring Boot application? <Badge type="warning" text="medium" />

::: details View Answer
A Kubernetes `Deployment` manages a set of identical pods, ensuring the specified number of replicas are running and managing updates.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: spring-boot-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: spring-boot-app
  template:
    metadata:
      labels:
        app: spring-boot-app
    spec:
      containers:
      - name: spring-boot-app
        image: myrepo/my-spring-boot-app:1.0.0
        ports:
        - containerPort: 8080
```
This YAML creates a deployment with 3 replicas of the Spring Boot application.
:::

## What are Readiness and Liveness Probes in Kubernetes, and how does Spring Boot Actuator support them? <Badge type="warning" text="medium" />

::: details View Answer
- **Liveness Probe**: Checks if the container is running and healthy. If it fails, K8s kills the container and restarts it.
- **Readiness Probe**: Checks if the container is ready to accept HTTP traffic. If it fails, K8s stops sending requests to this pod.

Spring Boot Actuator (version 2.3+) automatically provides endpoints for these probes when deployed in a Kubernetes environment:
- Liveness: `/actuator/health/liveness`
- Readiness: `/actuator/health/readiness`

You configure them in the Pod spec:
```yaml
livenessProbe:
  httpGet:
    path: /actuator/health/liveness
    port: 8080
  initialDelaySeconds: 10
readinessProbe:
  httpGet:
    path: /actuator/health/readiness
    port: 8080
  initialDelaySeconds: 10
```
:::

## How do you expose a Spring Boot application running in Kubernetes to the outside world? <Badge type="warning" text="medium" />

::: details View Answer
To expose an application, you first create a **Service** (usually of type `ClusterIP` or `NodePort`) to provide a stable internal IP. Then, you typically use an **Ingress** resource to route external HTTP/HTTPS traffic to the Service.

```mermaid
graph LR
    Client((Client)) --> Ingress[Ingress Controller\n(e.g., NGINX)]
    Ingress -- Host/Path Routing --> Service[K8s Service]
    Service -- Load Balancing --> Pod1[Spring Boot Pod 1]
    Service -- Load Balancing --> Pod2[Spring Boot Pod 2]
```

Example Service:
```yaml
apiVersion: v1
kind: Service
metadata:
  name: spring-boot-service
spec:
  selector:
    app: spring-boot-app
  ports:
    - protocol: TCP
      port: 80
      targetPort: 8080
```
:::

## How can you inject configuration properties into a Spring Boot app using Kubernetes ConfigMaps? <Badge type="warning" text="medium" />

::: details View Answer
A `ConfigMap` allows you to decouple environment-specific configuration from your container images.
You can inject a ConfigMap into a Spring Boot pod as environment variables or as a mounted file (e.g., `application.properties`).

**ConfigMap Definition:**
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  SPRING_PROFILES_ACTIVE: "prod"
```

**Deployment Spec Injection:**
```yaml
containers:
- name: spring-boot-app
  image: my-app
  envFrom:
  - configMapRef:
      name: app-config
```
Spring Boot will read `SPRING_PROFILES_ACTIVE` as an environment variable and activate the `prod` profile.
:::

## How do you securely manage sensitive data like API keys in Kubernetes for a Spring Boot app? <Badge type="danger" text="hard" />

::: details View Answer
Sensitive data should be stored in Kubernetes `Secrets`, not ConfigMaps. Secrets are base64 encoded and can be encrypted at rest by the K8s cluster.

You inject them into the Spring Boot Pod similarly to ConfigMaps, usually as environment variables.

**Secret Definition:**
```yaml
apiVersion: v1
kind: Secret
metadata:
  name: db-credentials
type: Opaque
data:
  # Base64 encoded 'mysecretpassword'
  SPRING_DATASOURCE_PASSWORD: bXlzZWNyZXRwYXNzd29yZA==
```

**Deployment Spec Injection:**
```yaml
envFrom:
- secretRef:
    name: db-credentials
```
:::

## Explain how you would implement Zero Downtime Deployment for a Spring Boot app in Kubernetes. <Badge type="danger" text="hard" />

::: details View Answer
Zero Downtime Deployment ensures that application updates do not drop active user requests. In Kubernetes, this is achieved via **Rolling Updates** combined with proper **Readiness Probes** and **Graceful Shutdown**.

1. **RollingUpdate Strategy**: Configure the Deployment strategy so Kubernetes replaces old pods with new ones gradually.
2. **Readiness Probes**: Prevent Kubernetes from sending traffic to a new pod until Spring Boot has fully started and initialized its context (using `/actuator/health/readiness`).
3. **Graceful Shutdown**: Configure Spring Boot to wait for active requests to finish before shutting down.
   ```properties
   server.shutdown=graceful
   spring.lifecycle.timeout-per-shutdown-phase=30s
   ```
4. Kubernetes will send a `SIGTERM` signal to the old pod. Spring Boot's graceful shutdown intercepts this, stops accepting new requests, and finishes processing current ones.
:::

## What is Spring Cloud Kubernetes and how does it help? <Badge type="danger" text="hard" />

::: details View Answer
Spring Cloud Kubernetes provides integrations to make Spring Boot applications more Kubernetes-native. 
Key features include:
- **DiscoveryClient**: Enables querying Kubernetes services for service discovery (useful if you use Spring Cloud LoadBalancer).
- **PropertySource**: Automatically reads Kubernetes `ConfigMaps` and `Secrets` directly from the K8s API into the Spring Environment, without needing to mount them as environment variables or files in the Pod spec.
- **Leader Election**: Provides leadership election mechanisms using Kubernetes ConfigMaps or Leases for scheduled tasks.

*Note: Accessing the K8s API directly requires granting specific RBAC roles to the Pod's ServiceAccount.*
:::

## How do you handle application logs for a Spring Boot app running in a Kubernetes cluster? <Badge type="danger" text="hard" />

::: details View Answer
In Kubernetes, applications should write logs to standard output (`stdout`) and standard error (`stderr`). 
1. **Spring Boot Configuration**: By default, Spring Boot logs to the console, which is perfect for K8s. You might want to format logs as JSON for easier parsing using tools like Logstash Encoder.
2. **Log Aggregation**: A node-level logging agent (like Fluentd, Fluent Bit, or Promtail) deployed as a DaemonSet captures the `stdout` logs from all containers on that node.
3. **Centralized Storage**: The agent forwards the logs to a centralized logging backend like the ELK stack (Elasticsearch, Logstash, Kibana) or Loki for querying, alerting, and visualization.
:::

## What are init containers in Kubernetes and when might you use one with a Spring Boot application? <Badge type="danger" text="hard" />

::: details View Answer
Init containers are specialized containers that run before the main application containers in a Pod. They must complete successfully before the main container starts.
Use cases for a Spring Boot app:
- **Waiting for Dependencies**: Using a simple script (like `netcat`) to wait until a database service or external API is fully available before starting the Spring Boot app.
- **Database Migrations**: Running a Flyway or Liquibase migration image as an init container to ensure the database schema is up-to-date before the Spring Boot application boots up.
:::

## How do you manage database migrations (e.g., Flyway/Liquibase) during deployment in a Kubernetes environment? <Badge type="warning" text="medium" />

::: details View Answer
There are three common approaches:
1. **On Application Startup**: (Default Spring Boot behavior) Flyway/Liquibase runs when the Spring ApplicationContext starts. In K8s, if multiple replicas start simultaneously, they might race, though tools like Flyway use database locks to handle this safely.
2. **Kubernetes Init Containers**: Run the migration tool in an init container. The main Spring Boot container only starts once the init container completes the migration.
3. **Kubernetes Jobs**: Define a pre-deployment step in your CI/CD pipeline that creates a Kubernetes `Job` to run the migration container before applying the `Deployment` update for the Spring Boot application. This cleanly decouples migration from application startup.
:::

## How would you monitor a Spring Boot application deployed on Kubernetes using Prometheus and Grafana? <Badge type="danger" text="hard" />

::: details View Answer
1. **Add Dependencies**: Include `spring-boot-starter-actuator` and `micrometer-registry-prometheus` in your `pom.xml` or `build.gradle`.
2. **Expose Endpoint**: Expose the Prometheus endpoint in `application.properties`:
   ```properties
   management.endpoints.web.exposure.include=prometheus,health,info
   ```
3. **Kubernetes ServiceMonitor**: If using the Prometheus Operator, create a `ServiceMonitor` custom resource that tells Prometheus to scrape the `/actuator/prometheus` endpoint of your Spring Boot Pods.
4. **Grafana Dashboards**: Import a pre-built JVM/Spring Boot dashboard (e.g., from Grafana dashboards library) and point it to your Prometheus data source to visualize JVM memory, CPU, garbage collection, and HTTP request metrics.
:::

## What is Helm, and how can it simplify the deployment of a Spring Boot application in Kubernetes? <Badge type="warning" text="medium" />

::: details View Answer
Helm is the package manager for Kubernetes. It uses a packaging format called **Charts**, which are collections of files that describe a related set of Kubernetes resources.
Instead of manually maintaining dozens of YAML files (Deployment, Service, Ingress, ConfigMap, Secret) for your Spring Boot application across different environments (dev, staging, prod), Helm allows you to:
- Template your YAML files.
- Group the resources into a single deployable artifact (the Chart).
- Define variables in a `values.yaml` file (e.g., overriding the image tag, replica count, or environment variables per environment).
- Easily rollback to a previous version if a deployment fails.
:::