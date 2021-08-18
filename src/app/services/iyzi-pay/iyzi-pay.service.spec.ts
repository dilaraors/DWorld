import { TestBed } from '@angular/core/testing';

import { IyziPayService } from './iyzi-pay.service';

describe('IyziPayService', () => {
  let service: IyziPayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IyziPayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
