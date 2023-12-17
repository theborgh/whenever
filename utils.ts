export const convertTimeStringToInt = (time: string) => {
  const [hours, minutes] = time.split(':');
  return Math.floor(Number(hours) * 4 + Number(minutes) / 15);
};

export const convertIntToTimeString = (time: number) => {
  const hours = Math.floor(time / 4);
  const minutes = (time % 4) * 15;
  return `${hours}:${minutes === 0 ? '00' : minutes}`;
}