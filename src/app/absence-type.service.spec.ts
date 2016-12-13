/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AbsenceTypeService } from './absence-type.service';

describe('AbsenceTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AbsenceTypeService]
    });
  });

  it('should ...', inject([AbsenceTypeService], (service: AbsenceTypeService) => {
    expect(service).toBeTruthy();
  }));
});
