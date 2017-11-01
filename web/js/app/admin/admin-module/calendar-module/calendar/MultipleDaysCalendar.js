import Calendar from './Calendar';

export default class MultipleDaysCalendar extends Calendar {

  constructor (app, name, title, elementsArray, elementArray) {
 
   super(app,name,title,elementsArray,elementArray); 
  
  }


  goToNext () {

    this.dates[this.dateArrayLength].date.setDate(this.dates[this.dateArrayLength].day + 1);

    this.app.setCurrentDate(this.dates[this.dateArrayLength].date);

  }


  goToPrevious () {

    this.dates[0].date.setDate(this.dates[0].day - (this.dateArrayLength +1));

    this.app.setCurrentDate(this.dates[0].date);

  }


  setCurrentDateText () {

    let dateText = 'du  '+this.dates[0].day+'/'+this.dates[0].month+'/'+this.dates[0].year+' au  '+this.dates[this.dateArrayLength].day+'/'+this.dates[this.dateArrayLength].month+'/'+this.dates[this.dateArrayLength].year;

    this.date_to_stringElt.textContent = dateText;

  }


  setDates () {

    let i;

    this.today = false;

    for (i = 0; i <= this.dateArrayLength; i++) {

      this.dates[i] = this.app.dm.setDate( this.app.dm.add( this.currentDate,i));

      if (this.dates[i].dateStandard === this.app.dateToday.dateStandard) {

        this.today = true;

        this.todayDatesIndex = i+1;

      }

    }

  }


  fillCalendar () {

    let i, j, tdElts;

    super.fillCalendar();

    for (i = 1; i <= this.dates.length; i++) {

      tdElts = this.calendarElt.querySelectorAll('[data-column="'+i+'"]');

      this.thElts[i].textContent = this.dates[i-1].weekDayToString.substr(0,1) + '.'+this.dates[i-1].day;

      for (j = 0; j < tdElts.length; j++) {

        tdElts[j].dataset.date = this.dates[i-1].dateStandard;

        tdElts[j].dataset.weekday = this.dates[i-1].weekDay;

      }

    }

    this.start = this.tdElts[1].dataset.date;
    this.end = this.tdElts[this.tdElts.length -1].dataset.date;

    this.setStartAndEndDates();

  }


  initializeCalendar () {

    let todayElt, todayElts, countEvent, countEvents, evElt;

    super.initializeCalendar();

    for (evElt of this.evTitleElts) {
    
      evElt.innerHTML = '';
    
    }

    if (this.today) {

      todayElts = this.calendarElt.querySelectorAll('[data-column="'+this.todayDatesIndex+'"]');

      for (todayElt of todayElts) {

        todayElt.classList.add('today');

      }

    }

    if (this.calendarElt.querySelector('.count_events')) {

      countEvents = this.calendarElt.querySelectorAll('.count_events');

      for (countEvent of countEvents) {
      
        countEvent.parentElement.removeChild(countEvent);
      
      }

    }

  }

}
