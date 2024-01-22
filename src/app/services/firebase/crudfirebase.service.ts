import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Iviaje } from 'src/app/interfaces/iviaje';
import { Iconductor } from 'src/app/interfaces/iconductor';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CrudfirebaseService {

  constructor(private fire: AngularFirestore) { }



  getCollection(collectionName:string) {
    return this.fire.collection<Iviaje>(collectionName).valueChanges({ idField: 'id'});
  }

  createDocument(collectionName:string, data:Iviaje) {
    return this.fire.collection<Iviaje>(collectionName).add(data);
  }

  updateDocument(collectionName:string, data:Iviaje, documentId:string) {
    return this.fire.collection<Iviaje>(collectionName).doc(documentId).update(data);
  }

  deleteDocument(collectionName:string, documentId:string) {
    return this.fire.collection<Iviaje>(collectionName).doc(documentId).delete();
  }

  getUsuarioById(usuarioId: string): Observable<Iconductor | undefined> {
    return this.fire.collection<Iconductor>('users').doc(usuarioId).valueChanges();
  }
  
  getViajeById(viajeId: string): Observable<Iviaje | undefined> {
    return this.fire.collection<Iviaje>('Viajes').doc(viajeId).valueChanges();
  }


}
