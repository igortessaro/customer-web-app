import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Constants } from '../app.constantes';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private baseUrl = Constants.CUSTOMERAPI_URL;
  private endpoint = 'customer/';

  constructor(private httpClient: HttpClient) { }

  public getAll(): Observable<Customer[]> {
    return this.httpClient.get(`${this.baseUrl}${this.endpoint}`).pipe(map((data: object) => data as Customer[]));
  }

  public get(id: number): Observable<Customer> {
    return this.httpClient.get(`${this.baseUrl}${this.endpoint}${id}`).pipe(map((data: object) => data as Customer));
  }

  public create(customer: Customer): Observable<Customer> {
    return this.httpClient.post(`${this.baseUrl}${this.endpoint}`, customer).pipe(map((data: object) => data as Customer));
  }

  public update(id: number, customer: Customer): Observable<Customer> {
    return this.httpClient.put(`${this.baseUrl}${this.endpoint}${id}`, customer).pipe(map((data: object) => data as Customer));
  }
}
