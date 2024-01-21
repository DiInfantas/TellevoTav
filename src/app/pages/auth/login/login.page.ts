import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
      await this.fireService.login(this.emailValue, this.passwordValue);
      const user = await this.fireService.getCurrentUser();

      if (user) {
        const userType = await this.fireService.getUserType(user.uid);

        if (userType === 'conductor') {
          this.router.navigate(['/trips']);
          console.log(userType);
        } else if (userType === 'pasajero') {
          this.router.navigate(['/register']);
        } else if (userType === '') {
          console.log("no existe tipo de usuario");
            
        } else {
          console.error("Tipo de usuario desconocido o no autenticado correctamente.");
        }
      }
    } catch (error) {
      console.log(error);
      console.log("ÄAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
    }
  }





  ngOnInit() {
  }

}
