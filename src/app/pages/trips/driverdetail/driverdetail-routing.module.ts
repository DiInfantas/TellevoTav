import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DriverdetailPage } from './driverdetail.page';

const routes: Routes = [
  {
    path: '',
    component: DriverdetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DriverdetailPageRoutingModule {}
