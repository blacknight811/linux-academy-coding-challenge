import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-total-display',
  templateUrl: './total-display.component.html',
  styleUrls: ['./total-display.component.css']
})
export class TotalDisplayComponent implements OnInit {
  @Input() total = 0;

  constructor() {
  }

  ngOnInit() {
  }



}
