# Docker & Docker Compose

> The complete containerization playbook — from running your first container to designing
> production-grade, multi-service stacks with security, observability, and CI/CD.

Docker packages applications and their dependencies into portable, reproducible containers
that run identically on any machine. Docker Compose extends this to multi-container
applications, letting you define an entire stack in a single YAML file.

## Tutorials

Long-form, progressive tutorials that take you from zero to production-ready:

### Fundamentals

- [Introduction & Architecture](./tutorials/introduction-and-architecture) — what containers are, Docker's architecture, installation
- [Running Containers](./tutorials/running-containers) — `docker run`, lifecycle, logs, exec, cleanup
- [Images & Dockerfiles](./tutorials/images-and-dockerfiles) — layers, every instruction, CMD vs ENTRYPOINT
- [Building & Optimizing Images](./tutorials/building-and-optimizing) — layer caching, multi-stage builds, base image strategy

### Networking & Storage

- [Docker Networking](./tutorials/networking) — bridge, host, overlay, DNS, port publishing, isolation
- [Volumes & Storage](./tutorials/volumes-and-storage) — named volumes, bind mounts, tmpfs, backup/restore

### Docker Compose

- [Compose Fundamentals](./tutorials/compose-fundamentals) — services, depends_on, healthchecks, env vars
- [Compose Networking & Storage](./tutorials/compose-networking-and-storage) — custom networks, isolation, volume patterns
- [Advanced Compose](./tutorials/advanced-compose) — overrides, profiles, watch, scaling, YAML anchors

### Production & Operations

- [Security & Hardening](./tutorials/security-and-hardening) — non-root, capabilities, secrets, image scanning
- [Logging & Monitoring](./tutorials/logging-and-monitoring) — log drivers, rotation, Prometheus, Grafana, cAdvisor
- [CI/CD with Docker](./tutorials/cicd-with-docker) — GitHub Actions, build caching, tagging, deployment
- [Troubleshooting & Debugging](./tutorials/troubleshooting-and-debugging) — exit codes, debugging playbook, netshoot, events

### Advanced & Internals

- [Docker Internals](./tutorials/docker-internals) — namespaces, cgroups, OverlayFS, the runtime stack
- [BuildKit & Multi-Architecture](./tutorials/buildkit-and-multi-arch) — cache mounts, SSH mounts, buildx, manifest lists
- [Orchestration & Beyond](./tutorials/orchestration-and-beyond) — Docker Swarm, Kubernetes bridge, Docker contexts

### Capstone Projects

- [Real-World Projects](./tutorials/real-world-projects) — full-stack Compose, dev/prod setups, database backup workflows
