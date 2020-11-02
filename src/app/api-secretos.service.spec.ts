import { TestBed } from '@angular/core/testing';

import { ApiSecretosService } from './api-secretos.service';

describe('ApiSecretosService', () => {
  let service: ApiSecretosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiSecretosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
