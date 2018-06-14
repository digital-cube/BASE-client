import { TestBed, inject } from '@angular/core/testing';

import { LoggedUserService } from './logged-user.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('LoggedUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoggedUserService,
      ],
      imports: [
        HttpClientTestingModule
      ],
    });
  });

  it('should be created logged_user service', inject([HttpTestingController, LoggedUserService],
    (http_client: HttpTestingController, service: LoggedUserService) => {
    expect(service).toBeTruthy();
  }));
  it('should set token logged_user service', inject([HttpTestingController, LoggedUserService],
    (http_client: HttpTestingController, service: LoggedUserService) => {
    const _token = 'xxx';
    service.setToken(_token);
    expect(service.getToken()).toEqual(_token);
  }));
});
