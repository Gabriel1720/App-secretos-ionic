import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ApiSecretosService } from '../api-secretos.service';
import { Router } from '@angular/router'
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
   loginForm; 
   
  constructor(
    private service: ApiSecretosService,
    private formBuilder: FormBuilder,
    private router: Router,
    private storage: Storage 
  ) { }
 
  ngOnInit():void
  {
     this.loginForm = this.formBuilder.group(
       {
         username : new FormControl('', Validators.required),
         password : new FormControl('', Validators.required)
       }
     )
  }


  AuthanticateUser(user):void
  {
      this.service.login(user).subscribe( tokenData => {
          console.log(tokenData) ; 
          if(tokenData.estado){
               this.saveToken(tokenData)
              this.router.navigate(['/tabs/tab1']);
          }
      } )
  }


  saveToken(tokenData){
    this.storage.set('token', JSON.stringify(tokenData));
  }
}
