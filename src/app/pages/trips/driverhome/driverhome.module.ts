import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DriverhomePageRoutingModule } from './driverhome-routing.module';

import { DriverhomePage } from './driverhome.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DriverhomePageRoutingModule
  ],
  declarations: [DriverhomePage]
})
export class DriverhomePageModule {}
