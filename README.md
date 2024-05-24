## Kwizical!

Kwizical is a web based music quiz game, built in the MERN(Mongo, Express, React, Node) stack.
The goal is to listen to the given music snippet and answer 5 questions about it, per round.
The player can choose their preferred genre and their difficulty setting (which alters the questions asked).

### Structure

This repo contains two applications:

- A frontend React App
- A backend api server

These two applications will communicate through HTTP requests, and need to be
run separately.

### Documentation

IN CONSTRUCTION

### Quickstart

### Install Node.js

If you haven't already, make sure you have node and NVM installed.

1. Install Node Version Manager (NVM)
   ```
   brew install nvm
   ```
   Then follow the instructions to update your `~/.bash_profile`.
2. Open a new terminal
3. Install the latest version of [Node.js](https://nodejs.org/en/), (`20.5.0` at
   time of writing).
   ```
   nvm install 20
   ```

### Set up our project

1. Fork this repository.
2. Rename the fork to your preferred name.
3. Clone the fork to your local machine
4. Install dependencies for both the `frontend` and `api` applications:
   ```
   cd frontend
   npm install
   cd ../api
   npm install
   ```
6. We have no local database option. Our MongoDB is hosted online on MongoDB Atlas.
You would need your own copy.

### Setting up environment variables.

You need to create two `.env` files, one in the frontend and one in the api.

#### Frontend

Create a file `frontend/.env` with the following contents:

```
VITE_BACKEND_URL="<backend_url_here>"
```

#### Backend

Create a file `api/.env` with the following contents:

```
NODE_ENV="development"
DB_USER="<your_db_username_here>"
DB_PASSWORD="<your_db_password_here>"
```

### How to run the server and use the app

1. Start the server application (in the `api` directory) in dev mode:

```
; cd api
; npm run dev
```

2. Start the front end application (in the `frontend` directory)

In a new terminal session...

```
; cd frontend
; npm run dev
```

You should now be able to open your browser and go to
`http://localhost:5173/` to reach the homepage and play our game
as a guest. Google sign-in will not work for you.