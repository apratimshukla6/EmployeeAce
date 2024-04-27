const { gql } = require('apollo-server-express');

// GraphQL schema
const typeDefs = gql`
type Employee {
    id: ID!
    name: String!
    performanceMetrics: PerformanceMetrics!
    performanceScore: Float!
}

type PerformanceMetrics {
    metric1: String!
    metric2: String!
    metric3: String!
}

type Query {
    getAllEmployees: [Employee]
    getEmployee(id: ID!): Employee
}

input PerformanceMetricsInput {
    metric1: String!
    metric2: String!
    metric3: String!
}

type Mutation {
    createEmployee(name: String!, performanceMetrics: PerformanceMetricsInput!): Employee
    updateEmployee(id: ID!, performanceMetrics: PerformanceMetricsInput!): Employee
    deleteEmployee(id: ID!): String
}
`;

module.exports = typeDefs;