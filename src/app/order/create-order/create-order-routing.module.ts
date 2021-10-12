import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateOrderHomeComponent } from './create-order-home/create-order-home.component';
import { UpdateStockComponent } from './update-stock/update-stock.component';



const routes: Routes = [
  {
    path:'',component:CreateOrderHomeComponent
  },{
    path:'updateProductStock/:id',component:UpdateStockComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateOrderRoutingModule { }
