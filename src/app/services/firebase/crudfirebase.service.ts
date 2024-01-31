import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Iviaje } from 'src/app/interfaces/iviaje';
import { Iconductor } from 'src/app/interfaces/iconductor';
import { Isolicitud } from 'src/app/interfaces/isolicitud';
import { Observable, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CrudfirebaseService {

  constructor(private fire: AngularFirestore) { }


  createSolicitud(collectionName: string, data: Isolicitud) {
    return this.fire.collection<Isolicitud>(collectionName).add(data)
      .then((docRef) => {
        console.log('Solicitud creada correctamente', docRef.id);
      })
      .catch((error) => {
        console.error('Error al crear la solicitud', error);
      });
  }
  
  
  getSolicitudesByViajeId(viajeId: string): Observable<Isolicitud[]> {
    return this.fire.collection<Isolicitud>('Solicitudes', ref => ref.where('idviaje', '==', viajeId)).valueChanges({ idField: 'id' });
  }

  deleteSolicitud(solicitudId: string) {
    return this.fire.collection<Isolicitud>('Solicitudes').doc(solicitudId).delete();
  }

  getCollection(collectionName:string) {
    return this.fire.collection<Iviaje>(collectionName).valueChanges({ idField: 'id'});
  }

  getviajebyconductor(conductorId: string){
    return this.fire.collection<Iviaje>('viajes', ref => ref.where('idconductor', '==', conductorId)).valueChanges({ idField: 'id'});
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

  getUsuarioById(usuarioId: string) {
    return this.fire.collection<Iconductor>('users').doc(usuarioId).valueChanges();
  }
  
  getViajeById(viajeId: string): Observable<Iviaje | undefined> {
    return this.fire.collection<Iviaje>('Viajes').doc(viajeId).valueChanges();
  }

  

  getTripById(collectionName: string, tripId: string): Observable<Iviaje | undefined> {
    const collectionRef = this.fire.collection<Iviaje>('Viajes');
    const tripDocRef = collectionRef.doc(tripId);

    
    return tripDocRef.valueChanges();
  }

  
  
  getViajesByConductorId(conductorId: string): Observable<Iviaje[]> {
    return this.fire.collection<Iviaje>('Viajes', (ref) =>
      ref.where('idconductor', '==', conductorId)
    ).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Iviaje;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

}
