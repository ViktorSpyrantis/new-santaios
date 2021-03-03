import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { Dashboard } from '../pages/dashboard/dashboard';
import { CategoryPage } from '../pages/category-page/category-page'
import { ProductPage } from 'src/pages/product-page/product-page';


const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    redirectTo: 'dashboard'
  },
  {
    path: 'dashboard',
    component: Dashboard,
  },
  {
    path: 'category',
    component: CategoryPage,
  },
  {
    path: 'product',
    component: ProductPage
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
