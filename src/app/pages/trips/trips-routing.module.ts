import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TripsPage } from './trips.page';

const routes: Routes = [
  {
    path: '',
    component: TripsPage
  },
  {
    path: 'add',
    loadChildren: () => import('./add/add.module').then( m => m.AddPageModule)
  },
  {
    path: 'detail',
    loadChildren: () => import('./detail/detail.module').then( m => m.DetailPageModule)
  },
  {
    path: 'update',
    loadChildren: () => import('./update/update.module').then( m => m.UpdatePageModule)
  },  {
    path: 'driverdetail',
    loadChildren: () => import('./driverdetail/driverdetail.module').then( m => m.DriverdetailPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TripsPageRoutingModule {}
