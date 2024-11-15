import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { AvailabilityService } from '../services/availability.service';
import { PexelService } from '../services/pexel.service';

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

    static async idValidatorRoom(control: AbstractControl): Promise<ValidationErrors | null> {
        return await CustomValidators.availabilityService.roomExists(control.value) ? null : { invalidId: true };
    }

    static imageUrlValidator(control: AbstractControl): ValidationErrors | null {
        const urlPattern = /^https:\/\/images\.pexels\.com\/photos\/\d+\/$/;
        return urlPattern.test(control.value) ? null : { invalidUrl: true };
    }

    static async idValidator(control: AbstractControl): Promise<ValidationErrors | null> {
        return await CustomValidators.pexelService.collectionExists(control.value) ? null : { invalidId: true };
    }

}
