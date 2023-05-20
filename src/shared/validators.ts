const dateRegex = /[0-9]{4}-[0-9]{2}-[0-9]{2}$/;

export const isValidDate = (date: string) => Boolean(date.match(dateRegex));
