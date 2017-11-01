import SetEvent from './SetEvent';

export default class EveryWeekEvent extends SetEvent {

  constructor (calendar) {

    super (calendar);

  }


  setEvent (event) {

    let interval = 7 * event.interval, calendarWeekStart, eventWeekStart, dayRec, i, tds, currentWeekDay, weekday = this.app.currentDate.weekDay,
      hourStart = event.getHourStart(), hourEnd = event.getHourEnd();

    this.event = event;

    // Récupère le premier jour de la semaine de l'évenement
    eventWeekStart = new Date(event.start.date_standard+' 00:00:00:00');
    eventWeekStart.setDate(eventWeekStart.getDate() -(this.app.dm.getWeekDayNb(eventWeekStart.getDay()) -1));

    // Récupère le premier jour de la semaine du calendrier
    calendarWeekStart = new Date(this.app.currentDate.dateStandard+' 00:00:00');
    calendarWeekStart.setDate(calendarWeekStart.getDate() -(this.app.dm.getWeekDayNb(calendarWeekStart.getDay()) -1));

    while (eventWeekStart.getTime() < calendarWeekStart.getTime()) {

      eventWeekStart.setDate(eventWeekStart.getDate() + interval);

    }

    if (eventWeekStart.getTime() === calendarWeekStart.getTime() && event.daysRec.includes(weekday.toString())) {

      this.calendar.eventInColumn++;

      if (this.calendar.eventInColumn >= 5) {

        this.createCounterElement();

      } else {

        for (i = hourStart; i <= hourEnd; i++) {

          this.createEventElement(this.eventElts[i], i === hourStart);

        }

      }

    }

  }

}
