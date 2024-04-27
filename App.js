// Load environment variables from .env file
require('dotenv').config();

// Import necessary modules
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import the GraphQL Schema and Resolvers
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');

// Initialize Express application
const app = express();
const port = 5000;

// Apply CORS and JSON middleware for handling cross-origin requests and JSON payloads
app.use(cors());
app.use(express.json());

// Encode credentials and construct MongoDB connection string
const dbUsername = encodeURIComponent(process.env.DB_USERNAME);
const dbPassword = encodeURIComponent(process.env.DB_PASSWORD);
const dbHost = process.env.DB_HOST;

// Connect to MongoDB using mongoose
mongoose.connect(`mongodb+srv://${dbUsername}:${dbPassword}@${dbHost}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Handle database connection errors
const db = mongoose.connection;
db.on('error', error => console.error('MongoDB connection error:', error));

// Initialize Apollo Server with type definitions and resolvers
async function startServer() {
    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();
    server.applyMiddleware({ app });
    app.listen(port, () => console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`));
}

startServer();