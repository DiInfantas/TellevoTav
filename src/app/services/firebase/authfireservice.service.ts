import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class AuthfireserviceService {

  user$!: Observable<any>;

  constructor(
    public firestore : AngularFirestore,
    public auth : AngularFireAuth,
    private router:Router,
    private afAuth: AngularFireAuth
  ) { 
    this.user$ = this.afAuth.authState;
  }

  async getCurrentUser() {
    return this.auth.currentUser;
  }

  async getUserType(userId: string) {
    try {
      const userDoc = await this.firestore.collection('users').doc(userId).get().toPromise();
      if (userDoc) {
        const userData: { tipo: string } = userDoc.data() as { tipo: string };
        return userData.tipo;
      } else {
        console.error("Documento de usuario no encontrado.");
        return null;
      }
    } catch (error) {
      console.error("Error al obtener el tipo de usuario:", error);
      return null;
    }
  }
  



  async login(email:string, password:string) {
    try {
      const userCredential = await this.auth.signInWithEmailAndPassword(email,password);
      console.log("SESION INICIADA");
    } catch (error) {
      console.error("ERROR AL INICIAR SESION");
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
        });
      } else {
        console.error("Usuario nulo");
      }
    } catch (error) {
      console.log(error);
    }
  }

  logout() {

    this.afAuth.signOut().then(() => {     
      console.log('Sesión cerrada exitosamente.');
    }).catch(error => {
      console.error('Error al cerrar sesión:', error);
    });
  }


  saveDetails(data:any){
    return this.firestore.collection("users").doc(data.uid).set(data);
  }

  getDetails(data: any ){
    return this.firestore.collection("users").doc(data.uid).valueChanges();
  }

  getUserId(): Observable<string> {
    return this.user$.pipe(map((user) => (user ? user.uid : '')));
  }

}
