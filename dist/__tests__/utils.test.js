"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const utils_1 = require("../../src/utils/utils");
(0, globals_1.describe)("Testing for the getDate function", () => {
    (0, globals_1.test)("Function should return a string", () => {
        const dateTimeString = "2024-10-18T18:30:00.000Z";
        const result = (0, utils_1.getDate)(dateTimeString);
        (0, globals_1.expect)(typeof result).toBe('string');
    });
    (0, globals_1.test)("Function should return date from a time stamp string in the format of YYYY-MM-DD", () => {
        const dateTimeString = "2024-10-18T18:30:00.000Z";
        const expected = "2024-10-18";
        const result = (0, utils_1.getDate)(dateTimeString);
        (0, globals_1.expect)(result).toBe(expected);
    });
});
(0, globals_1.describe)("Testing for the getTime function", () => {
    (0, globals_1.test)("Function should return a string", () => {
        const dateTimeString = "2024-10-18T18:30:00.000Z";
        const result = (0, utils_1.getTime)(dateTimeString);
        (0, globals_1.expect)(typeof result).toBe('string');
    });
    (0, globals_1.test)("Function should return time from a time stamp string in the format of HH:MM", () => {
        const dateTimeString = "2024-10-18T18:30:00.000Z";
        const expected = "18:30";
        const result = (0, utils_1.getTime)(dateTimeString);
        (0, globals_1.expect)(result).toBe(expected);
    });
});
