import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {
  ADD_TRANSACTION,
  CALCULATE_TOTAL,
  SELECT_VEHICLE,
  SET_BED_LET_DOWN,
  SET_LICENSE_PLATE_NUMBER,
  SET_MUD_IN_BED,
  VehicleInputFormState
} from '../reducers/vehicle-input-form.reducer';

@Component({
  selector: 'app-vehicle-input-form',
  templateUrl: './vehicle-input-form.component.html',
  styleUrls: ['./vehicle-input-form.component.css']
})
export class VehicleInputFormComponent implements OnInit {
  carWashForm: FormGroup;
  vehicleType: string = '';
  mudInBed: boolean;
  bedLetDown: boolean;
  licensePlate: string = '';
  isTruck: boolean;
  errors: any = {};
  disabled: boolean;
  lastTenTransactions: any[] = [];
  total = 0;

  vehicleOptions = [{value: 'car', display: 'Car'}, {value: 'truck', display: 'Truck'}];

  constructor(private fb: FormBuilder, public store: Store<any>) {
  }

  ngOnInit() {
    this.carWashForm = this.fb.group({
      'licensePlate': ['', Validators.required],
      'vehicle-type': ['car', Validators.required],
      'mud-in-bed': ['no', this.isTruck ? Validators.required : null],
      'bed-let-down': ['no', this.isTruck ? Validators.required : null]
    });

    this.store.select('vehicleInputForm').subscribe((state: VehicleInputFormState) => {
      if (!state) {
        return;
      }
      this.isTruck = state.vehicleType === 'truck';
      this.lastTenTransactions = state.lastTenTransactions;
      this.total = state.transactionTotal;
      this.vehicleType = state.vehicleType;
      this.mudInBed = state.mudInBed;
      this.bedLetDown = state.bedLetDown;
      this.licensePlate = state.licensePlate;
      this.errors = state.errors;
      this.disabled = !state.canSubmit;
    });
    this.selectVehicle('car');
  }

  licensePlateInput(value) {

    this.store.dispatch({
      type: SET_LICENSE_PLATE_NUMBER,
      payload: value
    });
    this.store.dispatch({type: CALCULATE_TOTAL});
  }

  selectVehicle(value) {

    this.store.dispatch({type: SELECT_VEHICLE, payload: value});
    this.store.dispatch({type: CALCULATE_TOTAL});
  }

  isMudInBed(value) {
    this.store.dispatch({type: SET_MUD_IN_BED, payload: value === 'yes'});
    this.store.dispatch({type: CALCULATE_TOTAL});
  }

  isBedLetDown(value) {
    this.store.dispatch({type: SET_BED_LET_DOWN, payload: value === 'yes'});
    this.store.dispatch({type: CALCULATE_TOTAL});
  }

  calculateTotal() {
    this.total = 5;
    Object.keys(this.carWashForm.controls).forEach(c => {
      const value = this.carWashForm.controls[c].value;
      if (c === 'vehicle-type') {
        this.total += value === 'car' ? 0 : 5;
      }
      if (this.carWashForm.controls['vehicle-type'].value === 'truck' && c === 'mud-in-bed') {
        this.total += value === 'yes' ? 2 : 0;
      }
      if (c === 'licensePlate' && this.lastTenTransactions.find(t => t.licensePlate === this.carWashForm.controls[c].value)) {
        this.total = this.total * 0.5;
      }
    });

  }

  onSubmit(value): void {
    this.store.dispatch({type: ADD_TRANSACTION, payload: value});

    this.carWashForm.reset(
      {
        'vehicle-type': 'car',
        'mud-in-bed': 'no',
        'bed-let-down': 'no'
      });
  }
}
