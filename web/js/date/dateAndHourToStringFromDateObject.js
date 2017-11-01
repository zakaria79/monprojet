export const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aôut', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
export const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

export const dateAndHourToStringFromDateObject = function(date) {
  return `${dateToString(date)} à ${date.getHours()}:${formatDateNumber(date.getMinutes())}`;
};

export const dateToString = function(date) {
  let d = detailsFromDateObject(date);
  return `${d[0]} ${d[1]} ${d[2]} ${d[3]}`;
};

export const detailsFromDateObject = function(date) {
  return [weekDayToString(date.getDay()), date.getDate(), months[date.getMonth()], date.getFullYear(), ];
};

export const weekDayToString = function(weekDay) {
  return days[weekDayNb(weekDay) - 1];
};

export const weekDayNb = function(weekDay) {
  return weekDay === 0 ? 7 : weekDay;
};

const formatDateNumber = function(number) {
  return number < 10 ? '0' + number : number;
};
