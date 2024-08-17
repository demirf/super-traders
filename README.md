# Super Traders

## Installation

### Step 1: Install Dependencies

Open a terminal in the project directory and run the following command to install the necessary packages:

```bash
npm install or yarn
```

### Step 2: Environment Variables

Check the .env.example file and create a new .env file. Update the values in the .env file as needed. Example:

```bash
cp .env.example .env
```

Edit the .env file to match your configuration.

### Step 3: Run Migrations

To set up the database schema, run the following command:

```bash
npm run migrate:run or yarn run migrate:run
```

### Step 4: Seeding Database

To seeding the database, run the following command:

```bash
npm run seed or yarn run seed
```

### Step 5: Start the Application

```bash
npm run dev or yarn dev
```

### Step 6: Testing the Case Study

Once the application is running, you can test the various endpoints as per your requirements.

## Available Endpoints
- Buy Stock: POST /trades/buy (portfolioId, stockSymbol and quantity are required)
- Sell Stock: POST /trades/sell (portfolioId, stockSymbol and quantity are required)

## Project Structure
- src/entities: Contains the TypeORM entity definitions.
- src/migrations: Contains the database migration files.
- src/services: Contains the service classes for handling business logic.
- src/controllers: Contains the controller classes for handling HTTP requests.
- src/events Contains the event listener to update the transaction table after buy or sell actions
- src/jobs: Contains the cron job to update stock prices hourly
- src/routes: Contains the route definitions.
- src/config: Contains the database configuration.
