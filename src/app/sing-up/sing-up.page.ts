import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormControlDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiSecretosService } from '../api-secretos.service';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.page.html',
  styleUrls: ['./sing-up.page.scss'],
})
export class SingUpPage implements OnInit {
  signUpForm; 
  //canSignUp:boolean;

  constructor(
    private service: ApiSecretosService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

 
  ngOnInit():void
  {
       this.signUpForm = this.formBuilder.group({
         nombre : new FormControl('', Validators.required),
         correo : new FormControl(''),
         password : new FormControl(''),
         disabled : new FormControl(true) 
       });
  }
 
  
  
  onSubmit(usuarioData): void{
   const signUp =  this.service.signUp(usuarioData).subscribe( creado => {
      console.log(creado);
     // this.canSignUp = !creado.Estado ; 
      if(creado.Estado){
         this.signUpForm.reset(); 
         this.router.navigate(['/login'])
      }
   });    
 }

}
