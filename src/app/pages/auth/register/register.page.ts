import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthfireserviceService } from 'src/app/services/firebase/authfireservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  email!: string;
  password! : string;
  userType! : string;
  nombreCompleto!: string;
  telefono!: string;




  alertButtons = ['Action'];
  constructor(
    private authservice : AuthfireserviceService,
    private alertController: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
  }

  register(){
    this.authservice.registerUser(this.email, this.password, this.userType, this.nombreCompleto, this.telefono)
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
