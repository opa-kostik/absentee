import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-clash',
  templateUrl: './clash.component.html',
  styleUrls: ['./clash.component.scss']
})
export class ClashComponent implements OnInit {

  @Input()clashes;
  clashLevels;

  constructor(
    private userService:UserService) { 
    this.clashLevels = [
      {level:'danger',  days:0, display:false, description: "Same day"},
      {level:'warning', days:1, display:false, description: "Adjacent"},
      {level:'info',    days:4, display:false, description: "4 days"}
    ];
  }

  ngOnInit() {
  }

   displayClashes(clashLevel){
    return this.clashes.filter(item => item.level === clashLevel.level);
  }

}
