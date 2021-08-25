import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListHomeComponent } from './product-list-home/product-list-home.component';
import { ProductUpdateComponent } from './product-update/product-update.component';
import { ProductViewComponent } from './product-view/product-view.component';

const routes: Routes = [
  {
    path:'',component:ProductListHomeComponent
  },
  {
    path:':id/viewProduct',component:ProductViewComponent
  },
  {
    path:':id',component:ProductUpdateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductListRoutingModule { }
