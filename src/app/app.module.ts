import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { OptionsComponent } from './options/options.component';
import { CalendarComponent } from './calendar/calendar.component';
import { AbsenceTypeComponent } from './absence-type/absence-type.component';
import { CalendarService } from './calendar.service';
import { UserService } from './user.service';
import { AbsenceTypeService } from './absence-type.service';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    OptionsComponent,
    CalendarComponent,
    AbsenceTypeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
  ],
  providers: [
    CalendarService, 
    UserService,
    AbsenceTypeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
