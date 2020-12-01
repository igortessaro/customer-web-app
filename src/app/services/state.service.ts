import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../app.constantes';
import { State } from '../models/state';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class StateService {
    private baseUrl = Constants.CUSTOMERAPI_URL;

    constructor(private httpClient: HttpClient) { }

    public getStates(regionId: number): Observable<State[]> {
        return this.httpClient.get(`${this.baseUrl}region/${regionId}/states`).pipe(map((data: object) => data as State[]));
    }
}
