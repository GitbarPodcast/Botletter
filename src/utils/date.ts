export const date2utc = (datetime: Date) => datetime.toISOString().replace(/T/, ' ').split('.')[0];
