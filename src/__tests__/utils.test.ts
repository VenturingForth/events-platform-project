import { describe, test, expect } from "@jest/globals";
import { getDate, getTime } from "../../src/utils/utils";

describe("Testing for the getDate function", () => {
    test("Function should return a string", ()=> {
        const dateTimeString: string = "2024-10-18T18:30:00.000Z"
        const result: string = getDate(dateTimeString);
        expect(typeof result).toBe('string');
    })
    test("Function should return date from a time stamp string in the format of YYYY-MM-DD", () => {
        const dateTimeString: string = "2024-10-18T18:30:00.000Z"
        const expected: string = "2024-10-18"
        const result: string = getDate(dateTimeString);
        expect(result).toBe(expected);
    })
})
describe("Testing for the getTime function", () => {
    test("Function should return a string", () => {
        const dateTimeString: string = "2024-10-18T18:30:00.000Z"
        const result: string = getTime(dateTimeString);
        expect(typeof result).toBe('string');
    })
    test("Function should return time from a time stamp string in the format of HH:MM", () => {
        const dateTimeString: string = "2024-10-18T18:30:00.000Z";
        const expected: string = "18:30";
        const result: string = getTime(dateTimeString);
        expect(result).toBe(expected);
    })
})