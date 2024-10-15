export const convertTimestampToString = (date: number | undefined): string => {
  return  date ? new Date(date).toLocaleDateString("uk-UA") : '';
};
