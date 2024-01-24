import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Iconductor } from 'src/app/interfaces/iconductor';
import { Iviaje } from 'src/app/interfaces/iviaje';
import { CrudfirebaseService } from 'src/app/services/firebase/crudfirebase.service';

@Component({
  selector: 'app-driverdetail',
  templateUrl: './driverdetail.page.html',
  styleUrls: ['./driverdetail.page.scss'],
})
export class DriverdetailPage implements OnInit {
  viaje: Iviaje = {} as Iviaje;
  usuario: Iconductor | undefined;

  constructor(
    private fire: CrudfirebaseService,
    private router: Router,
    private activatedRoute: ActivatedRoute


  ) { }

  ngOnInit() {
    const viajeId = this.activatedRoute.snapshot.paramMap.get('id');
    
    console.log(viajeId);
  }

  ionViewWillEnter() {
    this.getViaje(); // Asegúrate de que no estás pasando ningún argumento aquí
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
  
  getViaje() {
    const viajeId = this.getId();
    this.fire.getViajeById(viajeId).subscribe((viaje) => {
      console.log(viaje);
      this.viaje = viaje as Iviaje || {} as Iviaje;
    });
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
}
