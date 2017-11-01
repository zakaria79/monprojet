import SetEvent from './SetEvent';

export default class EveryDaysOfWeekEvent extends SetEvent {

    constructor(calendar) {
        super(calendar);
    }

    setEvent(event) {
        let i, tds, hourStart = event.getHourStart(),
            hourEnd = event.getHourEnd();
        this.event = event;
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
