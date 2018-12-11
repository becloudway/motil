import "ts-jest";
import {ObjectValidator} from "..";

describe('ObjectValidator', () => {

    describe('#numberValidation', () => {

        it('should validate a number is less than some number', () => {
            const toValidate = {
                number: 2,
            };
            const validationResult = new ObjectValidator(toValidate)
                .field('number').numberMax(3).validate();

            expect(validationResult.isValid).toBeTruthy();
        });

        it('should validate a number is not less than some number', () => {
            const toValidate = {
                number: 4,
            };
            const validationResult = new ObjectValidator(toValidate)
                .field('number').numberMax(3).validate();

            expect(validationResult.isValid).toBeFalsy();
        });

        it('should validate to true if the number is equal to the maximum allowed value', () => {
            const toValidate = {
                number: 3,
            };
            const validationResult = new ObjectValidator(toValidate)
                .field('number').numberMax(3).validate();

            expect(validationResult.isValid).toBeTruthy();
        });

        it('should validate negative numbers if no lower bounds has been configured', () => {
            const toValidate = {
                number: -1,
            };
            const validationResult = new ObjectValidator(toValidate)
                .field('number').numberMax(3).validate();

            expect(validationResult.isValid).toBeTruthy();
        });

        it('should not validate if the number is not a number', () => {
            const toValidate = {
                number: 'test',
            };
            const validationResult = new ObjectValidator(toValidate)
                .field('number').numberMax(3).validate();

            expect(validationResult.isValid).toBeFalsy();
        });

        it('should validate if the number is undefined while it is not required', () => {
            const toValidate = {
                number: undefined,
            };
            const validationResult = new ObjectValidator(toValidate)
                .field('number').numberMax(3).validate();

            expect(validationResult.isValid).toBeTruthy();
        });

        it('should validate if the number is missing while it is not required', () => {
            const toValidate = {};
            const validationResult = new ObjectValidator(toValidate)
                .field('number').numberMax(3).validate();

            expect(validationResult.isValid).toBeTruthy();
        });

    });

});
