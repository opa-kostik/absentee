import { Injectable } from '@angular/core';

@Injectable()
export class AbsenceTypeService {
  private type;

  constructor() { }

  setType(data){
    this.type = data;
  }

  getType(){
    return this.type;
  }

}
