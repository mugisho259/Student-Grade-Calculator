/**
 * Shared utility functions for the Student Grade Calculator.
 *
 * Centralises DOM helpers, grade logic, and result formatting so that
 * none of this needs to be duplicated across the application.
 */

/** Read a numeric value from an <input> element by its ID. */
function getInputNumber(id) {
    return Number(document.getElementById(id).value);
}

/** Read numeric values from several <input> elements at once. */
function getInputNumbers(ids) {
    return ids.map(getInputNumber);
}

/** Return the sum of an array of numbers. */
function sum(values) {
    return values.reduce(function (a, b) { return a + b; }, 0);
}

/** Return the arithmetic mean of an array of numbers. */
function average(values) {
    return values.length ? sum(values) / values.length : 0;
}

/**
 * Map a numeric average to a letter grade.
 *
 * Thresholds (customisable via the optional second argument):
 *   >= 80 -> A, >= 70 -> B, >= 60 -> C, >= 50 -> D, else F
 */
function determineGrade(avg, thresholds) {
    thresholds = thresholds || [
        { min: 80, grade: "A" },
        { min: 70, grade: "B" },
        { min: 60, grade: "C" },
        { min: 50, grade: "D" }
    ];

    for (var i = 0; i < thresholds.length; i++) {
        if (avg >= thresholds[i].min) {
            return thresholds[i].grade;
        }
    }
    return "F";
}

/** Build the HTML string that shows total, average and grade. */
function formatResults(total, avg, grade) {
    return (
        "Total Marks: " + total + "<br>" +
        "Average: " + avg.toFixed(2) + "<br>" +
        "Grade: " + grade
    );
}

/** Set the innerHTML of an element identified by its ID. */
function displayResult(id, html) {
    document.getElementById(id).innerHTML = html;
}

/** Clear the innerHTML of an element identified by its ID. */
function clearResult(id) {
    displayResult(id, "");
}
