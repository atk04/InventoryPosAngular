import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import {AuthComponent} from './theme/layout/auth/auth.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'sample-page',
        pathMatch: 'full'
      },
      {
        path: 'sample-page',
        loadChildren: () => import('./demo/pages/sample-page/sample-page.module').then(module => module.SamplePageModule)
      },
      {
        path:'category-page',loadChildren:()=>import('./category/category.module').then(module=>module.CategoryModule)
      },
      {
        path:'add-product-page',loadChildren:()=>import('./product/add-product/add-product.module').then(module=>module.AddProductModule)
      },
      {
        path:'product-list-page',loadChildren:()=>import('./product/product-list/product-list.module').then(module=>module.ProductListModule)
      },
      {
        path:'create-order-page',loadChildren:()=>import('./create-order/create-order.module').then(module=>module.CreateOrderModule)
      }
    ]
  },
  {
    path: '',
    component: AuthComponent,
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
