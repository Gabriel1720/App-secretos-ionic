import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SingUpPageRoutingModule } from './sing-up-routing.module';

import { SingUpPage } from './sing-up.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SingUpPageRoutingModule
  ],
  declarations: [SingUpPage]
})
export class SingUpPageModule {}
