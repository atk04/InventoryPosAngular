import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryHomeComponent } from './category-home/category-home.component';


@NgModule({
  declarations: [CategoryHomeComponent],
  imports: [
    CommonModule,
    CategoryRoutingModule
  ]
})
export class CategoryModule { }
