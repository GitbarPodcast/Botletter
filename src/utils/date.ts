export const date2YodaTime = (datetime: Date): string => datetime.toISOString().replace(/T/, ' ').split('.')[0];
