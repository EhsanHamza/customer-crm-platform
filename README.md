# Customer CRM Platform

A full-stack customer relationship management application for securely organizing customer records and tracking communication history. The application includes authenticated access, role-based permissions, customer search and pagination, profile images, and production-ready cloud deployment.

## Live Demo

[Open the deployed application](https://3-128-247-176.sslip.io)

> The demo is hosted on an AWS EC2 instance. Availability may vary while the instance is stopped or restarted.

## Features

- Account registration and JWT-based authentication
- Admin and employee roles with role-based authorization
- Create, view, update, and delete customer records
- Search and filter customers by name, email, and gender
- Sort and paginate customer results
- Record customer notes, calls, emails, meetings, and follow-ups
- Upload and retrieve customer profile images
- Responsive React dashboard built with Chakra UI
- PostgreSQL schema management with Flyway migrations
- Automated backend unit and integration tests with GitHub Actions
- Containerized production deployment with Docker Compose
- HTTPS reverse proxy and automatic TLS through Caddy

## Technology Stack

| Layer | Technologies |
| --- | --- |
| Frontend | React, Vite, Chakra UI, Axios |
| Backend | Java, Spring Boot, Spring Security, JWT, Spring Data JPA, JDBC |
| Database | PostgreSQL, Flyway |
| File storage | AWS S3 integration with a local mock-storage option |
| Testing | JUnit, Mockito, Testcontainers |
| DevOps | Docker, Docker Compose, GitHub Actions, Caddy |
| Cloud | AWS EC2 |

## Architecture

The React frontend sends authenticated REST API requests to the Spring Boot backend. The backend applies role-based authorization, manages customer and interaction data in PostgreSQL, and handles profile-image storage. In production, Caddy terminates HTTPS traffic and routes requests to the containerized frontend and backend services.

## Run with Docker

### Requirements

- Docker with Docker Compose
- Git

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/EhsanHamza/customer-crm-platform.git
   cd customer-crm-platform
   ```

2. Create the production environment file:

   ```bash
   cp .env.production.example .env
   ```

3. Replace the placeholder values in `.env`. Keep `S3_MOCK=true` to store profile images locally.

4. Update the hostname in `Caddyfile` for your server or domain.

5. Build and start the application:

   ```bash
   docker compose -f docker-compose.prod.yml up -d --build
   ```

6. View the running services:

   ```bash
   docker compose -f docker-compose.prod.yml ps
   ```

## Continuous Integration and Deployment

Backend tests run automatically for pull requests. The production deployment workflow can deploy changes from `main` to an EC2 instance after the following GitHub repository secrets are configured:

- `EC2_HOST` — the EC2 public hostname or IP address
- `EC2_SSH_KEY` — the private SSH key used by GitHub Actions

Secrets such as database passwords, JWT keys, and SSH keys are intentionally excluded from the repository.

## Future Improvements

- Configure a dedicated AWS S3 bucket and EC2 IAM role for production file storage
- Add customer analytics and dashboard reporting
- Add interaction reminders and notification scheduling
- Add refresh tokens and password recovery
- Add end-to-end frontend tests

## Project Background

This project began with the [Amigoscode Full Stack Professional](https://github.com/amigoscode/full-stack-professional) course project. I extended and deployed it as a CRM platform by adding customer interaction tracking, role-based permissions, search, filtering, sorting, pagination, production containers, HTTPS, AWS EC2 deployment, and an automated CI/CD workflow.
