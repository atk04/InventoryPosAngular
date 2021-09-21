import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderListHomeComponent } from './order-list-home/order-list-home.component';

const routes: Routes = [
  {
    path:'',component:OrderListHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderListRoutingModule { }
