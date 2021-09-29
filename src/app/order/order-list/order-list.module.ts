import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { OrderListRoutingModule } from './order-list-routing.module';
import { OrderListHomeComponent } from './order-list-home/order-list-home.component';
import { OrderUpdateComponent } from './order-update/order-update.component';
import {NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { NgSelectModule } from '@ng-select/ng-select';
import { PrintOrderComponent } from './print-order/print-order.component';

const materialModules = [
  MatButtonModule,
  MatIconModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
];

@NgModule({
  declarations: [OrderListHomeComponent, OrderUpdateComponent, PrintOrderComponent],
  imports: [
    CommonModule,
    OrderListRoutingModule,
    SharedModule,
    materialModules,
    NgbDatepickerModule,
    SnotifyModule,
    NgSelectModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers: [{ provide: 'SnotifyToastConfig', useValue: ToastDefaults }, SnotifyService]
})
export class OrderListModule { }
