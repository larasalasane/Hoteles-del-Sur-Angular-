import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-successfully-dialog',
  templateUrl: './successfully-dialog.component.html',
  styleUrl: './successfully-dialog.component.css'
})
export class SuccessfullyDialogComponent {
  
  constructor(
    public dialogRef: MatDialogRef<SuccessfullyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
