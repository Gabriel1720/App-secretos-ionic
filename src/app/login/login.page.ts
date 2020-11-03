import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ApiSecretosService } from '../api-secretos.service';
import { Router } from '@angular/router'

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
    private router: Router
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
              this.router.navigate(['/tabs/tab1']);
          }
      } )
  }

}
