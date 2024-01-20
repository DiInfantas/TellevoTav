import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Iviaje } from 'src/app/interfaces/iviaje';


@Injectable({
  providedIn: 'root'
})
export class CrudfirebaseService {

  constructor(private fire: AngularFirestore) { }



  getCollection(collectionName:string) {
    return this.fire.collection<Iviaje>(collectionName).valueChanges({ idField: 'id'});
  }

}
