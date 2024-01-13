import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TripdetailPage } from './tripdetail.page';

const routes: Routes = [
  {
    path: '',
    component: TripdetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TripdetailPageRoutingModule {}
