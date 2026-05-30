import { TestBed } from '@angular/core/testing';

import { AuthErrorInterceptorService } from './auth-error-interceptor.service';

describe('AuthErrorInterceptorService', () => {
  let service: AuthErrorInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthErrorInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
