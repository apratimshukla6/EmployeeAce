// List of recognized positive words for performance evaluation
const positiveWords = ["excellent", "good", "great", "positive", "dedicated", "motivated", "outstanding", "effective"];

/**
 * Counts the number of positive words in a given text.
 * @param {string} text - Text to analyze.
 * @return {number} Count of positive words.
 */
function countPositiveWords(text) {
    const words = text.toLowerCase().split(/\s+/);  // Normalize and split the text into words
    let count = 0;
    words.forEach(word => {
        if (positiveWords.includes(word)) {
            count++;
        }
    });
    return count;
}

/**
 * Calculates a performance score based on the frequency of positive words in given text inputs.
 * @param {Array<string>} metricTexts - Array of strings to analyze.
 * @return {number} Performance score as a percentage of maximum possible positive mentions.
 */
function calculatePerformanceScore(metricTexts) {
    if (!Array.isArray(metricTexts)) {
        throw new TypeError("Expected an array of strings for metricTexts.");
    }

    const scores = metricTexts.map(text => {
        if (typeof text !== 'string') {
            throw new TypeError("Each item in metricTexts should be a string.");
        }
        return countPositiveWords(text);
    });
    const totalPositiveCount = scores.reduce((total, num) => total + num, 0);
    const maxPossibleScore = scores.length * positiveWords.length;  // Theoretical max if every word was positive
    return (totalPositiveCount / maxPossibleScore) * 100;
}

module.exports = {
    calculatePerformanceScore
};