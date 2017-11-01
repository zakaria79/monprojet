export default class DateManager {

  constructor() {
    this.shortMonths = ['2','4','6','9','11'];
    this.months = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Aout','Septembre','Octobre','Novembre','Décembre'];
    this.daysOfWeek = ['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche'];
  }

  setDate (date) {
    let dateObject = {};
    dateObject.date = date;
    dateObject.year = date.getFullYear();
    dateObject.month = date.getMonth()+1;
    dateObject.day = date.getDate();
    dateObject.dateText = dateObject.day+'/'+ dateObject.month+'/'+ dateObject.year;
    dateObject.weekDay = this.getWeekDayNb(date.getDay());
    dateObject.weekDayToString = this.daysOfWeek[dateObject.weekDay-1];
    dateObject.monthToString = this.months[dateObject.month-1];
    dateObject.dateToString = dateObject.weekDayToString+' '+dateObject.day+' '+dateObject.monthToString+' '+dateObject.year;
    dateObject.dateStandard = dateObject.year+'-'+this.formatNumber(dateObject.month)+'-'+this.formatNumber(dateObject.day);
    dateObject.yearMonth = this.getYearMonth(dateObject.date);
    dateObject.firstWeekDayInMonth = this.getFirstWeekDayInMonth(date);
    return dateObject;
  }

  getFirstWeekDayInMonth (date) {
    let dateFirstWeekDayInMonth = new Date(date.getFullYear(),date.getMonth(),1);
    return this.getWeekDayNb(dateFirstWeekDayInMonth.getDay());
  }

  formatNumber (nb) { 
    return nb < 10 ? '0'+nb : nb; 
  }

  add (date,daysToAdd) {
    return new Date(date.getFullYear(),date.getMonth(),date.getDate()+daysToAdd);
  }

  getDateFirstDayInNextMonth (date) {
    return new Date(date.getFullYear(),date.getMonth()+1,1);
  }

  getDateLastDayInMonth (date) {
    return new Date(date.getFullYear(),date.getMonth()+1,0);
  }

  getWeekDayNb (weekDay) {
    return weekDay === 0 ? 7 : weekDay;
  }

  getWeekDayString (weekDay) {
    return this.daysOfWeek[this.getWeekDayNb(weekDay) -1];
  }

  getYearMonth (date) {
    return date.getFullYear()+'-'+this.formatNumber(date.getMonth()+1);
  }

  getDateFirstDayInMonth (date) {
    return new Date(date.getFullYear(),date.getMonth(),1);
  }

  getDateLastDayInLastMonth (date) {
    return  new Date(date.getFullYear(),date.getMonth(),0);
  }

  setDateFirstDayInWeek (date) {
    if (date.getDay() === 1) {
      return date;
    }
    let weekDay = this.getWeekDayNb(date.getDay());
    date.setDate(date.getDate() - (weekDay -1));
    return date;
  }

  getDateFirstDayInWeek (date) {
    if (date.getDay() === 1) {
      return new Date(date.getFullYear(), date.getMonth(), date.getDate);
    }
    let weekDay = this.getWeekDayNb(date.getDay()), dateFirstDayInWeek = new Date(date.getFullYear(),date.getMonth(),date.getDate());
    dateFirstDayInWeek.setDate(dateFirstDayInWeek.getDate() - (weekDay -1));
    return dateFirstDayInWeek;
  }

  getDateClone (date) {
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes()
    );
  }

  formatDateNumber (number) {
    return number < 10 ? '0'+number : number;
  }

  getStandardDate (date) {
    return date.getFullYear()+'-'+this.formatDateNumber(date.getMonth() +1)+'-'+this.formatDateNumber(date.getDate());
  }

  getStandardDateAndHour(date) {
    return `${this.getStandardDate(date)} ${this.formatDateNumber(date.getHours())}:00:00`;
  }

  getStringFromOneDate (date) {
    let d = this.getDetailsFromDateObject(date);
    return `${d[0]} ${d[1]} ${d[2]} ${d[3]}`;
  }

  getStringDateAndHourFromDateObject (date) {
    return `${this.getStringFromOneDate(date)} à ${date.getHours()}:${this.formatDateNumber(date.getMinutes())}`;
  }

  getDetailsFromDateObject (date) {
    return [ this.getWeekDayString(date.getDay()), date.getDate(), this.months[date.getMonth()], date.getFullYear(), ];
  }

  // Return "Du Mardi 5 Avril 2017 au Jeudi 10 Avril 2017
  getStringFromStartAndEndStandardDates (start, end) {
    let s = this.getDetailsFromDateObject(new Date(start)), e = this.getDetailsFromDateObject(new Date(end));
    return `Du ${s[0]} ${s[1]} ${s[2]} ${s[3]} au ${e[0]} ${e[1]} ${e[2]} ${e[3]}`;
  }

}
