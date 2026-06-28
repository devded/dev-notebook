# DevOps, Git & Linux

> Add new questions below in the same format: `## Question? <Badge ... />` then the answer.
> Docker basics & a sample Dockerfile are also in [Environment & Config](./environment-config).

## What's the difference between a Docker image and a container? <Badge type="warning" text="medium" />

::: details View Answer
An **image** is an immutable, layered template (your app + dependencies). A **container** is a running instance of an image — an isolated process with its own filesystem/network. One image → many containers.
:::

## What is Docker Compose? <Badge type="warning" text="medium" />

::: details View Answer
A tool to define and run multi-container apps with a single YAML file (`docker-compose.yml`) — e.g. web + database + cache. Start everything with `docker compose up`.

```yaml
services:
  web:
    build: .
    ports: ["8000:8000"]
  db:
    image: postgres:16
```
:::

## How would you optimize a Docker image for production? <Badge type="danger" text="hard" />

::: details View Answer
Use a slim/alpine base, **multi-stage builds** (build deps separate from runtime), order layers so cached steps come first (copy requirements before code), a `.dockerignore`, pin versions, combine `RUN` steps, and run as a non-root user.
:::

## What is Git? <Badge type="tip" text="easy" />

::: details View Answer
A distributed version control system that tracks changes to source code, enabling history, branching, and collaboration — every clone has the full repository.
:::

## `git merge` vs `git rebase`? <Badge type="warning" text="medium" />

::: details View Answer
`merge` combines branches with a merge commit, preserving the true history (non-linear). `rebase` replays your commits on top of another branch for a **linear** history (rewrites commits). Rule of thumb: don't rebase shared/public branches.
:::

## Describe a common Git branching workflow. <Badge type="warning" text="medium" />

::: details View Answer
Feature branches off `main`, short-lived, one per task; open a pull request for review/CI; merge (or squash-merge) back to `main`. Variations: GitHub Flow (simple, deploy from `main`), Git Flow (`develop` + `release`/`hotfix` branches), trunk-based development.
:::

## How would you resolve a complex merge conflict? <Badge type="danger" text="hard" />

::: details View Answer
Pull latest, run the merge/rebase, then for each conflicted file inspect the `<<<<<<<`/`=======`/`>>>>>>>` markers, decide what to keep (use a diff/merge tool), test, then `git add` and continue. Communicate with whoever wrote the other side when intent is unclear.
:::

## Which Linux commands do you use daily? <Badge type="tip" text="easy" />

::: details View Answer
`ls`, `cd`, `cat`, `grep`, `find`, `tail -f`, `ps`, `top`/`htop`, `kill`, `chmod`/`chown`, `df`/`du`, `ssh`, `curl`, `tar`, and pipes/redirection.
:::

## How do Linux file permissions work? <Badge type="warning" text="medium" />

::: details View Answer
Each file has read/write/execute (`rwx`) bits for **owner**, **group**, and **others** — shown as `-rwxr-xr--`. Set them with `chmod` (symbolic `u+x` or octal `755`) and change ownership with `chown`.

```bash
chmod 755 script.sh    # rwxr-xr-x
chmod u+x script.sh
```
:::

## What are pipes and redirection? <Badge type="warning" text="medium" />

::: details View Answer
A **pipe** `|` sends one command's stdout into the next command's stdin. **Redirection** sends streams to/from files: `>` (overwrite stdout), `>>` (append), `<` (stdin), `2>` (stderr).

```bash
ps aux | grep python > procs.txt 2>&1
```
:::

## How would you investigate a process using excessive CPU/memory? <Badge type="danger" text="hard" />

::: details View Answer
Find it with `top`/`htop` or `ps aux --sort=-%cpu`. Inspect with `pidstat`, `strace` (syscalls), `lsof` (open files), `/proc/<pid>`. For Python specifically, attach `py-spy` to profile a live process without restarting it.
:::

## What is Continuous Integration (CI)? <Badge type="warning" text="medium" />

::: details View Answer
The practice of merging code frequently into a shared branch, with each change automatically built and tested (lint, unit/integration tests) — catching integration problems early. Tools: GitHub Actions, GitLab CI, Jenkins.
:::

## Continuous Delivery vs Continuous Deployment? <Badge type="warning" text="medium" />

::: details View Answer
Both automate the release pipeline after CI. **Continuous Delivery:** every passing build is *ready* to deploy, but a human approves the final push. **Continuous Deployment:** every passing build is deployed to production **automatically**, no manual gate.
:::