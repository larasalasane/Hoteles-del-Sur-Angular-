import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceFormComponent } from './service-form/service-form.component';
import { ServiceListComponent } from './service-list/service-list.component';
import { ViewServiceComponent } from './view-service/view-service.component';
import { ServicesComponent } from './services/services.component';

import { RouterModule } from '@angular/router';
import { ServiceComponent } from './services/service/service.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ServiceFormComponent,
    ServiceListComponent,
    ViewServiceComponent,
    ServicesComponent,
    ServiceComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ], exports: [ServiceFormComponent, ServiceListComponent, ViewServiceComponent]
})
export class ServiceModule { }
