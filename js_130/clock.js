'use strict'
/**
 * Big picture
 *  - class Clock
      - static time: not set
      - constructor(): NA
      - Clock.at(hr, min)
        - arguments: hr (integer >= 0), min (")
        - side effect: sets clock time
        - returns clock instance of clock
      - clock.toString()
        - arguments: none
        - returns: string representation of time 'hh:mm'
      - clock.add(min) 
        - arguments: minutes (integer >= 0)
        - side effects: adds time interval to clock time
        - return: clock
      - clock.subtract(h, m)
        - arguments: minutes (integer >= 0)
        - side effects: adds time interval to clock time
        - return: clock 
 *    
 * 
 * Implementation
 *  - Create a clock that stores a time
 *    - TIME: [hours, minutes]
        - get/set hours()? 
        - get/set mins()? 
      - Clock.at(hours, min)
        - arguments: hours and min in integers > 0
        - set clock time
        - return clock
      - Clock.toString()
        - return string formatted Clock.time hour.toString + ':' + min.toString
      - Clock.add(minutes)
        - convert min to hours and min
        - reduce hours to mod 24
        - add minutes to this.TIME.minutes
          - adjust hours if necessary
        - add hours to this.TIME.hours
          - mod by 24
        - return Clock 
 * 
 * Boundary conditions, edge cases, assumptions
    - negative args, no
    - min args > 60 min, yes
    - min args > 24 hours, yes
    - string, infinity, spaces... no
 */ 

class Clock {

  static at(hours, minutes = 0){
    return new Clock({hours, minutes});
  }

  constructor(time){
    this.TIME = time;
  }

  toString(){
    let hours = this.TIME.hours;
    let minutes = this.TIME.minutes; 
    hours = (hours < 10) ? '0' + hours.toString() : hours.toString();
    minutes = (minutes < 10) ? '0' + minutes.toString() : minutes.toString(); 
    return `${hours}:${minutes}`
  }

  add(minutes){
    const timeDelta = this.convertMinToHM(minutes);
    
    let newMinutes = this.convertMinToHM(timeDelta.minutes + this.TIME.minutes);
    this.TIME.minutes = newMinutes.minutes;

    this.TIME.hours += newMinutes.hours;
    this.TIME.hours += timeDelta.hours;
    this.TIME.hours = this.removeExcessDays(this.TIME.hours);

    return this;
  }

  subtract(minutes){
    const timeDelta = this.convertMinToHM(minutes);

    let newMinutes = this.TIME.minutes - timeDelta.minutes;
    if(newMinutes >= 0) {
      this.TIME.minutes = newMinutes;
    } else {
      this.TIME.minutes = newMinutes + 60;
      timeDelta.hours = this.removeExcessDays(timeDelta.hours + 1);
    }
    
    this.TIME.hours -= timeDelta.hours;
    if(this.TIME.hours < 0) this.TIME.hours += 24;

    return this;
  }

  isEqual(clock){
    return (this.TIME.hours === clock.TIME.hours) && 
      (this.TIME.minutes === clock.TIME.minutes)
  }

  _convertMinToHM(minutes){
    const time = {hours: 0, minutes: 0};
    time.minutes = minutes % 60;
    time.hours = this.removeExcessDays((minutes - time.minutes)/60);
    return time;
  }

  _removeExcessDays(hours){
    return hours % 24;
  }
}

module.exports = Clock;