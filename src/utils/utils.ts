function getDate(dateTimeString: string):string {
    const dateTimeArray = dateTimeString.split("T");
    const dateString: string = dateTimeArray[0];
    return dateString;
}

function getTime(dateTimeString: string): string {
    const dateTimeArray = dateTimeString.split("T");
    const timeArray = dateTimeArray[1].split(":");
    const timeString = `${timeArray[0]}:${timeArray[1]}`;
    return timeString;
}

export { getDate, getTime };