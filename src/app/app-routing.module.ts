import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./core/components/home/home.module').then(m => m.HomeModule)
  },
  {
    path: '',
    loadChildren: () => import('./feature/feature.module').then(m => m.FeatureModule)
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
