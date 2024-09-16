const format = require("pg-format");
const { db } = require("../connection");

enum UserRole {
    Organiser,
    Attendee
}

interface UsersData {
    usersData: {
        username: string;
        bio: string;
        role: UserRole;
    }
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
    }
}

interface TicketsData {
    ticketsData: {
        event_id: number,
        user_id: number
    }
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

    await insertUsers();
    await insertEvents();
    await insertTickets();

    async function createUsers(){
        return await db.query(
            `CREATE TABLE users
                (user_id SERIAL PRIMARY KEY,
                username VARCHAR(30) NOT NULL,
                bio VARCHAR(150),
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
                attendees VARCHAR(30)[]
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
}