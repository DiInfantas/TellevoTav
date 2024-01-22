import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthfireserviceService } from 'src/app/services/firebase/authfireservice.service';

@Component({
  selector: 'app-driverhome',
  templateUrl: './driverhome.page.html',
  styleUrls: ['./driverhome.page.scss'],
})
export class DriverhomePage implements OnInit {

  constructor(
    private authService: AuthfireserviceService,
    private router : Router
  ) { }

  ngOnInit() {
  }
  cerrarSesion() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
