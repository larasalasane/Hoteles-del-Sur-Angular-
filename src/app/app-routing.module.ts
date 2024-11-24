import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LandingPageComponent} from './landing-page/landing-page/landing-page.component';
import {MyReservationsComponent} from './reservation/my-reservations/my-reservations.component';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {ReservationComponent} from './reservation/reservation/reservation.component';
import {ServicesComponent} from './service/services/services.component';
import {ProfileComponent} from './profile/profile/profile.component';
import {ContactComponent} from './contact/contact/contact.component';
import {ServiceFormComponent} from './service/service-form/service-form.component';
import {AddRoomsComponent} from './room/add-rooms/add-rooms.component';
import {ViewServiceComponent} from './service/view-service/view-service.component';
import {ViewRoomComponent} from './room/view-room/view-room.component';
import {RoomListComponent} from './room/room-list/room-list.component';
import {ReservationEditComponent} from './reservation/reservation-edit/reservation-edit.component';
import {AdminDashboardComponent} from './dashboard/admin-dashboard/admin-dashboard.component';
import {EditRoomComponent} from './room/edit-room/edit-room.component';
import { ServiceListComponent } from './service/service-list/service-list.component';
import { ReservationListComponent } from './reservation/reservation-list/reservation-list.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: LandingPageComponent},
  {path: 'reservations', component: MyReservationsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'services', component: ServicesComponent},
  {path: 'services/list', component: ServiceListComponent},
  {path: 'services/list/add', component: ServiceFormComponent},
  {path: 'services/:id', component: ViewServiceComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'rooms/list', component: RoomListComponent},
  {path: 'rooms/list/add', component: AddRoomsComponent},
  {path: 'rooms/edit/:id', component: EditRoomComponent},
  {path: 'rooms/:id', component: ViewRoomComponent},
  {path: 'dashboard', component: AdminDashboardComponent},
  {path: 'reservations/list', component: ReservationListComponent},
  {path: 'reservations/:id', component: ReservationComponent},
  {path: 'reservations/edit/:id', component: ReservationEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
