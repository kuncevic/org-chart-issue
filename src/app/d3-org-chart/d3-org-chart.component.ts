import {
  OnChanges,
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';

import { OrgChart } from 'd3-org-chart';

@Component({
  selector: 'app-d3-org-chart',
  templateUrl: './d3-org-chart.component.html',
  standalone: true,
  styleUrls: ['./d3-org-chart.component.css'],
})
export class D3OrgChartComponent implements AfterViewInit, OnChanges {
  @ViewChild('chartContainer') chartContainer!: ElementRef;
  @Input() data!: any[];
  chart: any;

  ngAfterViewInit() {
    if (!this.chart) {
      this.chart = new OrgChart();
    }
    this.updateChart();
  }

  ngOnChanges() {
    this.updateChart();
  }
  updateChart() {
    if (!this.data) {
      return;
    }
    if (!this.chart) {
      return;
    }
    this.chart
      .container(this.chartContainer.nativeElement)
      .data(this.data)
      .nodeWidth(() => 200)
      .nodeHeight(() => 120)
      .render();
  }
}
