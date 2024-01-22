import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthfireserviceService } from 'src/app/services/firebase/authfireservice.service';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Iviaje } from 'src/app/interfaces/iviaje';
import { CrudfirebaseService } from 'src/app/services/firebase/crudfirebase.service';

@Component({
  selector: 'app-driverhome',
  templateUrl: './driverhome.page.html',
  styleUrls: ['./driverhome.page.scss'],
})
export class DriverhomePage implements OnInit {
  currentTrip: Iviaje | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthfireserviceService,
    private router: Router,
    private alertController: AlertController,
    private fire : CrudfirebaseService,
  ) { }

  ngOnInit() {
    
    this.activatedRoute.params.subscribe((params) => {
      const tripId = params['id'];

      if (tripId) {
        
        this.fire.getTripById('Viajes', tripId).subscribe((trip) => {
          this.currentTrip = trip as Iviaje;
        });
      }
    });
  }

  redireccionarAAdd(){
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
