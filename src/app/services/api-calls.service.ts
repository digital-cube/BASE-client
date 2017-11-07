import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers} from '@angular/http';
import {LoggedUserService} from './logged-user.service';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

@Injectable()
export class ApiCallsService {

  constructor(private http: Http, private logged_user: LoggedUserService) { }

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
    let _options = new RequestOptions();
    if (_method === 'GET' || _method === 'DELETE')
      _options.search = _data;
    if (_token)
      _options.headers = new Headers({Authorization: _token});
      // _options.headers = new Headers({Authorization: this.logged_user.get_token()});

    if (_method === 'GET')
      return this.http.get(this.getApiUrl(_url), _options).map(r => load_json ? r.json() : r );

    if (_method === 'PUT')
      return this.http.put(this.getApiUrl(_url), _data, _options).map(r => load_json ? r.json() : r);

    if (_method === 'POST')
      return this.http.post(this.getApiUrl(_url), _data, _options).map(r => load_json ? r.json() : r);

    if (_method === 'PATCH')
      return this.http.patch(this.getApiUrl(_url), _data, _options).map(r => load_json ? r.json() : r);

    if (_method === 'DELETE')
      return this.http.delete(this.getApiUrl(_url), _options).map(r => load_json ? r.json() : r);

    return Observable.of(false);
  }

  postImage(img) {
    return this.http.post(this.getApiUrl('/upl/profile-upload'), {
      upload: img,
      token:  this.logged_user.getToken()
    }).map(res => res.json());
  }
}
