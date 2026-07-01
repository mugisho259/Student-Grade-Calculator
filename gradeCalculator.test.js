const {
  calculateTotal,
  calculateAverage,
  determineGrade,
  validateMark,
  calculateGradeResult,
} = require("./gradeCalculator");

// ---------------------------------------------------------------------------
// calculateTotal
// ---------------------------------------------------------------------------
describe("calculateTotal", () => {
  test("sums four subject marks", () => {
    expect(calculateTotal([90, 80, 70, 60])).toBe(300);
  });

  test("returns 0 for an empty array", () => {
    expect(calculateTotal([])).toBe(0);
  });

  test("handles a single mark", () => {
    expect(calculateTotal([55])).toBe(55);
  });

  test("handles all zeros", () => {
    expect(calculateTotal([0, 0, 0, 0])).toBe(0);
  });

  test("handles all perfect scores", () => {
    expect(calculateTotal([100, 100, 100, 100])).toBe(400);
  });

  test("handles decimal marks", () => {
    expect(calculateTotal([33.3, 66.7])).toBeCloseTo(100, 5);
  });
});

// ---------------------------------------------------------------------------
// calculateAverage
// ---------------------------------------------------------------------------
describe("calculateAverage", () => {
  test("calculates the arithmetic mean of four marks", () => {
    expect(calculateAverage([80, 80, 80, 80])).toBe(80);
  });

  test("returns 0 for an empty array", () => {
    expect(calculateAverage([])).toBe(0);
  });

  test("handles a single mark", () => {
    expect(calculateAverage([72])).toBe(72);
  });

  test("calculates average with mixed marks", () => {
    expect(calculateAverage([90, 70, 60, 80])).toBe(75);
  });

  test("handles decimal result", () => {
    expect(calculateAverage([91, 82, 73, 64])).toBe(77.5);
  });

  test("handles all zeros", () => {
    expect(calculateAverage([0, 0, 0, 0])).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// determineGrade
// ---------------------------------------------------------------------------
describe("determineGrade", () => {
  test("returns A for average >= 80", () => {
    expect(determineGrade(80)).toBe("A");
    expect(determineGrade(95)).toBe("A");
    expect(determineGrade(100)).toBe("A");
  });

  test("returns B for average >= 70 and < 80", () => {
    expect(determineGrade(70)).toBe("B");
    expect(determineGrade(79)).toBe("B");
    expect(determineGrade(75)).toBe("B");
  });

  test("returns C for average >= 60 and < 70", () => {
    expect(determineGrade(60)).toBe("C");
    expect(determineGrade(69)).toBe("C");
    expect(determineGrade(65)).toBe("C");
  });

  test("returns D for average >= 50 and < 60", () => {
    expect(determineGrade(50)).toBe("D");
    expect(determineGrade(59)).toBe("D");
    expect(determineGrade(55)).toBe("D");
  });

  test("returns F for average < 50", () => {
    expect(determineGrade(49)).toBe("F");
    expect(determineGrade(0)).toBe("F");
    expect(determineGrade(30)).toBe("F");
  });

  test("handles exact boundary values", () => {
    expect(determineGrade(79.99)).toBe("B");
    expect(determineGrade(80.0)).toBe("A");
    expect(determineGrade(69.99)).toBe("C");
    expect(determineGrade(70.0)).toBe("B");
    expect(determineGrade(59.99)).toBe("D");
    expect(determineGrade(60.0)).toBe("C");
    expect(determineGrade(49.99)).toBe("F");
    expect(determineGrade(50.0)).toBe("D");
  });
});

// ---------------------------------------------------------------------------
// validateMark
// ---------------------------------------------------------------------------
describe("validateMark", () => {
  test("accepts valid marks within 0-100", () => {
    expect(validateMark(0)).toEqual({ valid: true });
    expect(validateMark(50)).toEqual({ valid: true });
    expect(validateMark(100)).toEqual({ valid: true });
    expect(validateMark(73.5)).toEqual({ valid: true });
  });

  test("rejects negative marks", () => {
    const result = validateMark(-1);
    expect(result.valid).toBe(false);
    expect(result.reason).toMatch(/negative/i);
  });

  test("rejects marks above 100", () => {
    const result = validateMark(101);
    expect(result.valid).toBe(false);
    expect(result.reason).toMatch(/exceed/i);
  });

  test("rejects non-number types", () => {
    expect(validateMark("abc").valid).toBe(false);
    expect(validateMark(undefined).valid).toBe(false);
    expect(validateMark(null).valid).toBe(false);
    expect(validateMark(true).valid).toBe(false);
  });

  test("rejects NaN and Infinity", () => {
    expect(validateMark(NaN).valid).toBe(false);
    expect(validateMark(Infinity).valid).toBe(false);
    expect(validateMark(-Infinity).valid).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// calculateGradeResult (integration / pipeline)
// ---------------------------------------------------------------------------
describe("calculateGradeResult", () => {
  test("returns correct result for grade A", () => {
    const result = calculateGradeResult([90, 85, 80, 95]);
    expect(result.totalMarks).toBe(350);
    expect(result.average).toBe(87.5);
    expect(result.grade).toBe("A");
  });

  test("returns correct result for grade B", () => {
    const result = calculateGradeResult([70, 75, 72, 78]);
    expect(result.totalMarks).toBe(295);
    expect(result.average).toBe(73.75);
    expect(result.grade).toBe("B");
  });

  test("returns correct result for grade C", () => {
    const result = calculateGradeResult([60, 65, 62, 68]);
    expect(result.totalMarks).toBe(255);
    expect(result.average).toBe(63.75);
    expect(result.grade).toBe("C");
  });

  test("returns correct result for grade D", () => {
    const result = calculateGradeResult([50, 55, 52, 58]);
    expect(result.totalMarks).toBe(215);
    expect(result.average).toBe(53.75);
    expect(result.grade).toBe("D");
  });

  test("returns correct result for grade F", () => {
    const result = calculateGradeResult([20, 30, 40, 10]);
    expect(result.totalMarks).toBe(100);
    expect(result.average).toBe(25);
    expect(result.grade).toBe("F");
  });

  test("handles all perfect scores", () => {
    const result = calculateGradeResult([100, 100, 100, 100]);
    expect(result.totalMarks).toBe(400);
    expect(result.average).toBe(100);
    expect(result.grade).toBe("A");
  });

  test("handles all zero scores", () => {
    const result = calculateGradeResult([0, 0, 0, 0]);
    expect(result.totalMarks).toBe(0);
    expect(result.average).toBe(0);
    expect(result.grade).toBe("F");
  });

  test("handles a single subject", () => {
    const result = calculateGradeResult([75]);
    expect(result.totalMarks).toBe(75);
    expect(result.average).toBe(75);
    expect(result.grade).toBe("B");
  });

  test("throws on invalid (negative) mark", () => {
    expect(() => calculateGradeResult([90, -5, 80, 70])).toThrow(
      /Invalid mark at index 1/
    );
  });

  test("throws on mark exceeding 100", () => {
    expect(() => calculateGradeResult([90, 80, 110, 70])).toThrow(
      /Invalid mark at index 2/
    );
  });

  test("throws on non-numeric mark", () => {
    expect(() => calculateGradeResult([90, "abc", 80, 70])).toThrow(
      /Invalid mark at index 1/
    );
  });

  test("returns result with boundary average exactly at 80", () => {
    const result = calculateGradeResult([80, 80, 80, 80]);
    expect(result.grade).toBe("A");
  });

  test("returns result with boundary average just below 80", () => {
    const result = calculateGradeResult([79, 79, 80, 80]);
    expect(result.average).toBe(79.5);
    expect(result.grade).toBe("B");
  });
});
