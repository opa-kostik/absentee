import { Injectable } from '@angular/core';

@Injectable()
export class ClashService {

  levels = [
      {level:'danger',  days:0, display:false, description: "Same day"},
      {level:'warning', days:1, display:false, description: "Adjacent"},
      {level:'info',    days:4, display:false, description: "4 days"}
    ];

  constructor() { }

  getLevels(){
     return this.levels; 
  }

  getClashLevel(offset){
    for(let i = 0; i < this.levels.length; i++){
      if (offset <= this.levels[i].days)
        return this.levels[i].level;  
    }
  }

}
