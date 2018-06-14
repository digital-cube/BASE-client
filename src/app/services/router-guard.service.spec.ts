import {TestBed, inject} from '@angular/core/testing';

import {RouterGuardService} from './router-guard.service';
import {LoggedUserService} from './logged-user.service';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('RouterGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RouterGuardService,
        LoggedUserService,
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ]
    });
  });

  it('should be created router-guard service', inject([HttpTestingController, RouterGuardService],
    (http_client: HttpTestingController, service: RouterGuardService) => {
      expect(service).toBeTruthy();
    }));
});
