import { ValidationEngine, ObjectValidationResult } from "..";

import "ts-jest";

function generateTestObject () {
    return {
        testString: "some_text",
        randomInt: Math.round(Math.random() * 1000),
        fixedInt: 5,
        emptyString: ""
    }
}

it('testString is required and should be valid', () => {
    let validationEngine = new ValidationEngine(generateTestObject())
        .field("fixedInt")
            .numMax(10)
        .and("fixedInt")
            .numEqual(5)
        .validate();
 
    console.log(JSON.stringify(validationEngine));
});