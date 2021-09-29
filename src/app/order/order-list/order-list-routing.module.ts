import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderListHomeComponent } from './order-list-home/order-list-home.component';
import { OrderUpdateComponent } from './order-update/order-update.component';
import { PrintOrderComponent } from './print-order/print-order.component';

const routes: Routes = [
  {
    path:'',component:OrderListHomeComponent
  },
  {
    path:':id',component:OrderUpdateComponent
  },
  {
    path:'print/:id',component:PrintOrderComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderListRoutingModule { }
