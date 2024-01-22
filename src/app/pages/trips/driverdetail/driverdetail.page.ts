import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-driverdetail',
  templateUrl: './driverdetail.page.html',
  styleUrls: ['./driverdetail.page.scss'],
})
export class DriverdetailPage implements OnInit {
  presentingElement: any;
  canDismiss: boolean = true;
  form: FormGroup;
  message: string = '';

  constructor(private modalController: ModalController, private fb: FormBuilder) {
    this.form = this.fb.group({
      inicio: ['', Validators.required],
      destino: ['', Validators.required],
      capacidad: ['', Validators.required],
      precio: ['', Validators.required],
      name: ['', Validators.required],
      fkuser: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.presentingElement = document.querySelector('.ion-page');
  }

  async cancel() {
    await this.modalController.dismiss(null, 'cancel');
  }

  async confirm() {
    if (this.form.valid) {
      // Puedes acceder a los valores del formulario usando this.form.value
      await this.modalController.dismiss(this.form.value, 'confirm');
    } else {
      // Realizar alguna acción si el formulario no es válido
      console.log('Formulario no válido');
    }
  }

  async onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail && ev.detail.role === 'confirm') {
      this.message = `, ${ev.detail.data}!`;
    }
  }
}

