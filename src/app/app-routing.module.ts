import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ReservationFormComponent } from './components/reservation-form/reservation-form.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'reservation', component: ReservationFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
