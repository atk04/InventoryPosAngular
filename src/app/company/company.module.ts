import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';
import { CompanyHomeComponent } from '../company/company-home/company-home.component';
import { SharedModule } from '../theme/shared/shared.module';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { CompanyUpdateComponent } from '../company/company-update/company-update.component';


const materialModules = [
  MatButtonModule,
  MatIconModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
];

@NgModule({
  declarations: [CompanyHomeComponent, CompanyUpdateComponent],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    SharedModule,
    materialModules,
    SnotifyModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers: [{ provide: 'SnotifyToastConfig', useValue: ToastDefaults }, SnotifyService]
})
export class CompanyModule { }
