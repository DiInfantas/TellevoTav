import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Iviaje } from 'src/app/interfaces/iviaje'
import { CrudfirebaseService } from 'src/app/services/firebase/crudfirebase.service';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.page.html',
  styleUrls: ['./trips.page.scss'],
})
export class TripsPage implements OnInit {

  listaViajes!: Iviaje[];

  constructor(
    private fire:CrudfirebaseService,
    private router:Router
  ) { }

  ngOnInit() {
    this.listar();
    
  }

  listar(){
    this.fire.getCollection("Viajes").subscribe((aux) => {
      this.listaViajes = aux;
    })
  }


}
