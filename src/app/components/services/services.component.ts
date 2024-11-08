import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services/services.service';
import { Service } from '../../models/service.model';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit{
  services : Service[] | undefined ;

  constructor(private servicesService : ServicesService) {}

  ngOnInit(): void {
      this.servicesService.getAllServices().then(
        foundServices => this.services = foundServices
      ).catch(
        
      )
      
  }
}
