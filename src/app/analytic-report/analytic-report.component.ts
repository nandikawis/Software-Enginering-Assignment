import { Component, OnInit } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexTitleSubtitle
} from 'ng-apexcharts';

@Component({
  selector: 'app-analytic-report',
  templateUrl: './analytic-report.component.html',
  styleUrls: ['./analytic-report.component.css']
})
export class AnalyticReportComponent implements OnInit {
  chartData: any[] = [];
  monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

  ngOnInit() {

    const series = [
      { name: 'Sales', data: [31, 40, 28, 51, 42, 109, 100] }
    ];


    this.chartData = this.monthLabels.map((_, i) => series.map(s => ({ name: s.name, data: s.data[i] })));
  }
  public chartSeries: ApexAxisChartSeries = [
    {
      name: 'series1',
      data: [31, 40, 28, 51, 42, 109, 100]
    }
  ];
  public chartOptions: ApexChart = {
    type: 'bar',
    height: 350
  };
  public chartXaxis: ApexXAxis = {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'] // Example categories
  };
  public chartYaxis: ApexYAxis = {

  };
  public chartTitle: ApexTitleSubtitle = {
    text: 'Analytics Report'
  };
  selectedStatus: string = 'Sales';

  updateStatus(newStatus: string): void {
    this.selectedStatus = newStatus;
  }
}


