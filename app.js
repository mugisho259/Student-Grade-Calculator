/**
 * Student Grade Calculator – application logic.
 *
 * Subjects are defined once in the SUBJECTS array.  The form inputs and
 * the grade calculation both derive from this single source of truth,
 * eliminating the duplicated per-subject code that existed before.
 *
 * Depends on: utils.js (getInputNumbers, sum, average, determineGrade,
 *                        formatResults, displayResult, clearResult)
 */

var SUBJECTS = [
    { id: "sub1", label: "Maths",     placeholder: "Enter Maths Mark e.g 90" },
    { id: "sub2", label: "English",   placeholder: "Enter English Mark" },
    { id: "sub3", label: "Chemistry", placeholder: "Enter Chemistry Mark" },
    { id: "sub4", label: "Physics",   placeholder: "Enter Physics Mark" }
];

var RESULT_ELEMENT_ID = "result";

/** Build label + input pairs inside the given form element. */
function renderSubjectFields(formElement) {
    SUBJECTS.forEach(function (subject) {
        var label = document.createElement("label");
        label.setAttribute("for", subject.id);
        label.textContent = subject.label;

        var input = document.createElement("input");
        input.type = "number";
        input.id = subject.id;
        input.placeholder = subject.placeholder;

        formElement.insertBefore(input, formElement.querySelector(".form-actions"));
        formElement.insertBefore(label, input);
    });
}

/** Gather marks, compute grade, and display the result. */
function calculateGrade() {
    var ids = SUBJECTS.map(function (s) { return s.id; });
    var marks = getInputNumbers(ids);
    var total = sum(marks);
    var avg = average(marks);
    var grade = determineGrade(avg);

    displayResult(RESULT_ELEMENT_ID, formatResults(total, avg, grade));
}

/** Reset handler – clear the result text. */
function resetResult() {
    clearResult(RESULT_ELEMENT_ID);
}

/** Initialise the form on page load. */
document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("gradeForm");
    renderSubjectFields(form);
});
