import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyHomeComponent } from './company-home/company-home.component';
import { CompanyUpdateComponent } from './company-update/company-update.component';

const routes: Routes = [
  {
    path:'',component:CompanyHomeComponent
  },{
    path:':id',component:CompanyUpdateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
