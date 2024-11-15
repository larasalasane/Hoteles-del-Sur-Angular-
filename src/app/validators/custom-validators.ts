import {Injectable} from '@angular/core';
import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import {AvailabilityService} from '../services/availability.service';
import {PexelService} from '../services/pexel.service';

@Injectable({
  providedIn: 'root'
})
export class CustomValidators {
  static availabilityService: AvailabilityService;
  static pexelService: PexelService;

  constructor(private availService: AvailabilityService, private pService: PexelService) {
    CustomValidators.availabilityService = availService;
    CustomValidators.pexelService = pService;
  }

  static checkInValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value && this.formatDate(control.value) < this.getToday()) {
        return {'checkInInvalid': 'La fecha de check-in debe ser posterior a la fecha actual.'};
      }
      return null;
    };
  }

  static checkOutValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if(!control.parent){
        return {'checkOutInvalid':'Falta Fecha Checkin'}
      }
      const checkInDate = this.formatDate(control.parent.get('checkInDate')?.value);
      const checkOutDate = this.formatDate(control.value);
      if (checkInDate && checkOutDate &&  checkInDate>checkOutDate) {
        return { 'checkOutInvalid': 'La fecha de check-out debe ser posterior a la de check-in.' };
      }
      return null;
    };
  }

  private static getToday(){
    let today = new Date();
    today.setHours(0, 0, 0, 0,);
    return today;
  }

  private static formatDate(date: Date) {
    return new Date(date + 'T00:00:00');
  }

  static async idValidatorRoom(control: AbstractControl): Promise<ValidationErrors | null> {
    return await CustomValidators.availabilityService.roomExists(control.value) ? null : {invalidId: true};
  }

  static imageUrlValidator(control: AbstractControl): ValidationErrors | null {
    const urlPattern = /^https:\/\/images\.pexels\.com\/photos\/\d+\/$/;
    return urlPattern.test(control.value) ? null : {invalidUrl: true};
  }

  static async idValidator(control: AbstractControl): Promise<ValidationErrors | null> {
    return await CustomValidators.pexelService.collectionExists(control.value) ? null : {invalidId: true};
  }
}
