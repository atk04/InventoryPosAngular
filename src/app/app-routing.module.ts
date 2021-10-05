import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AdminComponent } from './theme/layout/admin/admin.component';
import {AuthComponent} from './theme/layout/auth/auth.component';

const routes: Routes = [

  {
    path: 'admin',
    component: AdminComponent,

    children: [
      {
        path: '',
        redirectTo: 'sample-page',
        pathMatch: 'full'
      },
      {
        path: 'sample-page',
        canActivate:[AuthGuardService],
        loadChildren: () => import('./demo/pages/sample-page/sample-page.module').then(module => module.SamplePageModule)
      },
      {
        path:'company-page',canActivate:[AuthGuardService],loadChildren:()=>import('./company/company.module').then(module=>module.CompanyModule)
      },
      {
        path:'category-page',canActivate:[AuthGuardService],loadChildren:()=>import('./category/category.module').then(module=>module.CategoryModule)
      },
      {
        path:'add-product-page',canActivate:[AuthGuardService],loadChildren:()=>import('./product/add-product/add-product.module').then(module=>module.AddProductModule)
      },
      {
        path:'product-list-page',canActivate:[AuthGuardService],loadChildren:()=>import('./product/product-list/product-list.module').then(module=>module.ProductListModule)
      },
      {
        path:'create-order-page',canActivate:[AuthGuardService],loadChildren:()=>import('./order/create-order/create-order.module').then(module=>module.CreateOrderModule)
      },
      {
        path:'order-list-page',canActivate:[AuthGuardService],loadChildren:()=>import('./order/order-list/order-list.module').then(module=>module.OrderListModule)
      }
    ]
  },
  {
path:'',
component:LandingPageComponent
  },
  // {
  //   path: '',
  //   component: AuthComponent,
  //   children: []
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
