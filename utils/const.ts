import moment from 'moment-timezone';

export const timezones = moment.tz.names();
export const timezoneGuess = moment.tz.guess();
export const timezonesWithOffsets = timezones.map((timezone) => ({name: timezone, offset: moment.tz(timezone).utcOffset() / 60}));
export const timezoneGuessOffset = timezonesWithOffsets[timezones.indexOf(timezoneGuess)].offset;