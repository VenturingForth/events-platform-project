"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const app = require("../app");
const request = require("supertest");
const { db } = require("../db/connection");
(0, globals_1.afterAll)(() => db.end());
(0, globals_1.describe)("/api/invalid-end-points", () => {
    (0, globals_1.test)("GET:404 responds with 404 when passed an invalid path", () => {
        return request(app)
            .get('api/invalid')
            .expect(404);
    });
});
