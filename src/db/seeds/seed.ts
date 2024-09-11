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
        location: string
    }
}