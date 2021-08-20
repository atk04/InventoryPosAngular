import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddProductHomeComponent } from './add-product-home/add-product-home.component';

const routes: Routes = [
  {
    path:'',component:AddProductHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddProductRoutingModule { }
