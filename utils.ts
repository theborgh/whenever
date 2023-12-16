export const convertTimeStringToInt = (time: string) => {
  const [hours, minutes] = time.split(':');
  return Math.floor(Number(hours) * 4 + Number(minutes) / 15);
};
