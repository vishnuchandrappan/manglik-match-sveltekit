/**
 * Converts a date object to a human readable string
 * @param date Date object
 * @returns string in the format "Month Day, Year at Time"
 */
export const convertToHumanReadableDate = (date: Date) => {
	const dateObj = new Date(date);
	const month = dateObj.toLocaleString('default', { month: 'short' });
	const day = dateObj.getDate();
	const year = dateObj.getFullYear();
	const time = dateObj.toLocaleString('en-US', {
		hour: 'numeric',
		minute: 'numeric',
		hour12: true
	});
	return `${month} ${day}, ${year} at ${time}`;
};
