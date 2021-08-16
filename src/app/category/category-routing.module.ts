import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryHomeComponent } from './category-home/category-home.component';
import { CategoryUpdateComponent } from './category-update/category-update.component';

const routes: Routes = [
  {
    path:'',component:CategoryHomeComponent
  },{
    path:':id',component:CategoryUpdateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
