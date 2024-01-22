import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthfireserviceService } from 'src/app/services/firebase/authfireservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  emailValue!: string;
  passwordValue!: string;
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    public fireService: AuthfireserviceService,
    private alertController: AlertController
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {}

  toInicio() {
    this.router.navigate(['/trips']);
  }

  async login() {
    try {
      // Verificar que se hayan proporcionado credenciales
      if (!this.emailValue || !this.passwordValue) {
        this.mostrarAlerta('Por favor, ingrese correo electrónico y contraseña.');
        return;
      }

      await this.fireService.login(this.emailValue, this.passwordValue);
      const user = await this.fireService.getCurrentUser();

      if (user) {
        const userType = await this.fireService.getUserType(user.uid);

        if (userType === 'pasajero') {
          this.router.navigate(['/trips']);
          this.mostrarAlerta('Inicio de sesión exitoso como pasajero.');
        } else if (userType === 'conductor') {
          this.router.navigate(['/trips/driverhome']);
          console.log(userType);
          this.mostrarAlerta('Inicio de sesión exitoso como conductor.');
        } else {
          console.error('Tipo de usuario desconocido o no autenticado correctamente.');
          // Resto del código...
        }
      }
    } catch (error) {
      console.log(error);
      this.mostrarAlerta(
        'Error al iniciar sesión. Verifica tus credenciales y vuelve a intentarlo.'
      );
    }
  }

  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: mensaje,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
