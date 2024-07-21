import { AfterViewInit, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as d3 from 'd3';
import { D3OrgChartComponent } from './d3-org-chart/d3-org-chart.component';

interface DataRow {
  [key: string]: any; // Allow other properties
  _highlighted?: boolean;
  _centered?: boolean;
  _expanded?: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, D3OrgChartComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], // Fixed styleUrls
})
export class AppComponent implements AfterViewInit {
  data: DataRow[] | null | any = null;

  ngAfterViewInit() {
    d3.csv(
      'https://raw.githubusercontent.com/bumbeishvili/sample-data/main/org.csv'
    ).then((data) => {
      // Initialize the additional properties
      this.data = data.map((row) => ({
        ...row,
        _highlighted: false,
        _centered: false,
        _expanded: false,
      }));

      let prevIndex = 0;
      setInterval(() => {
        if (this.data) {
          this.data[prevIndex]._highlighted = false;
          let index = Math.floor(Math.random() * this.data.length);
          prevIndex = index;
          this.data[index]._centered = true;
          this.data[index]._expanded = true;
          this.data[index]._highlighted = true;
          this.data = [...this.data]; // Ensure the change detection mechanism works
        }
      }, 1000);
    });
  }
}
