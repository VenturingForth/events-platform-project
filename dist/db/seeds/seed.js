"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const format = require("pg-format");
const { db } = require("../connection");
const utils_1 = require("../../utils/utils");
var UserRole;
(function (UserRole) {
    UserRole[UserRole["Organiser"] = 0] = "Organiser";
    UserRole[UserRole["Attendee"] = 1] = "Attendee";
})(UserRole || (UserRole = {}));
function seed(_a) {
    return __awaiter(this, arguments, void 0, function* ({ usersData, eventsData, ticketsData }) {
        yield db.query(`DROP TABLE IF EXISTS tickets;`);
        yield db.query(`DROP TABLE IF EXISTS events;`);
        yield db.query(`DROP TABLE IF EXISTS users;`);
        yield createUsers();
        yield createEvents();
        yield createTickets();
        yield insertUsers(usersData);
        yield insertEvents(eventsData);
        yield insertTickets(ticketsData);
        function createUsers() {
            return __awaiter(this, void 0, void 0, function* () {
                return yield db.query(`CREATE TABLE users
                (user_id SERIAL PRIMARY KEY,
                username VARCHAR(30) NOT NULL,
                bio VARCHAR(150),
                role VARCHAR (9),
                date_created CURRENT_TIMESTAMP
            )`);
            });
        }
        function createEvents() {
            return __awaiter(this, void 0, void 0, function* () {
                return yield db.query(`CREATE TABLE events
                (event_id SERIAL PRIMARY KEY,
                event_title VARCHAR NOT NULL,
                description VARCHAR NOT NULL,
                created_at CURRENT_TIMESTAMP,
                start_date DATE,
                start_time TIME,
                end_date DATE,
                end_time TIME,
                organiser_id REF users(users_id) NOT NULL,
                attendees VARCHAR(30)[],
                price INT DEFAULT 0 NOT NULL
            )`);
            });
        }
        function createTickets() {
            return __awaiter(this, void 0, void 0, function* () {
                return yield db.query(`CREATE TABLE tickets
                (ticket_id SERIAL PRIMARY KEY,
                user_id INT REFERENCES users(user_id) NOT NULL,
                event_id INT REFERENCES events(event_id) NOT NULL
            )`);
            });
        }
        function insertUsers(usersData) {
            return __awaiter(this, void 0, void 0, function* () {
                const usersQuery = format(`INSERT INTO users (username, bio, role) VALUES %L RETURNING *;`, usersData.map(({ username, bio, role }) => [username, bio, role]));
                const result = yield db.query(usersQuery);
                return result;
            });
        }
        function insertEvents(eventsData) {
            return __awaiter(this, void 0, void 0, function* () {
                const eventsQuery = format(`INSERT INTO events (event_title, description, start_date, start_time, end_date, end_time, organiser_id, attendees)
            VALUES %L RETURNING *;`, eventsData.map(({ event_title, description, location, start, end, organiser, attendees, price }) => [event_title, description, location, (0, utils_1.getDate)(start), (0, utils_1.getTime)(start), (0, utils_1.getDate)(end), (0, utils_1.getTime)(end), getOrganiserId(organiser), attendees]));
                const result = yield db.query(eventsQuery);
                return result;
            });
        }
        function insertTickets(ticketsData) {
            return __awaiter(this, void 0, void 0, function* () {
                const ticketsQuery = format(`INSERT INTO tickets (event_id, user_id) VALUES %L RETURNING *;`);
                const result = yield db.query(ticketsQuery);
                return result;
            });
        }
        function getOrganiserId(organiser) {
            return __awaiter(this, void 0, void 0, function* () {
                const organiserIdQuery = `SELECT user_id FROM users WHERE username = ${organiser} RETURNING *;`;
                return organiserIdQuery;
            });
        }
    });
}
module.exports = { seed };
