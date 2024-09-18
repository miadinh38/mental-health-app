# Mental Health App
With personalized recommendations and evidence-based tools, the app aims to help individuals manage their mental health, set and achieve wellness goals, and foster a balanced lifestyle. Whether you're seeking daily self-care practices or professional support, the Mental Health App provides a convenient and accessible solution for maintaining mental well-being and improving overall quality of life.

# Setup
## Backend

### Quick Run

Navigate to the backend directory and install dependencies with: 

```bash 
cd backend
npm install
```

### Create database

Use the `psql -U root -h localhost -p 5432 -d teenvent` command to login to the PostgreSQL server with the username `root` and the password `secret`. This command **MUST** be run in a vagrant terminal, we are using the PostgreSQL installation provided in the vagrant environment. M1/M2 and WSL2 users can execute this command in their terminal.

Create a database with the command `CREATE DATABASE teenvent;`.

Create a new `.env` file and copy the `.env.example` file to `.env` and fill in the necessary PostgreSQL configuration. The `node-postgres` library uses these environment variables by default.

```
DB_HOST=localhost
DB_USER=root
DB_PASS=secret
DB_NAME=teenvent
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

