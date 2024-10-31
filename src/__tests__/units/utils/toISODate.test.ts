import toISODate from '../../../utils/toISODate';

describe('toISODate', () => {
  it('should convert a timestamp in seconds to ISO format', () => {
    const timestampInSeconds = 1609459200; // Corresponds to 2021-01-01T00:00:00.000Z
    const result = toISODate(timestampInSeconds);
    expect(result).toBe('2021-01-01T00:00:00.000Z');
  });

  it('should convert a timestamp in milliseconds to ISO format', () => {
    const timestampInMilliseconds = 1609459200000; // Corresponds to 2021-01-01T00:00:00.000Z
    const result = toISODate(timestampInMilliseconds);
    expect(result).toBe('2021-01-01T00:00:00.000Z');
  });

  it('should handle timestamps far in the past or future', () => {
    const farFutureTimestamp = 32503680000; // Corresponds to 3000-01-01T00:00:00.000Z
    const result = toISODate(farFutureTimestamp);
    expect(result).toBe('3000-01-01T00:00:00.000Z');
  });

  it('should returns msg for invalid timestamp values', () => {
    const farFutureTimestamp = NaN;
    const result = toISODate(farFutureTimestamp);
    expect(result).toBe('Invalid timestamp value');
  });
});
