import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { OrderListRoutingModule } from './order-list-routing.module';
import { OrderListHomeComponent } from './order-list-home/order-list-home.component';

const materialModules = [
  MatButtonModule,
  MatIconModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
];

@NgModule({
  declarations: [OrderListHomeComponent],
  imports: [
    CommonModule,
    OrderListRoutingModule,
    SharedModule,
    materialModules
  ]
})
export class OrderListModule { }
