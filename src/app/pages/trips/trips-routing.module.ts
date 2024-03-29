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
    path: 'detail/:id',
    loadChildren: () => import('./detail/detail.module').then( m => m.DetailPageModule)
  },
  {
    path: 'update/:id',
    loadChildren: () => import('./update/update.module').then( m => m.UpdatePageModule)
  },

  {
    path: 'driverdetail/:id',
    loadChildren: () => import('./driverdetail/driverdetail.module').then( m => m.DriverdetailPageModule)
  },
  {
    path: 'driverhome',
    loadChildren: () => import('./driverhome/driverhome.module').then( m => m.DriverhomePageModule)
  },  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  }




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TripsPageRoutingModule {}
