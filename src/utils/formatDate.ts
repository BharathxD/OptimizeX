const enum TimeAgo {
    Today = 'Today',
    Yesterday = 'Yesterday',
    TwoDaysAgo = "Two days ago",
    MoreThanTwoDaysAgo = 'More than two days ago'
}

const formatDate = (targetDate: Date): string => {
    const currentDate = new Date();
    // Current Time Zone Offset
    const currentTimezoneOffset = currentDate.getTimezoneOffset();
    // IST offset in minutes
    const ISTOffset = 330;
    const serverOffset = currentTimezoneOffset + ISTOffset * 60 * 1000;
    const serverTime = currentDate.getTime() + serverOffset;
    const serverDate = new Date(serverTime);

    const timeDifference = serverDate.getTime() - targetDate.getTime();
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000;

    if (timeDifference < oneDayInMilliseconds) {
        return `${TimeAgo.Today} at ${formatTime(targetDate)}`;
    } else if (timeDifference > oneDayInMilliseconds && timeDifference < 2 * oneDayInMilliseconds) {
        return `${TimeAgo.Yesterday} at ${formatTime(targetDate)}`;
    } else if (timeDifference > 2 * oneDayInMilliseconds && timeDifference < 3 * oneDayInMilliseconds) {
        return `${TimeAgo.TwoDaysAgo} at ${formatTime(targetDate)}`;
    } else {
        return TimeAgo.MoreThanTwoDaysAgo;
    }
}

const formatTime = (date: Date): string => {
    return date.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    });
}

export default formatDate;
