import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import {Storage} from '@ionic/storage'
import { ApiSecretosService } from '../api-secretos.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
   formSecreto; 
   token:string; 

  constructor(
    private storage: Storage,
    private router: Router,
    private formBuilder: FormBuilder,
    private service: ApiSecretosService,
    private toastController: ToastController
  ) {}


 ngOnInit()
  {
   
    this.formSecreto = this.formBuilder.group({
       titulo: new FormControl('', Validators.required),
       descripcion:  new FormControl('', Validators.required),
       valor_monetario: new FormControl('', Validators.required),
       fecha: new FormControl('', Validators.required),
       lugar: new FormControl('', Validators.required),
       lat: new FormControl('', Validators.required),
       lon: new FormControl('', Validators.required)
    })
  }

  LogOut()
  {
      this.storage.clear().then(() => {
        this.router.navigate(['/login'])
      })
  }

  async onSubmit(secreto){
       await this.getToken().then(() => {    
            console.log(secreto);   
            this.service.nuevoSecreto(this.handelFecha(secreto), this.token).subscribe(info => {
              console.log("code", info.status_code);
              if(info.status_code == 200){
                this.formSecreto.reset(); 
                this.PrensentToast("Nuevo secreto creado.")
              } else {
                  this.PrensentToast("Error al crear secreto.")
              }
          }); 
       }); 
}

handelFecha(secreto)
{
  secreto.fecha = secreto.fecha.slice(0, 10)
  return secreto; 
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


async PrensentToast(massage){
  const toast = await this.toastController.create({
    message: massage,
    duration: 2000
  });
  toast.present();
}

}
