import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiSecretosService } from '../api-secretos.service';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  signUpForm; 
  canSignUp:boolean;

  constructor(
     private service: ApiSecretosService,
     private formBuilder: FormBuilder,
     private router: Router,
     private storage: Storage
  ) {}

   ngOnInit():void
     {
       /*  this.signUpForm =  this.formBuilder.group({
         nombre : new FormControl('', Validators.required),
          correo : new FormControl(''),
          password : new FormControl('')
        });*/
  }


 
 onSubmit(usuarioData): void{
 /* const signUp =  this.service.signUp(usuarioData).subscribe( creado => {
     console.log(creado);
    // this.canSignUp = !creado.Estado ; 
     if(creado.Estado){
        this.signUpForm.reset(); 
        this.router.navigate(['/login'])
     }
  });    
  */
}

LogOut()
  {
      this.storage.clear().then(() => {
        this.router.navigate(['/login'])
      })
  }

}
