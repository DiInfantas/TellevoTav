import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Iviaje } from 'src/app/interfaces/iviaje';
import { CrudfirebaseService } from 'src/app/services/firebase/crudfirebase.service';
import { AuthfireserviceService } from 'src/app/services/firebase/authfireservice.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.page.html',
  styleUrls: ['./trips.page.scss'],
})
export class TripsPage implements OnInit {

  listaViajes!: Iviaje[];

  constructor(
    private fire: CrudfirebaseService,
    private router: Router,
    private authService: AuthfireserviceService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.listar();
  }

  redireccionarAdd(): void {
    // Redirecciona a la página 'add'
    this.router.navigate(['/add']);
  }

  listar() {
    this.fire.getCollection("Viajes").subscribe((aux) => {
      this.listaViajes = aux;
    })
  }

  seeDetail(viajeId: string | undefined) {
    if (viajeId) {
      // Navegar a la página de detalles con el ID del viaje
      this.router.navigate(['/trips/detail', viajeId]);
    }
  }

  async cerrarSesion() {
    console.log('Cerrando sesión...');
    // Llama a la función de tu servicio de autenticación para cerrar sesión
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

