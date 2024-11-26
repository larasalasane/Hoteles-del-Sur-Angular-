import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Photo, Video} from 'pexels';
import {catchError, from, map, Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PexelsService {

  pexelApiUrl: string = 'https://api.pexels.com/v1/collections';
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'hWkij7wdARDTvvs8FItfQCE9mgNdRvxr5TiiBBFHGca9As8zWyP74BwQ'
  });


  constructor(
    private http: HttpClient
  ) {
  }

  async getCollectionMedia(collectionId: string) : Promise<Collection | undefined> {
    return this.http.get<Collection>(this.pexelApiUrl + `/${(collectionId)}`, {headers: this.headers}).toPromise();
  }

  collectionExists(collectionId: string): Observable<boolean> {
    return from(this.getCollectionMedia(collectionId)).pipe(
      map((collection) => collection !== undefined),
      catchError(() => of(false))
    );
  }
}

export interface Collection {
  id: string;
  media : CollectionMedia[]
}

export interface CollectionMedia extends Photo, Video {
  type: string;
}
