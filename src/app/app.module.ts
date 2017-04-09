import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { VehicleInputFormComponent } from './vehicle-input-form/vehicle-input-form.component';
import { TotalDisplayComponent } from './total-display/total-display.component';
import {MaterialModule} from '@angular/material';
import {StoreModule} from '@ngrx/store';
import {vehicleInputForm} from './reducers/vehicle-input-form.reducer';

@NgModule({
  declarations: [
    AppComponent,
    VehicleInputFormComponent,
    TotalDisplayComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule,
    StoreModule.provideStore({vehicleInputForm: vehicleInputForm})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
