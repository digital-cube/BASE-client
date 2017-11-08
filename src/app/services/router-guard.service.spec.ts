import { TestBed, inject } from '@angular/core/testing';
import {MockBackend} from '@angular/http/testing';
import {BaseRequestOptions, Http, XHRBackend} from '@angular/http';

import { RouterGuardService } from './router-guard.service';
import {LoggedUserService} from './logged-user.service';
import {RouterTestingModule} from '@angular/router/testing';

describe('RouterGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RouterGuardService,
        LoggedUserService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          deps: [MockBackend, BaseRequestOptions],
          useFactory:
            (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
              return new Http(backend, defaultOptions);
            }
        }
      ],
      imports: [
        RouterTestingModule
      ]
    });
  });

  it('should be created router-guard service', inject([RouterGuardService], (service: RouterGuardService) => {
    expect(service).toBeTruthy();
  }));
});
