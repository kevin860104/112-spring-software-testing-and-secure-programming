const { describe, it } = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main');

describe("Calculator Test", () => {
    const calculator = new Calculator();
    
    const logTestSuites = [
        {
            operation: "log",
            cases: [
                { data: 9, expected: 2.1972245773362196 },
                { data: 6, expected: 1.791759469228055 },
                { data: 1, expected: 0 },
                { data: 'kevin', expected: Error, message: "unsupported operand type" },
                { data: true, expected: Error, message: "unsupported operand type" },
                { data: Infinity, expected: Error, message: "unsupported operand type" },
                { data: 0, expected: Error, message: "math domain error (5)" },
                { data: -1, expected: Error, message: "math domain error (3)" },
            ]
        }
    ];

    logTestSuites.forEach(({ operation, cases }) => {
        it(`Calculator.${operation}() Test`, () => {
            cases.forEach(({ data: param, expected: expectedOutput, message: msg }) => {
                if (expectedOutput === Error) {
                    assert.throws(() => calculator[operation](param), expectedOutput, msg);
                } else {
                    const result = calculator[operation](param);
                    assert.strictEqual(result, expectedOutput, msg);
                }
            });
        });
    });

    const expTestSuites = [
        {
            operation: "exp",
            cases: [
                { data: 8, expected: 2980.9579870417283 },
                { data: 0, expected: 1 },
                { data: -3, expected: 0.049787068367863944 },
                { data: 'kkk', expected: Error, message: "unsupported operand type" },
                { data: true, expected: Error, message: "unsupported operand type" },
                { data: Infinity, expected: Error, message: "unsupported operand type" },
                { data: Number.MAX_VALUE, expected: Error, message: "overflow" },
            ]
        }
    ];

    expTestSuites.forEach(({ operation, cases }) => {
        it(`Calculator.${operation}() Test`, () => {
            cases.forEach(({ data: param, expected: expectedOutput, message: msg }) => {
                if (expectedOutput === Error) {
                    assert.throws(() => calculator[operation](param), expectedOutput, msg);
                } else {
                    const result = calculator[operation](param);
                    assert.strictEqual(result, expectedOutput, msg);
                }
            });
        });
    });
});
