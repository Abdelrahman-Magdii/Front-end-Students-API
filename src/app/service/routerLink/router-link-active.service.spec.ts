import { TestBed } from '@angular/core/testing';

import { RouterLinkActiveService } from './router-link-active.service';

describe('RouterLinkActiveService', () => {
  let service: RouterLinkActiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouterLinkActiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
