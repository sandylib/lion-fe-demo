export const inValid = (value) => value === null || value === undefined || value.length === 0

export const delay = ms => new Promise(res => setTimeout(res, ms));