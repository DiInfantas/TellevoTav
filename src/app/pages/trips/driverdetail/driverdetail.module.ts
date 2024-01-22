import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DriverdetailPageRoutingModule } from './driverdetail-routing.module';

import { DriverdetailPage } from './driverdetail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DriverdetailPageRoutingModule
  ],
  declarations: [DriverdetailPage]
})
export class DriverdetailPageModule {}
