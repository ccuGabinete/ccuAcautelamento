import { TestBed } from '@angular/core/testing';

import { TelaService } from './tela.service';

describe('TelaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TelaService = TestBed.get(TelaService);
    expect(service).toBeTruthy();
  });
});
