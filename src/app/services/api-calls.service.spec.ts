import { TestBed, inject } from '@angular/core/testing';
import {BaseRequestOptions, Http, HttpModule, XHRBackend} from '@angular/http';
import {MockBackend} from '@angular/http/testing';

import { ApiCallsService } from './api-calls.service';
import {LoggedUserService} from './logged-user.service';

describe('ApiCallsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ApiCallsService,
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

  it('should be created api-calls service', inject([ApiCallsService], (service: ApiCallsService) => {
    expect(service).toBeTruthy();
  }));
});
