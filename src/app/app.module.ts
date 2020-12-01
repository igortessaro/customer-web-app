import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchCustomerComponent } from './customer/search-customer/search-customer.component';
import { CustomerComponent } from './customer/customer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CityService } from './services/city.service';
import { RegionService } from './services/region.service';
import { StateService } from './services/state.service';
import { ClassificationService } from './services/classification.service';
import { GenderService } from './services/gender.service';
import { CustomerService } from './services/customer.service';
import { HttpClientModule, } from '@angular/common/http';
import { NgxMaskModule, IConfig } from 'ngx-mask';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    AppComponent,
    SearchCustomerComponent,
    CustomerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ClarityModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgxMaskModule.forRoot()
  ],
  providers: [CityService, RegionService, StateService, GenderService, ClassificationService, CustomerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
