import { Component } from '@angular/core';
import { ApirandomuserService } from 'src/app/services/api/apirandomuser.service';


@Component({

  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  user: any;

  alertButtons = ['Action'];
  constructor(private userService: ApirandomuserService) {}
  ngOnInit(): void {
    this.login();
  }
  login(): void {
    this.userService.getRandomUser().subscribe(
      (response: any) => { // Especifica el tipo 'any' para 'response'
        // Manejar la respuesta exitosa del servidor aquí
        this.user = response.results[0];
        console.log('Login exitoso', this.user);
      },
      (error: any) => { // Especifica el tipo 'any' para 'error'
        // Manejar errores de la solicitud aquí
        console.error('Error en el login', error);
      }
    );
  }
}

