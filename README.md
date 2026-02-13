# Real-Time Chat System

A secure, real-time communication platform built with Node.js, Next.js, and MySQL. This project facilitates seamless interaction between Users and Admins with features like role-based access, paginated message history, and connection state recovery.

## Tech Stack

- Backend: Node.js, Express, TypeScript
- Database: MySQL with Prisma 7.3
- Frontend: Next.js
- Authentication: JWT (JSON Web Tokens)

## Project Structure

    .
    ├── chat-app-backend/     # Node.js + Prisma 7 Source
    │   ├── prisma/           # Schema and Seeder
    │   └── src/
    │       ├── middlewares/  # Middlewares
    │       ├── modules/      # Auth, Message, & Conversation Modules
    │       ├── app.ts        # Auth, Message, & Conversation Modules
    │       └── server.ts     # Entry point         
    └── chat-app-frontend/    # Next.js App
        └── src/
            ├── app/          # Main Layout
            ├── components/   # Components
            ├── hooks/        # Custom Hooks
            ├── lib/          # Utils, & Validations
            ├── providers/    # Initializers
            ├── servies       # Services
            ├── socket        # Socket Singleton
            ├── store         # Stores
            ├── types         # Types
            └── proxy.ts      # Middleware

## Backend Setup

1.  **Prerequisites**
    - Node.js (v25)
    - MySQL Server
    - npm

2.  **Installation**
    - Navigate to the backend directory and install dependencies:
    
    <br>

    ```sh
    cd chat-app-backend
    npm install
    ```

3.  **Environment Configuration**
    - Create a .env file in the chat-app-backend folder:

    <br>

    ```sh
    DATABASE_URL="mysql://root:password@localhost:3306/your_db_name"

    DATABASE_USER="root"
    DATABASE_PASSWORD="password"
    DATABASE_NAME="your_db_name"
    DATABASE_HOST="localhost"
    DATABASE_PORT=3306

    JWT_SECRET="our_secure_secret_key"

    PORT=8080
    ```

4.  **Database Initialization**
    - This project uses Prisma 7. Follow these steps to generate the client and sync the schema:

    <br>

    ```sh
    # Generate Prisma Client (to src/generated/prisma)
    npx prisma generate

    # Create tables and run migrations
    npx prisma migrate dev --name init

    # Seed the database (Creates the default Admin account)
    npm run seed
    ```

5. **Running the Server**
    ```sh
    # Development mode
    npm run dev
    ```

## Frontend Setup

1.  **Prerequisites**
    - Node.js (v25)
    - npm

2.  **Installation**
    - Navigate to the frontend directory and install dependencies:
    
    <br>

    ```sh
    cd chat-app-frontend
    npm install
    ```

3.  **Environment Configuration**
    - Create a .env file in the chat-app-frontend folder:

    <br>

    ```sh
    NEXT_PUBLIC_SOCKET_URL = "http://localhost:8080"
    NEXT_PUBLIC_API_URL= "http://localhost:8080/api"
    ```
4. **Running the Server**
    ```sh
    # Development mode
    npm run dev
    ```

## Default Credentials (Seeded)

After running the seed command, use these to test:
- Admin Email: ```systemadmin@gmail.com```
- Admin Password: ```admin123```

Note: You can also create new admin account for testing.