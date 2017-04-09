/* tslint:disable:no-unused-variable */

import {VehicleInputFormComponent} from './vehicle-input-form.component';

describe('VehicleInputFormComponent', () => {
  const mockFormBuilder = jasmine.createSpyObj('form builder', ['group']);
  const mockStore = jasmine.createSpyObj('store', ['dispatch', 'select']);
  const component = new VehicleInputFormComponent(mockFormBuilder, mockStore);


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#selectVehicle', () => {
    it('set isTruck based on input value', () => {
      describe('when value === truck', () => {
        it('sets isTruck to true', () => {
          component.selectVehicle('truck');
          expect(component.isTruck).toBe(true);
        });
      });
    });
  });
});
