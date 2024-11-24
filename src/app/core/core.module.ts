import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { ReservationFormComponent } from '../reservation/reservation-form/reservation-form.component';



@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule, 
    RouterModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
  ]
})
export class CoreModule { }
