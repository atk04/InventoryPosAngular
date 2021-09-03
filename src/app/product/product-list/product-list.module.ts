import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductListRoutingModule } from './product-list-routing.module';
import { ProductListHomeComponent } from './product-list-home/product-list-home.component';
import { SharedModule } from '../../theme/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { ProductUpdateComponent } from './product-update/product-update.component';
import { ProductViewComponent } from './product-view/product-view.component';


const materialModules = [
  MatButtonModule,
  MatIconModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
];

@NgModule({
  declarations: [ProductListHomeComponent, ProductUpdateComponent, ProductViewComponent],
  imports: [
    CommonModule,
    ProductListRoutingModule,
    materialModules,
    SharedModule,
    SnotifyModule
  ],
  providers: [{ provide: 'SnotifyToastConfig', useValue: ToastDefaults }, SnotifyService]
})
export class ProductListModule { }
