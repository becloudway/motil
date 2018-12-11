import { ValidationEngine, ObjectValidationResult, Required } from "..";

import "ts-jest";

describe('ObjectValidator', () => {

    describe('#numberValidation', () => {

        it('should validate a number is less than some number', () => {
            const toValidate = {
                number: 2,
            };
            const validationResult = new ValidationEngine(toValidate)
                .field('number').numMax(3).validate();

            expect(validationResult.isValid).toBeTruthy();
        });

        it('should validate a number is not less than some number', () => {
            const toValidate = {
                number: 4,
            };
            const validationResult = new ValidationEngine(toValidate)
                .field('number').numMax(3).validate();

            expect(validationResult.isValid).toBeFalsy();
        });

        it('should validate to true if the number is equal to the maximum allowed value', () => {
            const toValidate = {
                number: 3,
            };
            const validationResult = new ValidationEngine(toValidate)
                .field('number').numEqualMax(3).validate();

            expect(validationResult.isValid).toBeTruthy();
        });

        it('should validate negative numbers if no lower bounds has been configured', () => {
            const toValidate = {
                number: -1,
            };
            const validationResult = new ValidationEngine(toValidate)
                .field('number').numMax(3).validate();

            expect(validationResult.isValid).toBeTruthy();
        });

        it('should not validate if the number is not a number while using a numeric validator', () => {
            const toValidate = {
                number: 'test',
            };
            const validationResult = new ValidationEngine(toValidate)
                .field('number').numMax(3).validate();

            expect(validationResult.isValid).toBeFalsy();
        });

        it('should not validate if the number is not a number', () => {
            const toValidate = {
                number: 'test',
            };
            const validationResult = new ValidationEngine(toValidate)
                .field('number').isNum().validate();

            expect(validationResult.isValid).toBeFalsy();
        });

        it('should validate if the number is undefined while it is not required', () => {
            const toValidate = {
                number: undefined,
            };
            const validationResult = new ValidationEngine(toValidate)
                .field('number').setOptional().numMax(3).validate();

            expect(validationResult.isValid).toBeTruthy();
        });

        it('should validate the number while it is not required', () => {
            const toValidate = {
                number: 5,
            };
            const validationResult = new ValidationEngine(toValidate)
                .field('number').setOptional().numMax(3).validate();

            expect(validationResult.isValid).toBeFalsy();
        });

        it('should validate if the number is missing while it is not required', () => {
            const toValidate = {};
            const validationResult = new ValidationEngine(toValidate)
                .field('number').setOptional().numMax(3).validate();

            expect(validationResult.isValid).toBeTruthy();
        });

        it('should validate if the number is missing while it is required', () => {
            const toValidate = {};
            const validationResult = new ValidationEngine(toValidate)
                .field('number').numMax(3).validate();

            expect(validationResult.isValid).toBeFalsy();
        });

    });

    describe("#stringValidation", () => {
        it('should validate if the length of a string is less than the maximum length while it is not required', () => {
            const toValidate = {
                string: "test"
            };
            const validationResult = new ValidationEngine(toValidate)
                .field('string').strMax(5).validate();

            expect(validationResult.isValid).toBeTruthy();
        });
    })

});
