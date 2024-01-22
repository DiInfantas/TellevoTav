import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Iconductor } from 'src/app/interfaces/iconductor';
import { Iviaje } from 'src/app/interfaces/iviaje';
import { CrudfirebaseService } from 'src/app/services/firebase/crudfirebase.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

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
    this.getViaje(this.getId());
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


}
