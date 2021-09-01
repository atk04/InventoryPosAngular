import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddProductRoutingModule } from './add-product-routing.module';
import { AddProductHomeComponent } from './add-product-home/add-product-home.component';
import { SharedModule } from '../../theme/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';




const materialModules = [
  MatButtonModule,
  MatIconModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
];

@NgModule({
  declarations: [AddProductHomeComponent],
  imports: [
    CommonModule,
    AddProductRoutingModule,
    SharedModule,
    materialModules,
    SnotifyModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers: [{ provide: 'SnotifyToastConfig', useValue: ToastDefaults }, SnotifyService]
})
export class AddProductModule { }
