import { TestBed } from '@angular/core/testing';

import { FormataService } from './formata.service';

describe('FormataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormataService = TestBed.get(FormataService);
    expect(service).toBeTruthy();
  });
});
