import { TestBed } from '@angular/core/testing';

import { LoginLinkActiveService } from './login-link-active.service';

describe('LoginLinkActiveService', () => {
  let service: LoginLinkActiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginLinkActiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
