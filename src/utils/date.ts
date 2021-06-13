export const date2utc = (datetime: Date): string => datetime.toISOString().replace(/T/, ' ').split('.')[0];
