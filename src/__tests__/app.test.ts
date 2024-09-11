import { describe, expect, test, afterAll } from "@jest/globals";
const app = require("../app");
const request = require("supertest");

const { db } = require("../db/connection");

afterAll(() => db.end());

describe("/api/invalid-end-points", () => {
    test("GET:404 responds with 404 when passed an invalid path", () => {
        return request(app)
        .get('api/invalid')
        .expect(404)
        .then(({body}) => {
            expect(body.msg).toBe('Invalid Endpoint');
        })
    })
})