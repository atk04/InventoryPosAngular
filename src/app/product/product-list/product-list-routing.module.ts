import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListHomeComponent } from './product-list-home/product-list-home.component';

const routes: Routes = [
  {
    path:'',component:ProductListHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductListRoutingModule { }
