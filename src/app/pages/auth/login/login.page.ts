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
      await this.fireService.login(this.emailValue,this.passwordValue);
      
    } catch (error) {
      console.log(error)
    }
  }

  ngOnInit() {
  }

}
