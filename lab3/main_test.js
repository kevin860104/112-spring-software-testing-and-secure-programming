const { describe, it } = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main');

describe("Calculator Test", () => {
    const calculator = new Calculator();
    const logTestSuites = [
        {
            operation: "log",
            cases: [
	{ data: 9, expected: Math.log(9) },
	{ data: 6, expected: Math.log(6) },
	{ data: 1, expected: Math.log(1) },
	{ data: 'kevin', expected: Error, message: "unsupported operand type" },
	{ data: true, expected: Error, message: "unsupported operand type" },
	{ data: Infinity, expected: Error, message: "unsupported operand type" },
	{ data: 0, expected: Error, message: "math domain error (1)" },
	{ data: -1, expected: Error, message: "math domain error (2)" },
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
                { data: 8, expected: Math.exp(8) },
                { data: 0, expected: Math.exp(0) },
                { data: -3, expected: Math.exp(-3) },
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
