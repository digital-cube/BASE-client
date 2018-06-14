import { Injectable } from '@angular/core';
import {LoggedUserService} from './logged-user.service';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class ApiCallsService {

  constructor(private logged_user: LoggedUserService, private http_client: HttpClient) { }

  getApiUrl(_url) {
    return `${environment.api_url}${_url}`;
  }

  svcGet(_url, data, token= null, load_json= true) {
    return this._svcCall('GET', _url, data, token, load_json);
  }

  svcPut(_url, data, token= null) {
    return this._svcCall('PUT', _url, data, token);
  }

  svcPost(_url, data, token= null) {
    return this._svcCall('POST', _url, data, token);
  }

  svcPatch(_url, data, token= null) {
    return this._svcCall('PATCH', _url, data, token);
  }

  svcDelete(_url, data, token= null) {
    return this._svcCall('DELETE', _url, data, token);
  }

  _svcCall(_method, _url, _data, _token= null, load_json= true) {
    const _options = {};
    if (_method === 'GET' || _method === 'DELETE') {
      _options['params'] = _data;
    }
    if (_token) {
      _options['headers'] = new HttpHeaders({Authorization: _token});
    }

    if (_method === 'GET') {
      return this.http_client.get(this.getApiUrl(_url), _options);
    }

    if (_method === 'PUT') {
      return this.http_client.put(this.getApiUrl(_url), _data, _options);
    }

    if (_method === 'POST') {
      return this.http_client.post(this.getApiUrl(_url), _data, _options);
    }

    if (_method === 'PATCH') {
      return this.http_client.patch(this.getApiUrl(_url), _data, _options);
    }

    if (_method === 'DELETE') {
      return this.http_client.delete(this.getApiUrl(_url), _options);
    }

    return Observable.of(false);
  }

  postImage(img) {
    return this.http_client.post(this.getApiUrl('/upl/profile-upload'), {
      upload: img,
      token:  this.logged_user.getToken()
    });
  }
}
