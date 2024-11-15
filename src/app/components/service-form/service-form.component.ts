import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesService } from '../../services/services.service';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { PexelService } from '../../services/pexel.service';


@Component({
  selector: 'app-service-form',
  templateUrl: './service-form.component.html',
  styleUrl: './service-form.component.css'
})
export class ServiceFormComponent implements OnInit {

  serviceForm: FormGroup;
  successMessage: boolean = false;

  constructor(private fb: FormBuilder,
    private servicesService: ServicesService,
    private router: Router
  ) {
    this.serviceForm = this.fb.group({
      id: ['', Validators.required],
      title: ['', Validators.required],
      subtitle: ['', Validators.required],
      description: ['', Validators.required],
      imageUrl: ['',Validators.required],
    });
  }

  ngOnInit(): void { }

  async onSubmit(): Promise<void> {
    if (this.serviceForm.valid) {
      const newService = this.serviceForm.value;
      try {
        const addedService = await this.servicesService.addService(newService);
        if (addedService) {
          this.serviceForm.reset();
          this.successMessage = true;
          setTimeout(() => this.successMessage = false, 3000);
          await this.router.navigateByUrl(`/services/${addedService.id}`);
        }
      } catch (error) {
        console.error('Error al añadir el servicio:', error);
      }
    } else {
      console.log('El formulario es inválido');
    }
  }
}

export function imageUrlValidator(control: AbstractControl): ValidationErrors | null {
  const urlPattern = /^https:\/\/images\.pexels\.com\/photos\/\d+\/$/;
  return urlPattern.test(control.value) ? null : { invalidUrl: true };
}

export async function idValidator(control: AbstractControl, pexelService : PexelService): Promise<ValidationErrors | null> {
  return await pexelService.collectionExists(control.value) ? null : { invalidId: true };
}



