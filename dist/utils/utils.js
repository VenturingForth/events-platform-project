"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDate = getDate;
exports.getTime = getTime;
function getDate(dateTimeString) {
    const dateTimeArray = dateTimeString.split("T");
    const dateString = dateTimeArray[0];
    return dateString;
}
function getTime(dateTimeString) {
    const dateTimeArray = dateTimeString.split("T");
    const timeArray = dateTimeArray[1].split(":");
    const timeString = `${timeArray[0]}:${timeArray[1]}`;
    return timeString;
}
