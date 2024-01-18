import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  alertButtons = ['Action'];
  constructor(
    private alertController: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
  }

  async alertaRegistro() {
    const alerta = await this.alertController.create({
      header: 'Usuario creado correctamente',
      subHeader: 'Se le redireccionará al login',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            this.router.navigate(['/login']);
          },
        },
      ],
    });

    await alerta.present();
  }
}
