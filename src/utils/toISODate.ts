/**
 * Converts a timestamp to a date in ISO format
 * @param timestamp
 * @returns date in ISO format
 */
const toISODate = (timestamp: number): string => {
  if (isNaN(timestamp) || timestamp === null || timestamp === undefined) {
    return 'Invalid timestamp value';
  }
  const isMilliseconds = timestamp > 1e12;
  const date = new Date(isMilliseconds ? timestamp : timestamp * 1000);

  return date.toISOString();
};

export default toISODate;
