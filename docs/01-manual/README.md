# VSCode Powerups - Manual Configuration

Welcome to My Awesome App! This app shows no real purpose other than to show the usage of different technologies, and how VSCode and Containers can be used to optimise the developer experience.

Unfortunately for you, this is step 1 in the journey - installing and starting everything manually.

## Prerequisites

Please ensure that you have the following services installed on your machine:

- [RabbitMQ](https://www.rabbitmq.com/)
  - [Guide for Windows](https://www.rabbitmq.com/install-windows.html)
  - [Guide for Linux](https://www.rabbitmq.com/install-debian.html).
- [PostgreSQL](https://www.postgresql.org/)
  - [Downloads](https://www.postgresql.org/download/)
- [NodeJS](https://nodejs.org/en/download/)
- [Dotnet](https://dotnet.microsoft.com/en-us/download)

## Configuration

- Set up RabbitMQ Username and Password and export the following environment variables in the relevant applications
  - **worker**: `RabbitConnectionString=<insert amqp connection secret>`
  - **ui**: `RABBITMQ_CONNECTION_URL=<insert amqp connection secret>`
- Set up Postgres and configure DB Username and Password for connection, export the following environment variables in relevant applications
  - **ui**: `POSTGRES_USERNAME=<username>`
  - **ui**: `POSTGRES_PASSWORD=<password>`

## Getting Started

- Ensure that Postgres and RabbitMQ are configured and running (see [Prerequisites](#prerequisites) and [Configuration](#configuration) above)
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

This step primarily exists to highlight the complexity in setting up a "raw" environment for development, highlighting the complexity in installing services like [RabbitMQ](https://www.rabbitmq.com) from scratch.

There are also no value added tools available out the box with this approach, and as such you cannot automatically debug, run tests or start applications other than via the CLI.

> Click here to go back to [../../README.md](../../README.md)
