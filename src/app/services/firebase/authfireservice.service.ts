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
  register(data : any){
    return this.auth.createUserWithEmailAndPassword(data.email, data.password);
  }

  saveDetails(data:any){
    return this.firestore.collection("users").doc(data.uid).set(data);
  }

  getDetails(data: any ){
    return this.firestore.collection("users").doc(data.uid).valueChanges();
  }


}
