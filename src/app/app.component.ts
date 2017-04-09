import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Linux Academy Car Wash';
  total: number;

  onDisplayTotal(updatedTotal) {
    this.total = updatedTotal;
  }
}
