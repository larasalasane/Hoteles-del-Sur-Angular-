import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from '@angular/forms';
import { AvailabilityService } from '../services/availability.service';
import { PexelService } from '../services/pexel.service';
import { UserDataService } from '../services/user-data.service';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomValidators {
  static availabilityService: AvailabilityService;
  static pexelService: PexelService;
  static userDataService: UserDataService;

  constructor() {

  }

  static checkInValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value && this.formatDate(control.value) < this.getToday()) {
        return { 'checkInInvalid': 'La fecha de check-in debe ser posterior a la fecha actual.' };
      }
      return null;
    };
  }

  static checkOutValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.parent) {
        return { 'checkOutInvalid': 'Falta Fecha Checkin' }
      }
      const checkInDate = this.formatDate(control.parent.get('checkInDate')?.value);
      const checkOutDate = this.formatDate(control.value);
      if (checkInDate && checkOutDate && checkInDate > checkOutDate) {
        return { 'checkOutInvalid': 'La fecha de check-out debe ser posterior a la de check-in.' };
      }
      return null;
    };
  }

  private static getToday() {
    let today = new Date();
    today.setHours(0, 0, 0, 0,);
    return today;
  }

  private static formatDate(date: Date) {
    return new Date(date + 'T00:00:00');
  }

  /*static async idValidatorRoom(control: AbstractControl): Promise<ValidationErrors | null> {
    return await CustomValidators.availabilityService.roomExists(control.value) ? null : { invalidId: true };
  }*/

  static idValidatorRoom(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<{ [key: number]: any } | null> => {
      if (control.value == '') {
        return null as any;
      }
      else {
        return this.availabilityService.roomExists(control.value)
          .then(response => {
            return response ? { 'roomExists': { value: control.value } } : null;
          });
      }
    };
  }


  /*static imageUrlValidator(control: AbstractControl): ValidationErrors | null {
    const urlPattern = /^https:\/\/images\.pexels\.com\/photos\/\d+\/$/;
    return urlPattern.test(control.value) ? null : { invalidUrl: true };
  }*/

  static imageUrlValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      const urlPattern = /^https:\/\/images\.pexels\.com\/photos\/\d+\/$/;
      return urlPattern.test(control.value) ? null : { invalidUrl: true };
    };
  }

  /*static async idValidator(control: AbstractControl): Promise<ValidationErrors | null> {
    return await CustomValidators.pexelService.collectionExists(control.value) ? null : { invalidId: true };
  }*/

  static idValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<{ [key: string]: any } | null> => {
      if (control.value == '') {
        return null as any;
      }
      else {
        return this.pexelService.collectionExists(control.value)
          .then(response => {
            return response ? { 'collectionExists': { value: control.value } } : null;
          });
      }
    };
  }

  static emailExists(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) {
        return of(null);
      }

      return this.userDataService.getUserByEmail(control.value).pipe(
        map(users => (users && users.length > 0 ? { emailExists: { value: control.value } } : null)),
        catchError(() => of(null))
      );
    };
  }

}
