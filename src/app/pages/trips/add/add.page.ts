import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToTrips(){
    this.router.navigate(['/login'])

  }

}
