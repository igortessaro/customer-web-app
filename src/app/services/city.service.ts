import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../app.constantes';
import { City } from '../models/city';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CityService {
    private baseUrl = Constants.CUSTOMERAPI_URL;

    constructor(private httpClient: HttpClient) { }

    public getCities(stateId: number): Observable<City[]> {
        return this.httpClient.get(`${this.baseUrl}state/${stateId}/cities`).pipe(map((data: object) => data as City[]));
    }
}
