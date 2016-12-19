import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Absentee manager';
  period;
  menuOpened;

  ngOnInit(){
    this.menuOpened = true;
  }

  setPeriod(data){
    this.period = data;
  }

}
