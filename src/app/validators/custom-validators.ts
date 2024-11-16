import {Injectable} from '@angular/core';
import {AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn} from '@angular/forms';
import {PexelsService} from '../services/pexels.service';
import {UserDataService} from '../services/user-data.service';
import {catchError, map, Observable, of} from 'rxjs';
import {RoomDataService} from "../services/room-data.service";

@Injectable({
    providedIn: 'root'
})
export class CustomValidators {
    static userDataService: UserDataService;

    constructor() {

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
            if (!control.parent) {
                return {'checkOutInvalid': 'Falta Fecha Checkin'}
            }
            const checkInDate = this.formatDate(control.parent.get('checkInDate')?.value);
            const checkOutDate = this.formatDate(control.value);
            if (checkInDate && checkOutDate && checkInDate > checkOutDate) {
                return {'checkOutInvalid': 'La fecha de check-out debe ser posterior a la de check-in.'};
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

    static roomExists(roomDataService: RoomDataService): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            if (!control.value) {
                return of(null);
            } else {
                return roomDataService.roomExists(control.value).pipe(
                    map(result => result ? {roomExists: {value: control.value}} : null),
                    catchError(() => of(null))
                )
            }
        };
    }

    static collectionExist(pexelsService: PexelsService): AsyncValidatorFn {
        return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
            if (control.value == '') {
                return null as any;
            }
            return pexelsService.collectionExists(control.value).pipe(
                map(result => !result ? {collectionExists: {value: control.value}} : null),
                catchError(() => of(null))
            )
        };
    }

    static imageUrlValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (!control.value) {
                return null;
            }
            const urlPattern = /^https:\/\/images\.pexels\.com\/photos\/\d{6}.*/
            return urlPattern.test(control.value) ? null : {invalidUrl: true};
        };
    }


    static emailExists(): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            if (!control.value) {
                return of(null);
            }

            return this.userDataService.getUserByEmail(control.value).pipe(
                map(users => (users && users.length > 0 ? {emailExists: {value: control.value}} : null)),
                catchError(() => of(null))
            );
        };
    }

}
