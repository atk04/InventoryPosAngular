import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateOrderHomeComponent } from './create-order-home/create-order-home.component';


const routes: Routes = [
  {
    path:'',component:CreateOrderHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateOrderRoutingModule { }
