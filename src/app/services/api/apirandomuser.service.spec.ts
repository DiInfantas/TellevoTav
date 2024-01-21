import { TestBed } from '@angular/core/testing';

import { ApirandomuserService } from './apirandomuser.service';

describe('ApirandomuserService', () => {
  let service: ApirandomuserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApirandomuserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
