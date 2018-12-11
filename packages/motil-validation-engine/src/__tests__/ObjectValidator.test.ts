import { ObjectValidator, ObjectValidationResult } from "..";

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
    let validationEngine = new ObjectValidator(generateTestObject())
        .field("fixedInt")
            .numberMax(3)
        .and("fixedInt")
            .numberMax(10)
        .validate();
 
    console.log(JSON.stringify(validationEngine));
});