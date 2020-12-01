import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Constants } from '../app.constantes';
import { Region } from '../models/region';
import { State } from '../models/state';
import { City } from '../models/city';
import { Customer } from '../models/customer';
import { CityService } from '../services/city.service';
import { RegionService } from '../services/region.service';
import { StateService } from '../services/state.service';
import { GenderService } from '../services/gender.service';
import { ClassificationService } from '../services/classification.service';
import { Gender } from '../models/gender';
import { Classification } from '../models/classification';
import { CustomerService } from '../services/customer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  public form: FormGroup;
  public tittle = 'Customer';
  public msgRequiredField = Constants.MESSAGE_FIELD_REQUIRED;
  public genders: Gender[];
  public classifications: Classification[];
  public regions: Region[];
  public states: State[];
  public cities: City[];
  private customerId = 0;

  constructor(
    private regionService: RegionService,
    private stateService: StateService,
    private cityService: CityService,
    private genderService: GenderService,
    private classificationService: ClassificationService,
    private customerService: CustomerService,
    private router: Router,
    private route: ActivatedRoute) { }

  public ngOnInit(): void {
    const customerId = parseInt(this.route.snapshot.paramMap.get('id'), null);

    forkJoin([this.regionService.getRegions(), this.classificationService.getAll(), this.genderService.getAll()])
      .subscribe(response => {
        this.regions = response[0];
        this.classifications = response[1];
        this.genders = response[2];
      });

    if (customerId > 0) {
      this.initializeWithCustomer(customerId);
    } else {
      this.initializeWithoutCustomer();
    }
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    const customer = new Customer();
    customer.firstName = this.form.controls.firstName.value;
    customer.lastName = this.form.controls.lastName.value;
    customer.phone = this.form.controls.phone.value;
    customer.lastPurchase = new Date(this.form.controls.lastPurchase.value);
    customer.genderId = parseInt(this.form.controls.genderId.value, null);
    customer.classificationId = parseInt(this.form.controls.classificationId.value, null);
    customer.regionId = parseInt(this.form.controls.regionId.value, null);
    customer.stateId = parseInt(this.form.controls.stateId.value, null);
    customer.cityId = parseInt(this.form.controls.cityId.value, null);

    if (this.customerId === 0) {
      this.customerService.create(customer).subscribe(_ => this.router.navigate(['customer']));
    }else{
      this.customerService.update(this.customerId, customer).subscribe(_ => this.router.navigate(['customer']));
    }
  }

  private initializeWithCustomer(id: number): void {
    this.customerId = id;
    this.customerService.get(id).subscribe(data => {
      this.buildForm(data);
      forkJoin([this.stateService.getStates(data.regionId), this.cityService.getCities(data.stateId)])
        .subscribe(response => {
          this.states = response[0];
          this.cities = response[1];
        });
    });
  }

  private initializeWithoutCustomer(): void {
    this.buildForm(new Customer());
  }

  private buildForm(customer: Customer): void {
    this.form = new FormGroup({
      firstName: new FormControl(customer.firstName, Validators.required),
      lastName: new FormControl(customer.lastName, Validators.required),
      phone: new FormControl(customer.phone, Validators.required),
      lastPurchase: new FormControl(customer.lastPurchase, null),
      genderId: new FormControl(customer.genderId, Validators.required),
      classificationId: new FormControl(customer.classificationId, Validators.required),
      regionId: new FormControl(customer.regionId, Validators.required),
      stateId: new FormControl(customer.stateId, Validators.required),
      cityId: new FormControl(customer.cityId, Validators.required)
    });

    this.configureForm();
  }

  private configureForm(): void {
    this.form.controls.regionId.valueChanges.subscribe((id: number) => {
      this.cities = [];
      this.states = [];

      if (id > 0) {
        this.stateService.getStates(id).subscribe(data => {
          this.states = data;
        });
      }
    });

    this.form.controls.stateId.valueChanges.subscribe((id: number) => {
      this.cities = [];

      if (id > 0) {
        this.cityService.getCities(id).subscribe(data => {
          this.cities = data;
        });
      }
    });
  }
}
