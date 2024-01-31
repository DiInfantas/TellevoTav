import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Iconductor } from 'src/app/interfaces/iconductor';
import { Iviaje } from 'src/app/interfaces/iviaje';
import { CrudfirebaseService } from 'src/app/services/firebase/crudfirebase.service';
import * as L from 'leaflet';
import { Isolicitud } from 'src/app/interfaces/isolicitud';

@Component({
  selector: 'app-driverdetail',
  templateUrl: './driverdetail.page.html',
  styleUrls: ['./driverdetail.page.scss'],
})
export class DriverdetailPage implements OnInit {
  ionViewDidEnter() {
    this.loadMap();
  }
  viaje: Iviaje = {} as Iviaje;
  usuario: Iconductor | undefined;
  solicitudes: Isolicitud[] = [];

  constructor(
    private fire: CrudfirebaseService,
    private router: Router,
    private activatedRoute: ActivatedRoute


  ) { }

  ngOnInit() {
    const viajeId = this.activatedRoute.snapshot.paramMap.get('id');
    this.getViaje(viajeId);
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

  getId() {
    let url = this.router.url;
    let aux = url.split("/", 4);
    let id = aux[3];
    return id;
  }

  getUsuario() {
    if (this.viaje && this.viaje.idconductor) {
      const usuarioId = this.viaje.idconductor;
      this.fire.getUsuarioById(usuarioId).subscribe((usuario) => {
        console.log(usuario, 'idusuario');
        this.usuario = usuario as Iconductor || {} as Iconductor;
      });
    } else {
      console.error("No se pudo obtener la información del viaje o del conductor");
    }
  }
  
  getViaje(viajeId: string | null) {
    if (viajeId) {
      this.fire.getViajeById(viajeId).subscribe((viaje) => {
        console.log(viaje);
        this.viaje = viaje as Iviaje || {} as Iviaje;

        // Obtener y mostrar el conductor del viaje
        this.getUsuario();
      });
    }
  }

  eliminar() {
    const viajeId = this.activatedRoute.snapshot.paramMap.get('id');
    if (viajeId) {
      this.fire.deleteDocument('Viajes', viajeId);
      console.log('Viaje eliminado correctamente');
      this.router.navigate(['/trips/driverhome']);
    }
  }

  editarViaje() {
    const viajeId = this.activatedRoute.snapshot.paramMap.get('id');
    if (viajeId) {
      this.router.navigate(['/trips/update', viajeId]);
    }
  }
  loadMap() {
    const map = L.map('map').setView([-33.5983603,-70.5834729], 17);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    L.marker([-33.5983603,-70.5834729]).addTo(map)
      .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
      .openPopup();
  }
}
