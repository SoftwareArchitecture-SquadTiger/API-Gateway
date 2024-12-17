# API Gateway Setup Instructions

Follow the steps below to set up and run the API Gateway for development.

---

## Prerequisites

Make sure you have the following installed on your system:
- [Node.js](https://nodejs.org/) 
- [npm](https://www.npmjs.com/)

---
## Steps to Set Up the API-Gateway

1. **Environment Variables**
   - Create a `.env` file and place it in the same directory level as the `src` folder.
   - Populate the `.env` file with the required environment variables (check discord pins).
2. **Navigate to the required folder**
   ```bash
   cd API-Gateway
3. **Install Dependencies**
   ```bash
   npm i
4. **Wait for team B system (container) to fully up and running**
5. **Start the server**
   ```bash
   npm run main
6. **Wait for the log:** `Level: INFO | Namespace: ConsumerGroup | Message: Consumer has joined the group | GroupID: api-gateway` **The application should be ready!**