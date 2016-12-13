import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent implements OnInit {
  
  start:string;
  end:string;
  @Output() periodUpdated = new EventEmitter();
  constructor() { 
  }

  ngOnInit() {
  }

  setPeriod(){
    this.periodUpdated.emit({start:this.start,end:this.end});
  }
  
}
