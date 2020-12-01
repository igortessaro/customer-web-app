import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../app.constantes';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Region } from '../models/region';

@Injectable({ providedIn: 'root' })
export class RegionService {
    private baseUrl = Constants.CUSTOMERAPI_URL;

    constructor(private httpClient: HttpClient) { }

    public getRegions(): Observable<Region[]> {
        return this.httpClient.get(`${this.baseUrl}Region`).pipe(map((data: object) => data as Region[]));
    }
}
