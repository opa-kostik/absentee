import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import * as d3 from 'd3';

@Injectable()
export class CalendarService { 

  constructor(private http:Http) { }

  getCalendar(){
    return new Promise( (resolve,reject) =>
      d3.csv('./assets/sampledata.txt', (error, data) =>{ 
        if(error){
          reject(error);
        }else
        resolve(data) 
      }) 
    )}

}
