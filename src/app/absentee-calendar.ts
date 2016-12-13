import { Period } from './period';

export class AbsenteeCalendar {
    public userid:string;
    public period:Period[];

    constructor( userid){
        this.userid   = userid;
        this.period   = [];
    }

    getPeriod(date){
        let periodLine:Period;
        if (this.period){
            let ind = this.period.findIndex(period => period.date === date);
            if(ind > -1){
                periodLine = this.period[ind];
            }else{
                periodLine = new Period(date);
                this.period.push(periodLine);
            }    
        }else{
            periodLine = new Period(date);
            this.period.push(periodLine);
        }
        return periodLine;
    }
}
