import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthfireserviceService } from 'src/app/services/firebase/authfireservice.service';
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  emailValue!: string;
  passwordValue!: string;
  loginForm: FormGroup;
  profiles: any[] = []; // Declaración de la propiedad profiles
  isLoading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    public fireService: AuthfireserviceService,
    private alertController: AlertController,
    private http: HttpClient,
    private firestore: AngularFirestore
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
  async loadRandomProfiles() {
    this.isLoading = true;

    try {
      const { results } = await this.http.get<any>('https://randomuser.me/api/?results=5').toPromise();

      // Guardar perfiles en Firebase
      await this.saveProfilesToFirebase(results);

      // Mostrar alerta con los datos específicos
      this.presentAlert(results);

    } catch (error) {
      console.error('Error al cargar y guardar perfiles:', error);

    } finally {
      this.isLoading = false;
    }
  }
  async saveProfilesToFirebase(profiles: any[]) {
    // Obtener una referencia a la colección "perfiles" en Firebase
    const profilesCollection = this.firestore.collection('perfiles');

    // Iterar sobre los perfiles y guardarlos en Firebase
    for (const profile of profiles) {
      await profilesCollection.add({
        nombre: `${profile.name.first} ${profile.name.last}`,
        email: profile.email,
        contraseña: profile.login.password,
        edad: profile.dob.age,
        género: profile.gender
      });
    }
  }

  async presentAlert(profiles: any[]) {
    const alert = await this.alertController.create({
      header: 'Perfiles Creados',
      subHeader: '',
      message: '',
      buttons: ['OK'],
    });

    await alert.present();
  }
  getFormattedProfiles(profiles: any[]): string {
    return profiles.map(profile => {
      const { name, email, login, dob, gender } = profile;
      return `Nombre: ${name.first} ${name.last}<br>Email: ${email}<br>Contraseña: ${login.password}<br>Edad: ${dob.age}<br>Género: ${gender}`;
    }).join('<br><br>');
  }
}
