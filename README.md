<div align="center">
  <br />
  <p>
    <a href="https://employeeace.apratim.me/"><img src="https://i.imgur.com/3V3ys1O.png" width="500" alt="employeeace" /></a>
  </p>
  <br />
</div>

# About
Live URL: <a href="https://employeeace-api.apratim.me/graphql">https://employeeace-api.apratim.me/graphql</a>

The EmployeeAce backend is a robust solution designed to manage employee data and performance feedback across three key metrics. This system assigns a score ranging from 0 to 100 to each employee, based on the occurrence of specified positive keywords within the feedback.

Built on an Express application framework, the backend seamlessly integrates with Apollo GraphQL Server to enhance API interactions.

### Features
- **Fetch All Employees**: Retrieves a list of all employees from the database.
- **Fetch Specific Employee**: Fetches details of a single employee by ID.
- **Create Employee**: Adds a new employee to the database, calculating their performance score based on three provided metrics.
- **Update Employee**: Updates an existing employee’s details and recalculates their performance score based on updated metrics.
- **Delete Employee**: Removes an employee from the database by ID.
- **CI/CD via Heroku**: EmployeeAce Backend has CI/CD enabled via Heroku.

### Scoring Mechanism
The EmployeeAce backend utilizes a predefined list of positive words such as "excellent," "good," and "outstanding" to evaluate employee performance. The countPositiveWords function analyzes text for these positive words, normalizing the text to lowercase and splitting it into words to count matching entries.

The calculatePerformanceScore function assesses performance scores by analyzing arrays of text inputs for positive word frequency. It calculates individual scores for each text, sums them, and computes the overall performance as a percentage of the maximum possible positive mentions.

### EmployeeAce API Setup Guide

This guide outlines the steps necessary to set up and run the EmployeeAce backend on your local development environment.

#### Prerequisites
- Node.js v16.20.2

#### Installation Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/apratimshukla6/EmployeeAce.git
   cd EmployeeAce
   ```

2. **Set Node.js version (if you're using nvm or npx):**
   ```bash
   npx node@16.20.2 --version # This command will use Node.js v16.20.2 temporarily
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Environment Setup:**
   - Create a `.env` file in the root directory.
   - Add the following environment variables based on your MongoDB configuration:
     ```
     DB_USERNAME=<your-db-username>
     DB_PASSWORD=<your-db-password>
     DB_HOST=<your-db-host>
     ```

5. **Start the server in development mode:**
   ```bash
   npm run dev
   ```

   This command will start the server using nodemon, which will automatically restart the server anytime you make changes to your files.

### Running the Server

Once the setup is complete and your MongoDB connection is successfully established, you can start the server:
```bash
npm start
```
This will launch the server at `http://localhost:5000/graphql`, where you can access the GraphQL API.

### Additional Information

Ensure that your MongoDB Atlas cluster is correctly configured to accept connections from your IP address. Review MongoDB Atlas documentation for more details on setting up network access.


### GraphQL API Documentation

The EmployeeAce API is accessible at:
- **Production URL:** `https://employeeace-api.apratim.me/graphql`
- **Development URL:** `http://localhost:5000/graphql`

#### Queries

1. **getAllEmployees**
   - **Description:** Retrieves a list of all employees.
   - **Request:**
     ```graphql
     query {
       getAllEmployees {
         id
         name
         performanceMetrics {
           metric1
           metric2
           metric3
         }
         performanceScore
       }
     }
     ```
   - **Response:** Returns an array of employee objects containing `id`, `name`, `performanceMetrics`, and `performanceScore`.


2. **getEmployee**
   - **Description:** Fetches details for a specific employee by their ID.
   - **Request:**
     ```graphql
     query GetEmployee($id: ID!) {
       getEmployee(id: $id) {
         id
         name
         performanceMetrics {
           metric1
           metric2
           metric3
         }
         performanceScore
       }
     }
     ```
   - **Variables:**
     ```json
     {
       "id": "employeeId"
     }
     ```
   - **Response:** Returns a single employee object as specified by the ID.

#### Mutations

1. **createEmployee**
   - **Description:** Adds a new employee along with their performance metrics and calculates their performance score.
   - **Request:**
     ```graphql
     mutation CreateEmployee($name: String!, $performanceMetrics: PerformanceMetricsInput!) {
       createEmployee(name: $name, performanceMetrics: $performanceMetrics) {
         id
         name
         performanceScore
       }
     }
     ```
   - **Variables:**
     ```json
     {
       "name": "John Doe",
       "performanceMetrics": {
         "metric1": "text",
         "metric2": "text",
         "metric3": "text"
       }
     }
     ```
   - **Response:** Returns the newly created employee object, including their `id`, `name`, and `performanceScore`.


2. **updateEmployee**
   - **Description:** Updates an existing employee's performance metrics and recalculates their performance score.
   - **Request:**
     ```graphql
     mutation UpdateEmployee($id: ID!, $performanceMetrics: PerformanceMetricsInput!) {
       updateEmployee(id: $id, performanceMetrics: $performanceMetrics) {
         id
         name
         performanceScore
       }
     }
     ```
   - **Variables:**
     ```json
     {
       "id": "employeeId",
       "performanceMetrics": {
         "metric1": "updated text",
         "metric2": "updated text",
         "metric3": "updated text"
       }
     }
     ```
   - **Response:** Returns the updated employee object.


3. **deleteEmployee**
   - **Description:** Deletes an employee from the database.
   - **Request:**
     ```graphql
     mutation DeleteEmployee($id: ID!) {
       deleteEmployee(id: $id)
     }
     ```
   - **Variables:**
     ```json
     {
       "id": "employeeId"
     }
     ```
   - **Response:** Returns a confirmation message.
