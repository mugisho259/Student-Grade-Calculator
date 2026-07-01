/**
 * Calculates total marks from an array of subject scores.
 * @param {number[]} marks - Array of numeric marks.
 * @returns {number} The sum of all marks.
 */
function calculateTotal(marks) {
  return marks.reduce((sum, m) => sum + m, 0);
}

/**
 * Calculates the average of an array of subject scores.
 * @param {number[]} marks - Array of numeric marks.
 * @returns {number} The arithmetic mean.
 */
function calculateAverage(marks) {
  if (marks.length === 0) {
    return 0;
  }
  return calculateTotal(marks) / marks.length;
}

/**
 * Determines the letter grade for a given average mark.
 * @param {number} average - The average mark.
 * @returns {string} The letter grade (A, B, C, D, or F).
 */
function determineGrade(average) {
  if (average >= 80) return "A";
  if (average >= 70) return "B";
  if (average >= 60) return "C";
  if (average >= 50) return "D";
  return "F";
}

/**
 * Validates that a mark is a finite number within the 0–100 range.
 * @param {*} value - The value to validate.
 * @returns {{ valid: boolean, reason?: string }}
 */
function validateMark(value) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return { valid: false, reason: "Mark must be a finite number" };
  }
  if (value < 0) {
    return { valid: false, reason: "Mark cannot be negative" };
  }
  if (value > 100) {
    return { valid: false, reason: "Mark cannot exceed 100" };
  }
  return { valid: true };
}

/**
 * Runs the full grade-calculation pipeline: validates marks, computes total,
 * average, and grade.
 * @param {number[]} marks - Array of subject marks.
 * @returns {{ totalMarks: number, average: number, grade: string }}
 * @throws {Error} If any mark is invalid.
 */
function calculateGradeResult(marks) {
  for (let i = 0; i < marks.length; i++) {
    const result = validateMark(marks[i]);
    if (!result.valid) {
      throw new Error(`Invalid mark at index ${i}: ${result.reason}`);
    }
  }

  const totalMarks = calculateTotal(marks);
  const average = calculateAverage(marks);
  const grade = determineGrade(average);

  return { totalMarks, average, grade };
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    calculateTotal,
    calculateAverage,
    determineGrade,
    validateMark,
    calculateGradeResult,
  };
}
