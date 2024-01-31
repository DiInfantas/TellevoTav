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
  idconductor: string | undefined;
  viajes: Iviaje[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthfireserviceService,
    private router: Router,
    private alertController: AlertController,
    private fire : CrudfirebaseService,
  ) { }

  ngOnInit() {
      
    this.authService.getUserId().subscribe((conductorId) => {
      this.idconductor = conductorId;
      console.log(this.idconductor);
      this.fire.getViajesByConductorId(conductorId).subscribe((viajes) => {
        console.log('Viajes obtenidos:', viajes);
        this.viajes = viajes;
      });
    });

    this.activatedRoute.params.subscribe((params) => {
      const tripId = params['id'];
    
      if (tripId && this.idconductor) {
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


  seeDetail(viajeId: string | undefined) {
    if (viajeId) {
      this.router.navigate(['/trips/driverdetail/', viajeId]);
    } else {
      console.error('ID del viaje no definido.');
      console.log (viajeId);
    }
  }
  
}
