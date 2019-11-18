import { TestBed } from '@angular/core/testing';

import { LacreService } from './lacre.service';

describe('LacreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LacreService = TestBed.get(LacreService);
    expect(service).toBeTruthy();
  });
});
