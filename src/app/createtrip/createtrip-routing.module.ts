import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatetripPage } from './createtrip.page';

const routes: Routes = [
  {
    path: '',
    component: CreatetripPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreatetripPageRoutingModule {}
