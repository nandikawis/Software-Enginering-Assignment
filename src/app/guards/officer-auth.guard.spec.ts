import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { officerAuthGuard } from './officer-auth.guard';

describe('officerAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => officerAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
