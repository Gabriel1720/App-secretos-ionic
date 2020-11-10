import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiSecretosService } from '../api-secretos.service';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  dataUsuario:FormGroup; 
  passwordForm:FormGroup;
  nombre:FormControl;
  correo:FormControl;  
  passwordAnterior:FormControl; 
  passwordNueva:FormControl; 
  token:string; 

  constructor(
     private service: ApiSecretosService,
     private formBuilder: FormBuilder,
     private router: Router,
     private storage: Storage
  ) {}

async ngOnInit()
     {     
      this.createFormBuilder(); 
      
      await this.getToken(); 
      this.service.getUsuarioDatos(this.token).subscribe(data => {
            console.log(data); 
           this.nombre.setValue(data.__data__.nombre); 
           this.correo.setValue(data.__data__.correo);
      })
    }
     
  UpdateDatos(datos)
  {
        this.service.updateUsuarioDatos(datos, this.token).subscribe(data => {
          console.log(data)
        }); 
  }

  updatePass(pass)
  {
     this.service.updatePassword(pass, this.token).subscribe( data => {
        console.log("nueva password", data )
        this.passwordForm.reset(); 
     }); 
  }

  LogOut()
    {
        this.storage.clear().then(() => {
          this.router.navigate(['/login'])
        })
    }

async getToken()
    {
    await this.storage.get('token')
    .then(tokenData => 
      {
        this.token = JSON.parse(tokenData).access_token; 
        console.log(this.token)
      })
}



createFormBuilder(){
     this.nombre = new FormControl(); 
     this.correo = new FormControl(); 
     this.passwordAnterior = new FormControl(); 
     this.passwordNueva = new FormControl(); 

    this.dataUsuario = this.formBuilder.group({
      nombre : this.nombre,
      correo:  this.correo
    })

    this.passwordForm = this.formBuilder.group({
      claveAnterior: this.passwordAnterior,
      claveNueva: this.passwordNueva
    })
  }
}
