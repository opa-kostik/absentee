import { AbsenteeCalendar } from './absentee-calendar';

export class Calendar {
  private calendarData:AbsenteeCalendar[];

  constructor( private rawData){
      this.calendarData = [];
      this.transformData();
  }
  
  transformData(){
    for(let i = 0; i < this.rawData.length; i++){
        let item = this.rawData[i];
        this.setValue({
            userid: item.userid,
            date: item.date,
            unit: item.unit,
            value: item.value});
    } 
  }
  
  setValue(data){
    let calendarLine = this.getCalLine(data.userid);
    let periodLine = calendarLine.getPeriod(data.date);
    periodLine.setValue(data.unit, data.value);
    this.setCalLine(calendarLine);
  }

  getCalLine(userid):AbsenteeCalendar{
    
    let calendarLine:AbsenteeCalendar;  
    
    let ind = this.calendarData.findIndex( line => line.userid === userid);
    if(ind == -1){
        //new entry
        calendarLine = new AbsenteeCalendar(userid);
    }else{
        calendarLine = this.calendarData[ind];
    }
    return calendarLine;
  }

  setCalLine(calendarLine:AbsenteeCalendar):void{
    
    let ind = this.calendarData.findIndex( line => line.userid === calendarLine.userid);
    if(ind == -1){
        this.calendarData.push(calendarLine);
    }else{
        this.calendarData[ind] = calendarLine;
    }
  }

  getData(){
    
    return this.calendarData;
  }

  // getAbsensesOnDate(givenDate:Date, inDays:number){
  //   this.calendarData.map(userData => {
  //     userData.period
  //       .filter(period => 
  //               Number(period.date.substr(6)) === givenDate.getFullYear() && 
  //                   Number(period.date.substr(3,2))-1 === givenDate.getMonth() && 
  //                   Number(period.date.substr(0,2)) === givenDate.getDate() &&
  //                   ( period.am === 'T' || 
  //                     period.am === 'V' || 
  //                     period.pm === 'T' || 
  //                     period.pm === 'V' ) )
  //     return {
  //       userid: userData.userId,
  //       am: p
  //     }
  //     userData.)
  // }

  addDays(date, days) {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
}

