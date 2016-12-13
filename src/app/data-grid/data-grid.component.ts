import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.css']
  
})

export class DataGridComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.load_calendar();    
  }

  load_calendar():void{
    // userid,name,date,unit,value
    var columns = [
      { head: 'name',   cl: 'name',   html: function(r) { return r.name; } },
      { head: 'userid', cl: 'userid', html: function(r) { return r.userid; } },
      { head: 'date',   cl: 'date',   html: function(r) { return r.date; } },
      { head: 'unit',   cl: 'unit',   html: function(r) { return r.unit; } },
      { head: 'value',  cl: 'value',  html: function(r) { return r.value; } }
    ];

    d3.csv("./assets/sampledata.txt", function(data)
    {
        console.log('starting upload');
        var table = d3.select('.calendarTable').append('table');
 
        table.append('thead').append('tr')
          .selectAll('th')
          .data(columns).enter()
          .append('th')
          .attr('class', function(d){return d.cl;})
          .text(function(d){return d.head});

        table.append('tbody')
          .selectAll('tr')
          .data(data).enter()
          .append('tr')
          .selectAll('td')
          .data(function(row, i) {
              return columns.map(function(column) {
                  let value = '';
                  let bgStyle = null;
                  if (column.head === 'value'){
                    switch(row[column.head]){
                      case 'V': bgStyle = 'green'; break;
                      case 'T': bgStyle = 'steelblue'; break;
                      case 'P': bgStyle = 'grey'; break;
                      default:  bgStyle = 'white';
                    }
                  }
                  value = row[column.head];
                  return {
                    column: column.head,
                    value:  value,
                    bgStyle: bgStyle}
              });
          }).enter()
            .append('td')
            .text(d=>d.value)
            .style('background-color', d=> d.bgStyle);
    })
  }
}
