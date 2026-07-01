---
name: testing-grade-calculator
description: Test the Student Grade Calculator end-to-end. Use when verifying grade calculation logic, UI behavior, or JS module changes.
---

# Testing the Student Grade Calculator

## Unit Tests

```bash
cd /home/ubuntu/repos/Student-Grade-Calculator
npm test
```

This runs Jest with coverage. Expect 36 tests across 5 functions in `gradeCalculator.js`:
- `calculateTotal`, `calculateAverage`, `determineGrade`, `validateMark`, `calculateGradeResult`

## Local Dev Server

No build step needed — this is a static HTML/CSS/JS app.

```bash
cd /home/ubuntu/repos/Student-Grade-Calculator
python3 -m http.server 8080 &
```

Then open `http://localhost:8080/index.html` in the browser.

## UI Testing Approach

1. **Grade boundaries to test:** A>=80, B>=70, C>=60, D>=50, F<50
2. **Key boundary test:** Use inputs that produce average exactly at 80 (e.g. 80/80/80/80) and just below (e.g. 79/79/80/80 → avg=79.5) to verify the A/B boundary.
3. **Input fields:** Use `ctrl+a` before typing to replace existing values. Fields are `#sub1` (Maths), `#sub2` (English), `#sub3` (Chemistry), `#sub4` (Physics).
4. **Calculate button:** `type="button"` with `onclick="calculateGrade()"`.
5. **Reset button:** `type="reset"` — clears form inputs and result area.
6. **Result area:** `<h3 id="result">` shows "Total Marks: X", "Average: X.XX", "Grade: X".

## Vercel Preview

The repo has Vercel deployments configured. Preview URLs might require SSO login — if blocked, fall back to localhost.

## Devin Secrets Needed

None — this is a fully client-side app with no authentication required.
