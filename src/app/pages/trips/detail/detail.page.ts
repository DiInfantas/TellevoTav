// detail.page.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Iconductor } from 'src/app/interfaces/iconductor';
import { Iviaje } from 'src/app/interfaces/iviaje';
import { Isolicitud } from 'src/app/interfaces/isolicitud';
import { CrudfirebaseService } from 'src/app/services/firebase/crudfirebase.service';
import { AlertController } from '@ionic/angular';
import { AuthfireserviceService } from 'src/app/services/firebase/authfireservice.service';
import * as L from 'leaflet'; 




@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  addressToSearch: string = "Nombre de la dirección";
  viaje: Iviaje = {} as Iviaje;
  usuario: Iconductor | undefined;
  solicitudes: Isolicitud[] = [];

  constructor(
    private fire: CrudfirebaseService,
    private authService: AuthfireserviceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    const viajeId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(viajeId);
    this.getSolicitudes(viajeId);
  }
  async getSolicitudes(viajeId: string | null) {
    if (viajeId) {
      this.fire.getSolicitudesByViajeId(viajeId).subscribe((solicitudes) => {
        this.solicitudes = solicitudes;
      });
    } else {
      console.error('ID del viaje no definido.');
    }
  }

  ionViewDidEnter() {
    this.loadMap();
  }

  

  ionViewWillEnter() {
    this.getViaje(this.getId());
  }

  getId() {
    let url = this.router.url;
    let aux = url.split("/", 4);
    let id = aux[3];
    return id;
  }

  async solicitarAsiento() {
  const alert = await this.alertController.create({
    header: 'Confirmar',
    message: '¿Estás seguro de que deseas solicitar un asiento?',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          console.log('Solicitud de asiento cancelada');
        },
      },
      {
        text: 'Solicitar',
        handler: () => {
          console.log('Solicitud de asiento realizada');
          // Cambia la siguiente línea para utilizar la función correcta
          this.fire.createSolicitud('Solicitudes', { idviaje: this.viaje.id || '', idpasajero: 'ID_DEL_PASAJERO', estado: 'pendiente' });
        },
      },
    ],
  });

  await alert.present();
}


  getUsuario() {
    if (this.viaje && this.viaje.idconductor) {
      const usuarioId = this.viaje.idconductor;
      console.log('ID del Conductor:', usuarioId);

      this.fire.getUsuarioById(usuarioId).subscribe({
        next: (usuario) => {
          if (usuario) {
            console.log('Datos del usuario:', usuario);
            this.usuario = usuario as Iconductor;
          } else {
            console.error('No se encontraron datos para el usuario con ID:', usuarioId);
          }
        },
        error: (error) => {
          console.error('Error al obtener datos del usuario:', error);
        }
      });
    } else {
      console.error("No se pudo obtener la información del viaje o del conductor");
    }
  }

  

  getViaje(viajeId: string) {
    this.fire.getViajeById(viajeId).subscribe((viaje) => {
      this.viaje = viaje as Iviaje;
      this.getUsuario(); // Llamar a getUsuario después de obtener el viaje
    });
  }

  eliminar() {
    const viajeId = this.activatedRoute.snapshot.paramMap.get('id');
    if (viajeId) {
      this.fire.deleteDocument('Viajes', viajeId);
      this.router.navigate(['/trips']);
    }
  }

  
  
  loadMap() {
    const map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    L.marker([51.505, -0.09]).addTo(map)
      .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
      .openPopup();
  }
}


