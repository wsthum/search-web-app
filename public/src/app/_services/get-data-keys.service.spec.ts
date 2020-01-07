import { TestBed } from '@angular/core/testing';

import { FileKeyService } from './get-data-keys.service';

describe('FileKeyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FileKeyService = TestBed.get(FileKeyService);
    expect(service).toBeTruthy();
  });
});
