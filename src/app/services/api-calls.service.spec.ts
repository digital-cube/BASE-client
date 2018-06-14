import {TestBed, inject} from '@angular/core/testing';

import {ApiCallsService} from './api-calls.service';
import {LoggedUserService} from './logged-user.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('ApiCallsService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        ApiCallsService,
        LoggedUserService,
      ]
    });
  });

  it('should be created api-calls service', inject([HttpTestingController, ApiCallsService],
    (http_client: HttpTestingController, service: ApiCallsService) => {
      expect(service).toBeTruthy();
    }));
  it('should return api url', inject([HttpTestingController, ApiCallsService],
    (http_client: HttpTestingController, service: ApiCallsService) => {
      expect(service.getApiUrl('dummy_api')).toBe('dummy_api');
    }));
});
