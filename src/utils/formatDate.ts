import { format, utcToZonedTime } from "date-fns-tz";

const enum TimeAgo {
  Today = "Today",
  Yesterday = "Yesterday",
  TwoDaysAgo = "Two days ago",
  MoreThanTwoDaysAgo = "More than two days ago",
}

/**
 * The function formats a given date into a string that represents how long ago the date was relative
 * to the current server time.
 * @param {Date} targetDate - The targetDate parameter is a Date object representing the date and time
 * to be formatted.
 * @returns The function `formatDate` returns a string that represents the time difference between the
 * `targetDate` and the current server time in the Indian Standard Time (IST) zone. 
 * The string returned is based on the time difference and is formatted to show the time in a human-readable format using
 * the `TimeAgo` enum and the `formatTime` function.
 */
const formatDate = (targetDate: Date): string => {
  const currentDate = new Date();
  const serverTime = utcToZonedTime(currentDate, "IST");
  const targetTime = utcToZonedTime(targetDate, "Asia/Kolkata");

  const timeDifference = serverTime.getTime() - targetTime.getTime();
  const oneDayInMilliseconds = 24 * 60 * 60 * 1000;

  switch (true) {
    case timeDifference < oneDayInMilliseconds:
      return `${TimeAgo.Today} at ${formatTime(targetTime)}`;
    case timeDifference < 2 * oneDayInMilliseconds:
      return `${TimeAgo.Yesterday} at ${formatTime(targetTime)}`;
    case timeDifference < 3 * oneDayInMilliseconds:
      return `${TimeAgo.TwoDaysAgo} at ${formatTime(targetTime)}`;
    default:
      return TimeAgo.MoreThanTwoDaysAgo;
  }
};

const formatTime = (date: Date): string => format(date, "h:mm a", { timeZone: "Asia/Kolkata" });

export default formatDate;
