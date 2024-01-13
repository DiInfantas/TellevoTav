import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-passrecovery',
  templateUrl: './passrecovery.page.html',
  styleUrls: ['./passrecovery.page.scss'],
})
export class PassrecoveryPage implements OnInit {

  constructor(
    private alertController: AlertController,
    private router: Router
    ) { }

  ngOnInit() {
  }



  async alertaRecovery() {
    const alerta = await this.alertController.create({
      header: 'Se le enviará un correo para recuperar su contraseña',
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
