import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Constants } from '../app.constantes';
import { Classification } from '../models/classification';

@Injectable({
  providedIn: 'root'
})
export class ClassificationService {
  private baseUrl = Constants.CUSTOMERAPI_URL;

  constructor(private httpClient: HttpClient) { }

  public getAll(): Observable<Classification[]> {
    return this.httpClient.get(`${this.baseUrl}classification/`).pipe(map((data: object) => data as Classification[]));
  }
}
