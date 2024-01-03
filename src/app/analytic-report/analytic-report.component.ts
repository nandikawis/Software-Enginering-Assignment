import { Component, OnInit } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexTitleSubtitle
} from 'ng-apexcharts';
import { ProductService } from '../services/product.service';
import { ReceiptService } from '../services/receipt.service';
import { MerchantService } from '../services/merchant.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-analytic-report',
  templateUrl: './analytic-report.component.html',
  styleUrls: ['./analytic-report.component.css']
})
export class AnalyticReportComponent {
  chartData: any[] = [];
  monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
  productStats: { productId: string, name: string, productSold: number, revenue: number }[] = [];
  merchant: any;
  totalProductSold: number = 0;
  totalRevenue: number = 0;
  selectedStatus: string = 'Sales';
  public chartSeries: ApexAxisChartSeries = [];
  public chartOptions: ApexChart = {
    type: 'bar',
    height: 350,
    // This can be dynamically adjusted if needed
  };
  public chartXaxis: ApexXAxis = {
    categories: ['Revenue in $'],
    labels: {
      style: {
        colors: ['#FFFFFF']
      }
    }
  };
  public chartColors: string[] = []; // A



  constructor(private route: ActivatedRoute, private merchantService: MerchantService, private productService: ProductService, private receiptService: ReceiptService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const merchantId = params['merchantId'];
      console.log('Retrieved merchant ID:', merchantId);

      if (merchantId) {
        this.merchantService.getMerchantByMerchantId(merchantId).subscribe({
          next: (data: any) => {
            this.merchant = data;
          },
          error: (error: any) => {
            console.error('Error fetching merchant:', error);
          }
        });
      } else {
        console.error('No email found in session storage');
      }
      if (merchantId) {
        this.productService.getProductsByMerchantId(merchantId).subscribe(products => {
          // Initialize total variables
          let productPromises = [];

          // Step 2: Loop through each product
          for (const product of products) {
            // Step 2a: Fetch all receipts for the current product
            const receiptPromise = this.receiptService.getReceiptsByProductId(product.productId).toPromise();

            // Step 2b: Push the promise to the array
            productPromises.push(receiptPromise);

            // Step 2c: Initialize product stats object
            const productStat = {
              productId: product.productId,
              name: product.productName,
              productSold: 0,
              revenue: 0
            };

            // Step 2d: Add the product stats object to the array
            this.productStats.push(productStat);
          }

          // Step 3: Handle all promises after all products are processed
          Promise.all(productPromises).then(receiptsArray => {
            // Step 3a: Calculate product sold and revenue for each product
            receiptsArray.forEach((receipts, index) => {
              const productSold: number = receipts.length;
              const productRevenue: number = receipts.reduce((total: number, receipt: any) => total + (receipt.price ?? 0), 0);


              // Step 3b: Update product stats
              this.productStats[index].productSold = productSold;
              this.productStats[index].revenue = productRevenue;

              // Step 3c: Update total variables
              this.totalProductSold += productSold;
              this.totalRevenue += productRevenue;
              this.updateChartSalesData();
            });
          });
        });
      }
    });
  }

  private updateChartSalesData(): void {
    this.chartSeries = [];
    this.chartColors = [];

    this.productStats.forEach((product, index) => {
      const randomColor = this.getRandomColor();
      this.chartColors.push(randomColor);

      this.chartSeries.push({
        name: product.name,
        data: [product.revenue],

      });
    });

  }

  private updateChartPurchasingPowerData(): void {
    this.chartSeries = [];
    this.chartColors = [];

    this.productStats.forEach((product, index) => {
      const randomColor = this.getRandomColor();
      this.chartColors.push(randomColor);

      this.chartSeries.push({
        name: product.name,
        data: [product.productSold],

      });
    });

  }

  private getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }





  public chartYaxis: ApexYAxis = {
    labels: {
      style: {
        colors: ['#FFFFFF'] // Set your desired color for Y-axis labels
      }
    }
  };
  public chartTitle: ApexTitleSubtitle = {
    text: 'Analytics Report',
    style: {
      color: '#FFFFFF' // Set your desired color here
    }
  };

  updateStatus(newStatus: string): void {
    this.selectedStatus = newStatus;

    if (newStatus === 'Sales') {
      this.updateChartSalesData();
      this.chartXaxis.categories = ['Revenue']; // Update x-axis for Sales
    } else if (newStatus === 'Purchasing Power') {
      this.updateChartPurchasingPowerData();
      this.chartXaxis.categories = ['Purchasing Power']; // Update x-axis for Purchasing Power
    }
  }
}


