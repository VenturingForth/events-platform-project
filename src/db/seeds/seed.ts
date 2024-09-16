const format = require("pg-format");
const { db } = require("../connection");
import { getDate, getTime } from "../../utils/utils";

enum UserRole {
    Organiser,
    Attendee
}

interface UsersData {
    usersData: {
        username: string;
        bio: string;
        role: UserRole;
    }[];
}

interface EventsData {
    eventsData: {
        event_title: string,
        description: string,
        location: string,
        start: string,
        end: string,
        organiser: string,
        attendees: Array<string>,
        price: number
    }[];
}

interface TicketsData {
    ticketsData: {
        event_id: number,
        user_id: number
    }[];
}

async function seed({
    usersData,
    eventsData,
    ticketsData
}: {
    usersData: UsersData,
    eventsData: EventsData,
    ticketsData: TicketsData
}) {
    await db.query(`DROP TABLE IF EXISTS tickets;`);
    await db.query(`DROP TABLE IF EXISTS events;`);
    await db.query(`DROP TABLE IF EXISTS users;`);

    await createUsers();
    await createEvents();
    await createTickets();

    await insertUsers(usersData);
    await insertEvents(eventsData);
    await insertTickets(ticketsData);

    async function createUsers(){
        return await db.query(
            `CREATE TABLE users
                (user_id SERIAL PRIMARY KEY,
                username VARCHAR(30) NOT NULL,
                bio VARCHAR(150),
                role VARCHAR (9),
                date_created CURRENT_TIMESTAMP
            )`
        )
    }

    async function createEvents(){
        return await db.query(
            `CREATE TABLE events
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
            )`
        )
    }

    async function createTickets(){
        return await db.query(
            `CREATE TABLE tickets
                (ticket_id SERIAL PRIMARY KEY,
                user_id INT REFERENCES users(user_id) NOT NULL,
                event_id INT REFERENCES events(event_id) NOT NULL
            )`
        )
    }

    async function insertUsers(usersData: any){
        const usersQuery = format(
            `INSERT INTO users (username, bio, role) VALUES %L RETURNING *;`,
            usersData.map(
                ({
                    username,
                    bio,
                    role
                }: {
                    username: string;
                    bio: string;
                    role: string;
                }) => [username, bio, role]
            )
        );

        const result = await db.query(usersQuery);
        return result;
    }

    async function insertEvents(eventsData: any){
        const eventsQuery = format(
            `INSERT INTO events (event_title, description, start_date, start_time, end_date, end_time, organiser_id, attendees)
            VALUES %L RETURNING *;`,
            eventsData.map(
                ({
                    event_title,
                    description,
                    location,
                    start,
                    end,
                    organiser,
                    attendees,
                    price
                }: {
                    event_title: string;
                    description: string;
                    location: string;
                    start: string;
                    end: string;
                    organiser: string;
                    attendees: string[];
                    price: number;
                }) => [event_title, description, location, getDate(start), getTime(start), getDate(end), getTime(end), getOrganiserId(organiser), attendees]
            )
        );

        const result = await db.query(eventsQuery);
        return result;
    }

    async function insertTickets(ticketsData: any){
        const ticketsQuery = format(
            `INSERT INTO tickets (event_id, user_id) VALUES %L RETURNING *;`,

        );

        const result = await db.query(ticketsQuery);
        return result;
    }

    async function getOrganiserId(organiser: string){
        const organiserIdQuery = `SELECT user_id FROM users WHERE username = ${organiser} RETURNING *;`;
        return organiserIdQuery;
    }
}

module.exports = { seed };