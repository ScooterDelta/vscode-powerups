# My Awesome App

Welcome to My Awesome App! This app shows no real purpose other than to show the usage of different technologies, and how VSCode and Containers can be used to optimise the developer experience.

Welcome to step 2! This step includes the addition of Docker - no need to manually install requisite services.

## Prerequisites

Please ensure that you have the following services installed on your machine:

- [Docker](https://docs.docker.com/get-docker/)
- [NodeJS](https://nodejs.org/en/download/)
- [Dotnet](https://dotnet.microsoft.com/en-us/download)

> **Note**: To use Docker Desktop professionally you will require a License, it is available freely for personal usage.

## Configuration

- Duplicate the root `.env.example` file to make a `.env` (*note*: this file is gitignored to preserve secrets)
- **Optional**: Customize the secrets in your local `.env` file (*note*: This will require updating default connections in worker and UI)

## Getting Started

- Run `docker-compose up` to start RabbitMQ and Postgres services
- To start the **Worker** application run the following in `worker/`
  - `dotnet restore`
  - `dotnet run`
    - Or `dotnet watch run` to watch for changes and re-start.
- To start the **UI** application run the following in `ui/`
  - `npm install`
  - `npm build`
  - `npm start`
    - Or `npm run dev` to watch for changes and auto-reload

### Testing

- In order to run tests in the **UI** application run the following in `ui/`
  - `npm test`

## Commentary

This step shows the value of simplifying the prerequisite services such as RabbitMQ and Postgres through the usage of [Docker](https://docs.docker.com). This skips the need to install these services manually, and allows multiple different versions to be swapped out easily.

There are also no value added tools available out the box with this approach, and as such you cannot automatically debug, run tests or start applications other than via the CLI.

> Click here to go back to [../../README.md](../../README.md)
