import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MockBackend} from '@angular/http/testing';
import {BaseRequestOptions, Http, XHRBackend} from '@angular/http';

import { LoginComponent } from './login.component';
import {AppMaterialModule} from '../../modules/app-material.module';
import {ApiCallsService} from '../../services/api-calls.service';
import {LoggedUserService} from '../../services/logged-user.service';
import {RouterTestingModule} from '@angular/router/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        AppMaterialModule,
        BrowserAnimationsModule,
        RouterTestingModule
      ],
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
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create login component', () => {
    expect(component).toBeTruthy();
  });
});
