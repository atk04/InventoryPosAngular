import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryHomeComponent } from './category-home/category-home.component';
import { SharedModule } from '../theme/shared/shared.module';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';



const materialModules = [
  MatButtonModule,
  MatIconModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule
];


@NgModule({
  declarations: [CategoryHomeComponent],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    SharedModule,
    materialModules
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class CategoryModule { }
