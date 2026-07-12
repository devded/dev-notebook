# Docker & Docker Compose Tutorials

Long-form, example-driven tutorials with diagrams. Each one teaches a topic from the
ground up — mental model, runnable code, mermaid flowcharts, common pitfalls, and best
practices — progressing from absolute beginner to production-grade mastery.

## Fundamentals

- [Introduction & Architecture](./introduction-and-architecture) — what containers are, Docker vs VMs, architecture, installation
- [Running Containers](./running-containers) — `docker run`, lifecycle, logs, exec, cleanup, restart policies
- [Images & Dockerfiles](./images-and-dockerfiles) — layers, every instruction, CMD vs ENTRYPOINT, `.dockerignore`
- [Building & Optimizing Images](./building-and-optimizing) — layer caching, multi-stage builds, base images, tagging, registries

## Networking & Storage

- [Docker Networking](./networking) — bridge, host, overlay, DNS, port publishing, macvlan, isolation
- [Volumes & Storage](./volumes-and-storage) — named volumes, bind mounts, tmpfs, backup/restore, permissions

## Docker Compose

- [Compose Fundamentals](./compose-fundamentals) — services, depends_on, healthchecks, env vars, daily commands
- [Compose Networking & Storage](./compose-networking-and-storage) — custom networks, internal networks, volume patterns, dev workflow
- [Advanced Compose](./advanced-compose) — override files, profiles, watch, scaling, YAML anchors, named projects

## Production & Operations

- [Security & Hardening](./security-and-hardening) — non-root, capabilities, secrets, image scanning, supply chain
- [Logging & Monitoring](./logging-and-monitoring) — log drivers, rotation, Prometheus/Grafana/cAdvisor stack
- [CI/CD with Docker](./cicd-with-docker) — GitHub Actions pipelines, build caching, tagging strategy, deployment
- [Troubleshooting & Debugging](./troubleshooting-and-debugging) — exit codes, systematic debugging, netshoot, common pitfalls

## Advanced & Internals

- [Docker Internals](./docker-internals) — namespaces, cgroups, OverlayFS, containerd, runc, the runtime stack
- [BuildKit & Multi-Architecture](./buildkit-and-multi-arch) — cache mounts, SSH mounts, heredocs, buildx, manifest lists
- [Orchestration & Beyond](./orchestration-and-beyond) — Docker Swarm, Kubernetes mapping, Docker contexts, rootless Docker

## Capstone Projects

- [Real-World Projects](./real-world-projects) — full-stack Compose apps, dev/prod overrides, backup workflows, monitoring stacks
