export class Period {
    public date: string;
    public am: string;
    public pm: string;

    constructor(date){
        this.date = date;
        this.am = '';
        this.pm = '';
    }

    setValue(unit, value){
        if(unit === 'AM'){
            this.am = value;
        }else{
            this.pm = value;
        }
    }
}
