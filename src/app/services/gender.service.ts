import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Constants } from '../app.constantes';
import { Gender } from '../models/gender';

@Injectable({
  providedIn: 'root'
})
export class GenderService {
  private baseUrl = Constants.CUSTOMERAPI_URL;

  constructor(private httpClient: HttpClient) { }

  public getAll(): Observable<Gender[]> {
    return this.httpClient.get(`${this.baseUrl}Gender/`).pipe(map((data: object) => data as Gender[]));
  }
}
