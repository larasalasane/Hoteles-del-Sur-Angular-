import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ServicesService} from '../services.service';
import {CustomValidators} from '../../core/validators/custom-validators';
import {PexelsService} from '../../core/pexels.service';
import {ErrorDialogComponent} from '../../shared/error-dialog/error-dialog.component';
import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-service-form',
  templateUrl: './service-form.component.html',
  styleUrl: './service-form.component.css'
})
export class ServiceFormComponent implements OnInit {

  serviceForm: FormGroup;
  successMessage: boolean = false;

  constructor(
    private fb: FormBuilder,
    private servicesService: ServicesService,
    private router: Router,
    public pexelsService: PexelsService,
    public dialog: MatDialog
  ) {
    this.serviceForm = this.fb.group({
      id: ['', Validators.required, CustomValidators.collectionExist(pexelsService)],
      title: ['', Validators.required],
      subtitle: ['', Validators.required],
      description: ['', Validators.required],
      imageUrl: ['', [Validators.required, CustomValidators.imageUrlValidator()]],
    });
  }

  ngOnInit(): void {
  }

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
      } catch (error: any) {
        this.openErrorDialog(error.message);
      }
    } else {
      this.openErrorDialog('Formulario Invalido');
    }
  }

  openErrorDialog(errorMessage: string): void {
    this.dialog.open(ErrorDialogComponent, {
      width: '400px',
      height: '200px',
      data: errorMessage
    });
  }
}




