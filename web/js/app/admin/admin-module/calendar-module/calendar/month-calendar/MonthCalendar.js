import Calendar from './../Calendar';

import NoRecurrentEvent from './set-event-on-calendar/NoRecurrentEvent';
import EveryDayEvent from './set-event-on-calendar/EveryDayEvent';
import EveryDaysOfWeekEvent from './set-event-on-calendar/EveryDaysOfWeekEvent';
import WorkingDaysEvent from './set-event-on-calendar/WorkingDaysEvent';
import EveryWeekEvent from './set-event-on-calendar/EveryWeekEvent';
import EveryMonthEvent from './set-event-on-calendar/EveryMonthEvent';
import EveryYearEvent from './set-event-on-calendar/EveryYearEvent';

export default class MonthCalendar extends Calendar {

    constructor(app) {
        super(app, 'month', 'Mois', ['#month td', '#month tr', '.tdMonth', '.eventMonth'], ['#month', '#calendar .date_to_string']);
        this.eventElts = this.Es.eventMonthElts;
        this.tdElts = this.Es.monthtdElts;
        this.eventHandlers = [
            new NoRecurrentEvent(this),
            new EveryDayEvent(this),
            new EveryWeekEvent(this),
            new EveryDaysOfWeekEvent(this),
            new WorkingDaysEvent(this),
            new EveryMonthEvent(this),
            new EveryYearEvent(this)
        ];
    }

    goToNext() {
        this.app.currentDate.date.setMonth(this.app.currentDate.month);
        this.app.setCurrentDate(this.app.currentDate.date);
    }

    goToPrevious() {
        this.app.currentDate.date.setMonth(this.app.currentDate.month - 2);
        this.app.setCurrentDate(this.app.currentDate.date);
    }

    setCurrentDateText() {
        this.Es.calendardate_to_stringElt.textContent = this.app.currentDate.monthToString + ' - ' + this.app.currentDate.year;
    }

    setDates() {
        let currentDate = this.app.currentDate,
            dateLastDayInLastMonth = this.dm.getDateLastDayInLastMonth(currentDate.date),
            dateFirstDayInNextMonth;
        this.daysInLastMonth = dateLastDayInLastMonth.getDate();
        this.yearMonthLastMonth = this.dm.getYearMonth(dateLastDayInLastMonth);
        dateFirstDayInNextMonth = this.dm.getDateFirstDayInNextMonth(this.app.currentDate.date);
        this.nextYearMonth = this.dm.getYearMonth(dateFirstDayInNextMonth);
        this.lastDayInMonth = this.dm.getDateLastDayInMonth(currentDate.date).getDate();
    }

    setTdMonthProperties(index, textContent, cls, date) {
        this.Es.tdMonthElts[index].textContent = textContent;
        this.Es.monthtdElts[index].classList.add(cls);
        this.Es.monthtdElts[index].dataset.date = date;
    }

    initializeCalendar() {
        let i;
        super.initializeCalendar();
        this.dem.removeClassIfExist('prevNext');
        this.dem.removeClassIfExist('normal');
        this.eventsInTds = [];
        for (i = 0; i < 42; i++) {
            this.eventsInTds.push(0);
        }
        if (this.calendarElt.querySelector('.countEvent')) {
            this.dem.emptyElements(this.calendarElt.querySelectorAll('.countEvent'));
        }
    }

    fillCalendar() {
        super.fillCalendar();
        let currentDate = this.app.currentDate,
            i, start;
        // Mois courrant 
        for (i = currentDate.firstWeekDayInMonth - 1, start = 1; i < this.lastDayInMonth + currentDate.firstWeekDayInMonth - 1; i++, start++) {
            this.setTdMonthProperties(i, start, 'normal', this.app.currentDate.yearMonth + '-' + this.app.formatNumber(start));
        }
        // Mois dernier
        for (i = currentDate.firstWeekDayInMonth - 2, start = this.daysInLastMonth; i >= 0; i--, start--) {
            this.setTdMonthProperties(i, start, 'prevNext', this.yearMonthLastMonth + '-' + start);
        }
        // Mois prochain
        for (i = this.lastDayInMonth + (currentDate.firstWeekDayInMonth - 1), start = 1; i < this.Es.tdMonthElts.length; i++, start++) {
            this.setTdMonthProperties(i, start, 'prevNext', this.nextYearMonth + '-' + this.app.formatNumber(start));
        }
        this.setTodayClass();
        this.start = this.Es.monthtdElts[0].dataset.date;
        this.end = this.Es.monthtdElts[this.Es.monthtdElts.length - 1].dataset.date;
        this.setStartAndEndDates();
        this.getEventsCalendar();
    }

}
