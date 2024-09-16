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