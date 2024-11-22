# Mindora

Mindora is a mental health app designed for teens, offering personalized recommendations and evidence-based tools to help manage mental well-being. This is a safe space where teens can share their thoughts and feelings openly while receiving support from their peers. This supportive environment encourages honest conversations, helping users feel understood and connected as they navigate their mental health journeys together.

# MVP Features:

✅ **User Authentication:**
Secure authentication using JSON Web Tokens (JWT). Users can reset passwords via email confirmation using the SendGrid API.

✅ **Articles & News:**
Fetch and display articles using News API, with pagination for easy navigation.

✅ **Search Function:**
A robust search that allows users to find articles while filtering out sensitive and negative words suitable for teenagers.

✅ **Forum / Anonymity:**
Users can anonymously share their feelings and seek advice in a supportive forum environment.

🔜 **Chatbot:**
Interact with both an admin and an AI-powered chatbot for immediate assistance.

🔜 **Mood Tracking:**
Users can select and archive their daily mood in a calendar for emotional monitoring.

# Teck stack:

This project is built using the following technologies:

- **Backend**:

  - Node.js
  - Express.js

- **Frontend**:

  - Next.js
  - Tailwind CSS

- **Database**:

  - PostgreSQL

- **Deployment**:

  Vercel (for automatic deployment of both frontend and backend)

  - **Frontend**: [Mindora.vercel.app](https://Mindora.vercel.app/)
  - **Backend**: [Mindora-server.vercel.app](https://Mindora-server.vercel.app/)

# Setup

## Backend

### Quick Run

Navigate to the backend directory and install dependencies with:

```bash
cd backend
npm install
```

### Create database

Use the `psql -U root -h localhost -p 5432 -d Mindora` command to login to the PostgreSQL server with the username `root` and the password `secret`. This command **MUST** be run in a vagrant terminal, we are using the PostgreSQL installation provided in the vagrant environment. M1/M2 and WSL2 users can execute this command in their terminal.

Create a database with the command `CREATE DATABASE Mindora;`.

Create a new `.env` file and copy the `.env.example` file to `.env` and fill in the necessary PostgreSQL configuration. The `node-postgres` library uses these environment variables by default.

```
DB_HOST=localhost
DB_USER=root
DB_PASS=secret
DB_NAME=Mindora
DB_PORT=5432
```

### Start the development server

```bash
npm run dev
```

### Reset database

To reset the database and seed it with initial data, run the following command:

```bash
npm run db:reset
```

Use the browser to navigate to http://localhost:8080.

## Frontend - Next JS

```bash
cd frontend
npm run dev
```

Use the browser to navigate to http://localhost:3000.
