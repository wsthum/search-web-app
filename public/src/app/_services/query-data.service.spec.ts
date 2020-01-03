import { TestBed } from '@angular/core/testing';

import { QueryDataService } from './query-data.service';

describe('QueryDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QueryDataService = TestBed.get(QueryDataService);
    expect(service).toBeTruthy();
  });
});
