const Employee = require('../models/Employee');
const { calculatePerformanceScore } = require('../utils/performanceAnalysis');

// Resolvers for GraphQL operations
const resolvers = {
    Query: {
        getAllEmployees: async () => {
            try {
                return await Employee.find();
            } catch (error) {
                console.error("Error fetching all employees:", error);
                throw new Error('Error fetching employees');
            }
        },
        getEmployee: async (_, { id }) => {
            try {
                return await Employee.findById(id);
            } catch (error) {
                console.error("Error fetching employee:", error);
                throw new Error('Error fetching employee');
            }
        },
    },
    Mutation: {
        createEmployee: async (_, { name, performanceMetrics }) => {
            const performanceScore = calculatePerformanceScore([performanceMetrics.metric1, performanceMetrics.metric2, performanceMetrics.metric3]);
            try {
                const employee = new Employee({ name, performanceMetrics, performanceScore });
                await employee.save();
                return employee;
            } catch (error) {
                console.error('Error creating employee:', error);
                throw new Error('Failed to create employee');
            }
        },
        updateEmployee: async (_, { id, performanceMetrics }) => {
            const performanceScore = calculatePerformanceScore([performanceMetrics.metric1, performanceMetrics.metric2, performanceMetrics.metric3]);
            try {
                return await Employee.findByIdAndUpdate(id, { performanceMetrics, performanceScore }, { new: true });
            } catch (error) {
                console.error('Error updating employee:', error);
                throw new Error('Failed to update employee');
            }
        },
        deleteEmployee: async (_, { id }) => {
            try {
                await Employee.findByIdAndDelete(id);
                return "Employee deleted successfully";
            } catch (error) {
                console.error('Error deleting employee:', error);
                throw new Error('Failed to delete employee');
            }
        }
    }
};

module.exports = resolvers;