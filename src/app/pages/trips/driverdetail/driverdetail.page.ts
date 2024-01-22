import { Component, OnInit } from '@angular/core';
import { AuthfireserviceService } from 'src/app/services/firebase/authfireservice.service';

@Component({
  selector: 'app-driverdetail',
  templateUrl: './driverdetail.page.html',
  styleUrls: ['./driverdetail.page.scss'],
})
export class DriverdetailPage implements OnInit {

  constructor(
    private authService: AuthfireserviceService
  ) {
  }
  ngOnInit() {
  }

  cerrarSesion() {
    // Llama a la función de tu servicio de autenticación para cerrar sesión
    this.authService.logout();
  }
}

