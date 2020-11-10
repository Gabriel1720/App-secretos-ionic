import { Component, OnInit } from '@angular/core';
import {ApiSecretosService} from '../api-secretos.service';
import {Storage}  from '@ionic/storage';
import {ISecreto} from  '../modelos.ts/ISecreto'; 
import {ToastController, AlertController}  from '@ionic/angular';
import {Router} from '@angular/router'


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  private token:any; 
  lista_secretos:ISecreto[] = []; 
  loading:boolean = true;  

  constructor(
    private service: ApiSecretosService,
    private storage: Storage,
    private toastController: ToastController,
    private alertController: AlertController,
    private router: Router
  ) {}

  async ngOnInit()
  {
      
  }

  async ionViewDidEnter()
  { 
    await this.getToken();
    this.lista_secretos = [] ; 
    this.LoadSecretos(); 
  }

   // JSON "get" example
  async getToken()
  {
      await this.storage.get('token')
      .then(tokenData => 
        {
          this.token = JSON.parse(tokenData).access_token; 
          console.log(this.token)
        })
  }

  delete(id:BigInteger){
    this.presentAlert(id); 
  }

  LogOut()
  {
    this.storage.clear().then(() =>{
        this.router.navigate(['/login'])
    })
  }


  async PrensentToast(massage){
    const toast = await this.toastController.create({
      message: massage,
      duration: 2000
    });
    toast.present();
  }

  isthereAnySecrets():boolean{
    if(this.lista_secretos.length != 0){
      return true; 
    } else {
      return false; 
    }
  }

  async LoadSecretos(){
    await this.service.listaSecretos(this.token).subscribe(lista => {
      this.loading = false; 
      
      if(lista.Secretos != null ){
          lista.Secretos.forEach(secreto => {
            this.lista_secretos.push(secreto);
            console.log(secreto)
        });
      }
   })
  }


  async presentAlert(id:BigInteger) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Eliminar secreto',
      message: '<strong>Se eliminara este secreto</strong>',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('sea cancelado');
          }
        }, {
          text: 'Borrar',
          handler: () => {
              console.log('Sea eliminado');
              this.service.deleteSecreto(id, this.token).subscribe(datos =>{
                if(datos.Borrado){
                  this.PrensentToast("Sea eliminado un secreto.").then(() => {
                    this.lista_secretos = [] ;
                    this.LoadSecretos();
                  });
        
                } else {
                  this.PrensentToast("Error al eliminar secreto.");
                }
            })
          }
        }
      ]
    });

    await alert.present();
  }

}
