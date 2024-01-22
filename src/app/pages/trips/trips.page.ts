import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Iviaje } from 'src/app/interfaces/iviaje'
import { CrudfirebaseService } from 'src/app/services/firebase/crudfirebase.service';
import { AuthfireserviceService } from 'src/app/services/firebase/authfireservice.service';


@Component({
  selector: 'app-trips',
  templateUrl: './trips.page.html',
  styleUrls: ['./trips.page.scss'],
})
export class TripsPage implements OnInit {

  listaViajes!: Iviaje[];

  constructor(
    private fire:CrudfirebaseService,
    private router:Router,
    private authService: AuthfireserviceService
  ) { }

  ngOnInit() {
    this.listar();
    
  }
  redireccionarAdd(): void {
    // Redirecciona a la página 'add'
    this.router.navigate(['/add']);
  }

  listar(){
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

  cerrarSesion() {
    // Llama a la función de tu servicio de autenticación para cerrar sesión
    this.authService.logout();
    this.router.navigate(['/login']);
  }


}
