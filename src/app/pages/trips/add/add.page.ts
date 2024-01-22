import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudfirebaseService } from 'src/app/services/firebase/crudfirebase.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  tripForm!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private fire: CrudfirebaseService,
  ) {
    this.tripForm = this.fb.group({
      capacidad: [null, Validators.required],
      destino: ['', Validators.required],
      horasalida: [null, Validators.required],
      lugarinicio: ['', Validators.required],
      precio: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.tripForm.valid) {
      // Agrega el ID del conductor al formulario
      this.tripForm.patchValue({ idconductor: 'ID_DEL_CONDUCTOR_ACTUAL' });

      // Guarda el nuevo viaje en Firebase
      this.fire.createDocument('Viajes', this.tripForm.value);

      // Redirige a la página de viajes después de agregar el viaje
      this.router.navigate(['']);
    }
  }

  goToTrips() {
    this.router.navigate(['/trips']);
  }

}


// create-trip.component.ts






