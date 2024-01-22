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
    public fireService:AuthfireserviceService) {
      this.loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
      })
    }

  toInicio(){
    this.router.navigate(['/trips'])
  }
  
  async login() {
    try {
      // Verificar que se hayan proporcionado credenciales
      if (!this.emailValue || !this.passwordValue) {
        console.log("Por favor, ingrese correo electrónico y contraseña.");
        return;
      }
  
      await this.fireService.login(this.emailValue, this.passwordValue);
      const user = await this.fireService.getCurrentUser();
  
      if (user) {
        const userType = await this.fireService.getUserType(user.uid);
  
        if (userType === 'pasajero') {
          this.router.navigate(['/trips']);
        } else if (userType === 'conductor') {
          this.router.navigate(['/trips/driverhome']);
          console.log(userType);
        } else {
          console.error("Tipo de usuario desconocido o no autenticado correctamente.");
          // Redirigir a una página predeterminada en caso de tipo de usuario desconocido.
          this.router.navigate(['/login']);
        }
      }
    } catch (error) {
      console.log(error);
  
      // Manejar el error de inicio de sesión, por ejemplo, mostrar un mensaje al usuario.
    }
  }
  





  ngOnInit() {
  }

}
