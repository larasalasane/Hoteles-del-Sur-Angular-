import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services/services.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrl: './service-list.component.css'
})
export class ServiceListComponent implements OnInit{

  services: any[] = [];

  constructor(private serviceService: ServicesService,
    public dialog: MatDialog,
    private router: Router
  ){

  }

  async ngOnInit(): Promise<void> {
    await this.getServices();
  }

  async openConfirmDialog(serviceId: string): Promise<void> {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      height: '200px',
      data: { serviceId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cancelService(serviceId);
      }
    });
  }

  async cancelService(serviceId: string): Promise<void> {
    await this.serviceService.deleteService(serviceId);
    await this.getServices()
  }

  async getServices(){
    const services = await this.serviceService.getAllServices()
    if (services) this.services = services;
  }

  goToAddServices(){
    this.router.navigate(['/services/add'])
  }


}
