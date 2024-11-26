import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HeroComponent } from './hero/hero.component';
import { ReservationFormComponent } from '../reservation/reservation-form/reservation-form.component';
import { AdminDashboardComponent } from '../dashboard/admin-dashboard/admin-dashboard.component';
import { ReservationModule } from '../reservation/reservation.module';
import { DashboardModule } from '../dashboard/dashboard.module';



@NgModule({
  declarations: [
    LandingPageComponent,
    HeroComponent,
  ],
  imports: [
    CommonModule, 
    ReservationModule,
    DashboardModule
  ], 
  exports: [
    LandingPageComponent,
    HeroComponent,
  ]
})
export class LandingPageModule { }
