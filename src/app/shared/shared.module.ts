import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { SuccessfullyDialogComponent } from './successfully-dialog/successfully-dialog.component';

@NgModule({
  declarations: [
    ConfirmationDialogComponent, 
    ErrorDialogComponent, SuccessfullyDialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [
    MatDialogModule,
    MatButtonModule
  ]
})
export class SharedModule { }
