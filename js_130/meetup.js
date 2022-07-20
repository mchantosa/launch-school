class Meetup{
  
  static DAYS = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday'
  ]

  constructor(year, month){
    this.year = year
    this.month = month;
  }

  day(weekday, schedule){
    const scheduleRanges = {
      first: [1, 7], 
      second: [8, 14], 
      third: [15, 21], 
      fourth: [22, 28],
      fifth: [29, 31], 
      last: [31, 21],
      teenth: [13, 19]
    }

    let date = null;
    if(schedule.toLowerCase() !== 'last'){
      for(
        let index = scheduleRanges[schedule.toLowerCase()][0];
        index <= scheduleRanges[schedule.toLowerCase()][1];
        index++
      ){
        let newDate = new Date(this.year, this.month - 1, index);
        if(
            (newDate.getUTCDay() === Meetup.DAYS.indexOf(weekday.toLowerCase())) &&
            (newDate.getMonth() === this.month - 1)
          ) {
          date = newDate;
          break;
        }
      }
    } else{
      for(
        let index = scheduleRanges[schedule.toLowerCase()][0];
        index >= scheduleRanges[schedule.toLowerCase()][1];
        index--
      ){
        let newDate = new Date(this.year, this.month - 1, index);
        if(
            (newDate.getUTCDay() === Meetup.DAYS.indexOf(weekday.toLowerCase())) &&
            (newDate.getMonth() === this.month - 1)
          ) {
          date = newDate;
          break;
        }
      }
    }
    return date;
  }
}

module.exports = Meetup;