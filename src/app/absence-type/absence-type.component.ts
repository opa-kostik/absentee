import { Component, OnInit } from '@angular/core';
import { AbsenceTypeService } from '../absence-type.service';
@Component({
  selector: 'app-absence-type',
  templateUrl: './absence-type.component.html',
  styleUrls: ['./absence-type.component.css']
})
export class AbsenceTypeComponent implements OnInit {
  opt;
  
  constructor(private absenceTypeService:AbsenceTypeService) { }

  ngOnInit() {
    this.setAbsenceType('V');
  }

  setAbsenceType(data){
    this.absenceTypeService.setType(data);
    this.opt = data;
  }

}
