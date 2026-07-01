"use strict";

function isValidMark(value) {
    var mark = Number(value);
    return value !== "" && !isNaN(mark) && mark >= 0 && mark <= 100;
}

function calculateGrade() {
    var fields = ["sub1", "sub2", "sub3", "sub4"];
    var marks = [];

    for (var i = 0; i < fields.length; i++) {
        var value = document.getElementById(fields[i]).value;
        if (!isValidMark(value)) {
            document.getElementById("result").textContent =
                "Please enter valid marks between 0 and 100 for all subjects.";
            return;
        }
        marks.push(Number(value));
    }

    var totalmarks = marks[0] + marks[1] + marks[2] + marks[3];
    var averagemark = totalmarks / 4;

    var grade;
    if (averagemark >= 80) {
        grade = "A";
    } else if (averagemark >= 70) {
        grade = "B";
    } else if (averagemark >= 60) {
        grade = "C";
    } else if (averagemark >= 50) {
        grade = "D";
    } else {
        grade = "F";
    }

    var resultEl = document.getElementById("result");
    resultEl.textContent = "";

    var lines = [
        "Total Marks: " + totalmarks,
        "Average: " + averagemark.toFixed(2),
        "Grade: " + grade
    ];

    for (var j = 0; j < lines.length; j++) {
        if (j > 0) {
            resultEl.appendChild(document.createElement("br"));
        }
        resultEl.appendChild(document.createTextNode(lines[j]));
    }
}
