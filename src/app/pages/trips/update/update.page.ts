import { Component, OnInit } from '@angular/core';
import { CrudfirebaseService } from'src/app/services/firebase/crudfirebase.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {
  tripForm!: FormGroup;
  viajeId: string | null = null;
  constructor(
    private fb: FormBuilder,
    private crudService: CrudfirebaseService,
    private route: ActivatedRoute,
    private navCtrl: NavController
  ) {
    this.tripForm = this.fb.group({
      capacidad: [null, Validators.required],
      destino: [null, Validators.required],
      horasalida: ['', Validators.required],
      lugarinicio: ['', Validators.required],
      precio: ['', Validators.required],
    })
   }

  ngOnInit() {
    this.viajeId= this.route.snapshot.paramMap.get('id');
    this.cargarDatosViaje();
  }

  cargarDatosViaje() {
    if (this.viajeId) {
      this.crudService.getViajeById(this.viajeId).subscribe((viaje) => {
        // Cargar los datos del viaje en el formulario
        if (viaje) {
          // Cargar los datos del viaje en el formulario
          this.tripForm.patchValue({
            capacidad: viaje.capacidad,
            destino: viaje.destino,
            horasalida: viaje.horasalida,
            lugarinicio: viaje.lugarinicio,
            precio: viaje.precio,
            // Patch otros campos según sea necesario
          });
        } else {
          console.error('No se encontró el viaje con ID:', this.viajeId);
        }
      });
    }
  }

  guardarCambios() {
    if (this.tripForm.valid && this.viajeId) {
      // Guardar los cambios en Firebase
      this.crudService.updateDocument('Viajes', this.tripForm.value, this.viajeId)
        .then(() => {
          console.log('Cambios guardados exitosamente');
          // Navegar de vuelta a la página de detalles
          this.navCtrl.navigateBack(['/trips/driverdetail', this.viajeId]);
        })
        .catch((error) => {
          console.error('Error al guardar cambios:', error);
        });
    }
  }


}
