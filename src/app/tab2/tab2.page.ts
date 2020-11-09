import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Storage} from '@ionic/storage'

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(
    private storage: Storage,
    private router: Router
  ) {}


  LogOut()
  {
      this.storage.clear().then(() => {
        this.router.navigate(['/login'])
      })
  }

}
