import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {provideHttpClient} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';

import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';

import {AppComponent} from './app.component';

import {ReservationService} from './reservation/reservation.service';

import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {ServiceModule} from './service/service.module';
import {RoomModule} from './room/room.module';
import {ReservationModule} from './reservation/reservation.module';
import {DashboardModule} from './dashboard/dashboard.module';
import {AuthModule} from './auth/auth.module';
import {CoreModule} from './core/core.module';
import {ContactModule} from './contact/contact.module';
import {ProfileModule} from './profile/profile.module';
import {LandingPageModule} from './landing-page/landing-page.module';
import {SharedModule} from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    FormsModule,
    CommonModule,
    MatIconModule,
    BrowserModule,
    CoreModule,
    AuthModule,
    DashboardModule,
    ReservationModule,
    RoomModule,
    ServiceModule,
    ContactModule,
    ProfileModule,
    LandingPageModule,
    SharedModule
  ],
  providers: [ReservationService, provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule {
}
