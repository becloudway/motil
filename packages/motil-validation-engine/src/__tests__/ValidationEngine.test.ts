import { ValidationEngine } from "../";
import { ValidationResult } from "../";

import "ts-jest";

function generateTestObject () {
    return {
        testString: "some_text",
        randomInt: Math.round(Math.random() * 1000),
        fixedInt: 5,
        emptyString: ""
    }
}

test("testString is required and should be valid", () => {
    const validationEngine = new ValidationEngine(generateTestObject(), {testString: "required"});
    const result: ValidationResult = validationEngine.processRules();

    expect(result.isOk).toBeTruthy();
    expect(Object.keys(result.errors).length).toBe(0);
});

test("testString is required, should match the regex and be atleast 3 characters long", () => {
    const validationEngine = new ValidationEngine(generateTestObject(), {testString: "required|min:3|isRegex:^some_[a-z]+$"});
    const result: ValidationResult = validationEngine.processRules();

    expect(result.isOk).toBe(true);
    expect(Object.keys(result.errors).length).toBe(0);
});

test("testString is required, should match the regex and be max 3 characters long - result should be false", () => {
    const validationEngine = new ValidationEngine(generateTestObject(), {testString: "required|max:3|isRegex:^some_[a-z]+$"});
    const result: ValidationResult = validationEngine.processRules();

    expect(result.isOk).toBe(false);
    expect(Object.keys(result.errors).length).toBe(1);
    expect(result.errors.testString).toBe(true);
});

test("required method", () => {
    expect(ValidationEngine.required(generateTestObject().testString)).toBe(true);
    expect(ValidationEngine.required(generateTestObject().emptyString)).toBe(false);
});

test("min method", () => {
    expect(ValidationEngine.min(generateTestObject().testString, 3)).toBe(true);
    expect(ValidationEngine.min(generateTestObject().testString, 99)).toBe(false);
});

test("max method", () => {
    expect(ValidationEngine.max(generateTestObject().testString, 3)).toBe(false);
    expect(ValidationEngine.max(generateTestObject().testString, 99)).toBe(true);
});

test("numMin method", () => {
    expect(ValidationEngine.numMin(generateTestObject().fixedInt, 4)).toBe(true);
    expect(ValidationEngine.numMin(generateTestObject().fixedInt, 6)).toBe(false);
})

test("numMax method", () => {
    expect(ValidationEngine.numMax(generateTestObject().fixedInt, 4)).toBe(false);
    expect(ValidationEngine.numMax(generateTestObject().fixedInt, 6)).toBe(true);
})

test("isNumber method", () => {
    expect(ValidationEngine.isNumber(generateTestObject().randomInt)).toBe(true);
    expect(ValidationEngine.isNumber(generateTestObject().testString)).toBe(false);
});

test("isRegex method", () => {
    expect(ValidationEngine.isRegex(generateTestObject().testString, "^some_text$")).toBe(true);
    expect(ValidationEngine.isRegex(generateTestObject().testString, "^some_other_text$")).toBe(false);
    expect(ValidationEngine.isRegex(generateTestObject().testString, "^some_[a-z]+$")).toBe(true);
});