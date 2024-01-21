import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthfireserviceService {

  constructor(
    public firestore : AngularFirestore,
    public auth : AngularFireAuth,
    private router:Router
  ) { }

  async login(email:string, password:string) {
    try {
      const userCredential = await this.auth.signInWithEmailAndPassword(email,password);
      console.log("SESION INICIADA");
      this.router.navigate(['trips']);
    } catch (error) {
      console.error("ERROR AL INICIAR SESION");
      console.log(email,password);
    }
  }
  async register(email:string, password:string) { 
    try {
      const userCredential = await this.auth.createUserWithEmailAndPassword(email,password);
      console.log("USUARIO CREADO");
    } catch (error) {
      console.error("ERROR AL CREAR USUARIO");
    }
  }

  async registerUser(email: string, password: string, userType: string, nombreCompleto: string, telefono: string) {
    try {
      // Registrar al usuario en Firebase 
      const result = await this.auth.createUserWithEmailAndPassword(email, password);
      const user = result.user;
  
      // verifica que el user exista antes
      if (user) {
  
        // Guardar información adicional en la base de datos
        await this.firestore.collection('users').doc(user.uid).set({
          tipo: userType,
          nombreCompleto: nombreCompleto,
          telefono: telefono,
          // Se pide nombre y apellido y despues se junta en la variable 'nombreCompleto'.
        });
      } else {
        console.error("Usuario nulo");
      }
  
      // // para enviar al user a su respectiva pagina
      // if (userType === 'conductor') {
      //   this.router.navigate(['/conductor']);
      // } else if (userType === 'pasajero') {
      //   this.router.navigate(['/pasajero']);
      // }
    } catch (error) {
      console.log(error);
    }
  }


  saveDetails(data:any){
    return this.firestore.collection("users").doc(data.uid).set(data);
  }

  getDetails(data: any ){
    return this.firestore.collection("users").doc(data.uid).valueChanges();
  }


}
