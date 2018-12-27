import { TestBed, inject } from '@angular/core/testing';

import { HeaderChangeService } from './header-change.service';

describe('HeaderChangeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeaderChangeService]
    });
  });

  it('should be created', inject([HeaderChangeService], (service: HeaderChangeService) => {
    expect(service).toBeTruthy();
  }));
});
