import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'user', // user
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./access/access.module').then(m => m.AccessModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureRoutingModule { }

