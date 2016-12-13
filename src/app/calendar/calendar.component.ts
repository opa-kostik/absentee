import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { AbsenteeCalendar } from '../absentee-calendar';
import { Calendar } from '../calendar';
import { Period } from '../period';
import { CalendarService } from '../calendar.service'
import { UserService } from '../user.service'; 
import { AbsenceTypeService } from '../absence-type.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnChanges {
  
  columns:Array<any>;
  calendar:Calendar;
  displayTable;
  @Input()period;
  user;
  selection:Array<any>;
  
  constructor(
    private calendarService:CalendarService,
    private userService:UserService,
    private absenceTypeService:AbsenceTypeService) { 
    
    this.calendarService.getCalendar()
      .then(data => {
        this.calendar = new Calendar(data);
      });
    
    this.setColumns();
    this.user = this.userService.getCurrentUser();
    this.selection = [];
  }  
  
  ngOnInit(){}

  setColumns(){
    this.columns = this.userService.getUsers();
  }

  getBG(value){
    switch(value){
      case 'V': return 'green';
      case 'T': return 'grey';
      case 'P': return 'purple';
      default : return '#FAFAFA'; 
    }
  }

  ngOnChanges(changes:SimpleChanges){
    //set new start and end dates
    let period = changes['period'];
    if (period.currentValue){
      let start = period.currentValue.start;
      let end = period.currentValue.end;
      if (!period.previousValue || 
          period.previousValue.start !== start ||
          period.previousValue.end !== end){
      
        let startDate = new Date(start);
        let endDate = new Date(end);
        this.displayTable = this.getDisplayData(startDate, endDate); 
      }
    } 
  }

  getDisplayData(startDate, endDate){
    
    let currentPeriod = this.getWorkingDays(startDate, endDate);
    let displayTable = [];
    if(!this.calendar) return displayTable;
    let calendarData = this.calendar.getData();
    for(let i = 0; i < currentPeriod.length; i++){
      displayTable[i] = {date: currentPeriod[i], absData:[]};
      for(let j = 0; j < calendarData.length; j++){
        let values = calendarData[j].period.find(period  => {
          return ( Number(period.date.substr(6)) === currentPeriod[i].getFullYear() && 
                    Number(period.date.substr(3,2))-1 === currentPeriod[i].getMonth() && 
                    Number(period.date.substr(0,2)) === currentPeriod[i].getDate() )
        })
        let am = '';
        let pm = '';
        if(values){
          am = values.am;
          pm = values.pm;
        }
        displayTable[i].absData[2*j] = {
          userid: calendarData[j].userid, 
          unit:'AM',
          value: am
        };
        displayTable[i].absData[2*j+1] = {
          userid: calendarData[j].userid, 
          unit:'PM',
          value: pm
        };
      }
    }
    return displayTable;
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

  onCellClick(date,cell){
    if(cell.userid === this.user.userid){
      let absType = this.absenceTypeService.getType();
      if (absType === undefined){
        console.log('absence type is not set!');
      }else{  
        cell.value = absType;
        debugger;
        let dateFmt = this.fmtDate(date);
        this.collectUpdate({
            userid:cell.userid, 
            date:dateFmt, 
            unit:cell.unit,
            value:cell.value
          });
      }
    }
  }

  collectUpdate(data){
    //find in update or add new 
    console.log('EXAMPLE SERVER UPDATE REQUEST');
    console.log(data);
    this.calendar.setValue(data);
  }

  submitSelected(){
    this.selection.forEach(item =>{
      console.log(item);  
    });
  }  

  fmtDate(date){
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
    let day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    return day + '/' + month + '/' + year;
  }
}