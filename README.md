
# NodeJs Starter Kit (Rest Api)

## About

NodeJs application တစ်ခုရဲ့ structure ကိုသေချာတည်ဆောက်ထားသော Starterkit တစ်ခုဖြစ်ပါတယ်။ စတင်လေ့လာသူများနှင့် api backend project တစ်ခုကိုအသင့်အနေအထားကနေစပြီးအသုံးပြုနိုင်ရန်ရည်ရွယ်ပါတယ်။

A modern and scalable Node.js starter kit built with TypeScript, Prisma, and Zod. This starter kit includes essential features for rapid development, such as API documentation, validation, error handling, and database integration.

## Postman Collection

![App Screenshot](https://github.com/aungpaingsoe-dev/nodejs-starterkit-restapi/blob/main/docs/postman.png?raw=true)

## Api Documentation

![App Screenshot](https://github.com/aungpaingsoe-dev/nodejs-starterkit-restapi/blob/main/docs/apidocs.png?raw=true)

## Features

- **TypeScript Support**: Strongly typed Node.js application for better development experience.
- **Validation with Zod**: Schema-based validation for API requests and responses.
- **Prisma ORM**: Simplified database management with support for migrations and models.
- **Nodemailer Integration**: Built-in support for email sending.
- **Global Error Handling**: Centralized error handling mechanism for better debugging.
- **Postman Collection**: Pre-configured Postman collection for testing APIs.
- **API Documentation**: Swagger-based API documentation for easy collaboration.
- **Environment Variables**: Managed using `.env` files with [dotenv](https://github.com/motdotla/dotenv).

## Folder Structure

```plaintext
src/
├── app/                  # Core application logic
│   ├── controllers/      # API controllers
│   ├── helpers/          # Helper utilities and reusable functions
│   ├── middlewares/      # Custom middleware (e.g., logger, passport)
│   ├── schemas/          # Validation schemas (e.g., Zod schemas)
│   └── services/         # Business logic and service handlers
├── docs/                 # API documentation and Postman collection
│   ├── apidocs.png       # Screenshot of API documentation
│   ├── App.postman_collection.json # Postman collection file
│   └── postman.png       # Screenshot of Postman setup
├── prisma/               # Prisma schema and migrations
├── public/               # Public assets
├── routes/               # API route definitions
├── index.ts              # Entry point for application initialization
├── server.ts             # Main server configuration and startup
└── .env.example          # Example environment variables file
```

## Tech Stack

TypeScript, NodeJs, ExpressJs, Zod, Prisma 

## Deployment

Package Installation

```bash
  npm run install
```

Running with development server

```bash
  npm run start:dev
```

After running development server, you can run api documentation link

http://localhost:3030/apidocs

Running migration 

```bash
  npm run db:migrate
```

Database seeding 

```bash
  npm run db:seed
```

Cleaning database

```bash
  npm run db:migrate:reset
```

Building production

```bash
  npm run build
```
