import SetEvent from './SetEvent';

export default class EveryDayEvent extends SetEvent {

    constructor(calendar) {
        super(calendar);
    }

    setOccurences() {
        let i, hourStart = this.event.getHourStart(),
            hourEnd = this.event.getHourEnd();
        this.calendar.eventInColumn++;
        if (this.calendar.eventInColumn >= 5) {
            this.createCounterElement();
        } else {
            for (i = hourStart; i <= hourEnd; i++) {
                this.createEventElement(this.eventElts[i], i === hourStart);
            }
        }
    }

    setEvent(event) {
        let start;
        this.event = event;
        if (this.app.currentDate.dateStandard === event.start.date_standard) {
            this.setOccurences();
        } else {
            start = new Date(event.start.date_standard + ' 00:00:00:00');
            while (start.getTime() < this.calendar.timeStart) {
                start.setDate(start.getDate() + event.interval);
            }
            if (this.app.currentDate.dateStandard === this.dm.getStandardDate(start)) {
                this.setOccurences();
            }
        }
    }
}
