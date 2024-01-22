import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthfireserviceService } from 'src/app/services/firebase/authfireservice.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-driverhome',
  templateUrl: './driverhome.page.html',
  styleUrls: ['./driverhome.page.scss'],
})
export class DriverhomePage implements OnInit {

  constructor(
    private authService: AuthfireserviceService,
    private router: Router,
    private alertController: AlertController
  ) { }

  ngOnInit() {
  }

  redireccionarAAdd(): void {
    // Redirecciona a la página 'add'
    this.router.navigate(['/add']);
  }

  async cerrarSesion() {
    await this.authService.logout();

    // Alerta indicando que se cerró sesión
    const alert = await this.alertController.create({
      header: 'Sesión cerrada',
      message: 'Has cerrado sesión exitosamente.',
      buttons: ['OK']
    });

    await alert.present();

    // Redireccionar a la página de inicio de sesión
    this.router.navigate(['/login']);
  }
}
