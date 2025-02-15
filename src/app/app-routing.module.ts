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
import { SingleComponent } from './room/single/single.component';
import { DoubleComponent } from './room/double/double.component';
import { SuiteComponent } from './room/suite/suite.component';
import { AuthGuard } from './auth/guard/auth.guard';
import { AdminGuard } from './auth/guard/admin.guard';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: LandingPageComponent},
  {path: 'reservations', component: MyReservationsComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'services', component: ServicesComponent},
  {path: 'services/list', component: ServiceListComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'services/list/add', component: ServiceFormComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'services/:id', component: ViewServiceComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'contact', component: ContactComponent},
  {path: 'single', component: SingleComponent},
  {path: 'double', component: DoubleComponent},
  {path: 'suite', component: SuiteComponent},
  {path: 'rooms/list', component: RoomListComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'rooms/list/add', component: AddRoomsComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'rooms/edit/:id', component: EditRoomComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'rooms/:id', component: ViewRoomComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard, AdminGuard] },
  {path: 'reservations/list', component: ReservationListComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'reservations/:id', component: ReservationComponent, canActivate: [AuthGuard]},
  {path: 'reservations/edit/:id', component: ReservationEditComponent, canActivate: [AuthGuard, AdminGuard]}, 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
