import { Injectable } from '@angular/core';

@Injectable()
export class Utils {

  addDays(date, days) {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  date2Period(date){
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
    let day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    return day + '/' + month + '/' + year;
  }

  period2Date(period){
    return new Date( Number(period.substr(6)),
                     Number(period.substr(3,2))-1,
                     Number(period.substr(0,2)) )
  }
  
  datesEqual(a:Date,b:Date){
    return (a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() && 
        a.getDate() === b.getDate());
  }

  datesDiffInDays(a:Date, b:Date) {
    let utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    let utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor(Math.abs(utc2 - utc1) / (1000 * 60 * 60 * 24));
  }

  getWorkingDays(startDate:Date, endDate:Date):Date[]{

    let result = [];
    let currentDate = startDate;
    while (currentDate <= endDate)  {  
        let weekDay = currentDate.getDay();
        if(weekDay != 0 && weekDay != 6) result.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate()+1); 
    }
    return result;
  }
}
