import { TestBed } from '@angular/core/testing';

import { GetDataKeysService } from './get-data-keys.service';

describe('GetDataKeysService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetDataKeysService = TestBed.get(GetDataKeysService);
    expect(service).toBeTruthy();
  });
});
