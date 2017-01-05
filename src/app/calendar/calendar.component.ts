import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { AbsenteeCalendar } from '../absentee-calendar';
import { Calendar } from '../calendar';
import { Period } from '../period';
import { CalendarService } from '../calendar.service'
import { UserService } from '../user.service'; 
import { AbsenceTypeService } from '../absence-type.service';
import { ClashService } from '../clash.service';
import { Utils } from '../utils.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [ClashService]
})
export class CalendarComponent implements OnInit, OnChanges {

  @Input()period;
  
  columns:Array<any>;
  calendar:Calendar;
  displayTable;
  selection:Array<any>;
  clashes:Array<any>;
  clashLevels;

  constructor(
    private calendarService:CalendarService,
    private userService:UserService,
    private utils:Utils,
    private clashService:ClashService,
    private absenceTypeService:AbsenceTypeService) { 
  }  
  
  ngOnInit(){
    this.calendarService.getCalendar()
      .then(data => {
        this.calendar = new Calendar(data);
      });
    
    this.setColumns();
    this.selection = [];
    this.clashes = [];
  }

  setColumns(){
    this.columns = this.userService.getUsers();
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
    
    let utils = this.utils;
    let currentPeriod = this.utils.getWorkingDays(startDate, endDate);
    let displayTable = [];
    if(!this.calendar) return displayTable;
    let calendarData = this.calendar.getData();
    for(let i = 0; i < currentPeriod.length; i++){
      displayTable[i] = {date: currentPeriod[i], absData:[]};
      for(let j = 0; j < calendarData.length; j++){
        let values = calendarData[j].period.find(
          period => utils.datesEqual(utils.period2Date(period.date),currentPeriod[i])
        )
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

  collectUpdate(data){
    //find in update or add new 
    console.log('EXAMPLE SERVER UPDATE REQUEST');
    console.log(data);
    this.calendar.setValue(data);
  }

  isCurrentUser(userid){
    return userid === this.userService.getCurrentUser().userid;  
  }

  onCellClick(date,cell){
    if(!this.isCurrentUser(cell.userid)){
      return;
    }
    let absType = this.absenceTypeService.getType();
    if(cell.value === absType) return; 
    
    cell.value = absType;
    let dateFmt = this.utils.date2Period(date);
    this.collectUpdate({
      userid:cell.userid, 
      date:dateFmt, 
      unit:cell.unit,
      value:cell.value
    });
    
    let clashes = this.detectClashes(date,cell);
    if (clashes && clashes.length > 0){
      clashes.forEach(item =>{
        let index = this.clashes.findIndex(clash => {
          return (
            clash.level === item.level && 
            clash.yourDate === item.yourDate &&
            clash.userid === item.userid )
        });
        if (index > -1){
          if (!this.clashes[index].dates || 
          this.clashes[index].dates.findIndex( clashDate => this.utils.datesEqual(clashDate,item.date)) < 0)
            this.clashes[index].dates.push(item.date);
        }else{  
          this.clashes.push({
            level:item.level, 
            yourDate: item.yourDate,
            userid: item.userid, 
            dates: [item.date]  
          })
        }
      })
    }
  }

  detectClashes(date,cell){
    
    if(!this.calendar) return; 
    
    if(!this.isClash(cell.value)){
      let thatDay = this.calendar.getCalLine(cell.userid).getPeriod(this.utils.date2Period(date));
      if(cell.unit === 'AM' && !this.isClash(thatDay.pm) ||
         cell.unit === 'PM' && !this.isClash(thatDay.am) ){
        this.clashes = this.clashes.filter(item => item.yourDate !== date);
      }
      return;
    }
    let userid = this.userService.getCurrentUser().userid;
    let startDate = this.utils.addDays(date,-4);
    let endDate = this.utils.addDays(date,4); 
    let watchPeriod = this.utils.getWorkingDays(startDate, endDate);
    let calendarData = this.calendar.getData();
    let result = [];
    
    for(let i = 0; i < watchPeriod.length; i++){
      for(let j = 0; j < calendarData.length; j++){
        if (!this.isCurrentUser(calendarData[j].userid)){
          let values = calendarData[j].period.find(period  => 
            this.utils.datesEqual(this.utils.period2Date(period.date),watchPeriod[i]));
          if (values && 
             (this.isClash(values.am) ||
              this.isClash(values.pm))){
            //clash detected
            let level = this.clashService.getClashLevel(this.utils.datesDiffInDays(date, watchPeriod[i]));
            result.push({
              level: level,
              yourDate: date,
              userid: calendarData[j].userid,
              date: watchPeriod[i],
              am: values.am,
              pm: values.pm
            })
          }
        }
      }
    }    
    return result;
  }

  isClash(value){
    return (value === 'T' || value === 'V');
  }

}