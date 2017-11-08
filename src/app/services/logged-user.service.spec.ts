import { TestBed, inject } from '@angular/core/testing';

import { LoggedUserService } from './logged-user.service';
import {MockBackend} from '@angular/http/testing';
import {BaseRequestOptions, Http, XHRBackend} from '@angular/http';

describe('LoggedUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
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
      ]
    });
  });

  it('should be created logged_user service', inject([LoggedUserService], (service: LoggedUserService) => {
    expect(service).toBeTruthy();
  }));
  it('should set token logged_user service', inject([LoggedUserService], (service: LoggedUserService) => {
    const _token = 'xxx';
    service.setToken(_token);
    expect(service.getToken()).toEqual(_token);
  }));
});
