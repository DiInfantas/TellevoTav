import { Component, OnInit } from '@angular/core';
import { AuthfireserviceService } from 'src/app/services/firebase/authfireservice.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-driverdetail',
  templateUrl: './driverdetail.page.html',
  styleUrls: ['./driverdetail.page.scss'],
})
export class DriverdetailPage implements OnInit {

  constructor(
    private authService: AuthfireserviceService,
    private router : Router
  ) {
  }
  ngOnInit() {
  }
  cerrarSesion() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

