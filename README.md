# Manchester Seals Roster

React + Node.js app that fetches roster data from MongoDB database manchester_seals.

Setup
1. Create a .env file in the project root with your MongoDB connection string:
   MONGODB_URI=mongodb://localhost:27017/manchester_seals
2. Install dependencies:
   npm install

Run
- Frontend only:
  npm run dev
- Backend only (default port 5001):
  npm run dev:server
- Frontend + backend together:
  npm run dev:full

API endpoint: http://localhost:5001/api/roster
	npm run dev



