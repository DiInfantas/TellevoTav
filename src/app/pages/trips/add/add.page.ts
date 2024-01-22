import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudfirebaseService } from 'src/app/services/firebase/crudfirebase.service';
import { AuthfireserviceService } from 'src/app/services/firebase/authfireservice.service';
import { USE_EMULATOR } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  tripForm!: FormGroup;
  userId!: string;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private auth: AuthfireserviceService,
    private fire: CrudfirebaseService,
  ) {
    this.tripForm = this.fb.group({
      capacidad: [null, Validators.required],
      destino: ['', Validators.required],
      horasalida: [null, Validators.required],
      lugarinicio: ['', Validators.required],
      precio: ['', Validators.required],
      idconductor: [''],
    });
  }

  ngOnInit() {
    this.auth.getUserId().subscribe((id) => {
      this.userId = id;
    });
  }

  onSubmit() {
    if (this.tripForm.valid) {
      // Obtiene el ID del usuario actual
      this.auth.getUserId().subscribe((userId) => {
        if (userId) {
          // Agrega el ID del conductor al formulario
          this.tripForm.patchValue({ idconductor: userId });

          // Guarda el nuevo viaje en Firebase
          this.fire.createDocument('Viajes', this.tripForm.value).then((docRef) => {
            // Obtén el ID del viaje recién creado
            const tripId = docRef.id;

            // Redirige a la página de driverhome con el ID del viaje como parámetro
            this.router.navigate(['/driverhome', tripId]);
          });
        }
      });
    }
  }

  goToTrips() {
    this.router.navigate(['/trips']);
  }

}


// create-trip.component.ts






