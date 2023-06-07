import { format, utcToZonedTime } from 'date-fns-tz';

const enum TimeAgo {
    Today = 'Today',
    Yesterday = 'Yesterday',
    TwoDaysAgo = 'Two days ago',
    MoreThanTwoDaysAgo = 'More than two days ago',
}

const formatDate = (targetDate: Date): string => {
    const currentDate = new Date();
    const serverTime = utcToZonedTime(currentDate, 'IST');
    const targetTime = utcToZonedTime(targetDate, 'Asia/Kolkata');

    const timeDifference = serverTime.getTime() - targetTime.getTime();
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000;

    if (timeDifference < oneDayInMilliseconds) {
        return `${TimeAgo.Today} at ${formatTime(targetTime)}`;
    } else if (timeDifference < 2 * oneDayInMilliseconds) {
        return `${TimeAgo.Yesterday} at ${formatTime(targetTime)}`;
    } else if (timeDifference < 3 * oneDayInMilliseconds) {
        return `${TimeAgo.TwoDaysAgo} at ${formatTime(targetTime)}`;
    } else {
        return TimeAgo.MoreThanTwoDaysAgo;
    }
};

const formatTime = (date: Date): string => {
    return format(date, 'h:mm a', { timeZone: 'Asia/Kolkata' });
};

export default formatDate;
