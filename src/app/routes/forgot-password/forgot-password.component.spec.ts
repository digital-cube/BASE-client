import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {AppMaterialModule} from '../../modules/app-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { ForgotPasswordComponent } from './forgot-password.component';
import {RouterTestingModule} from '@angular/router/testing';
import {ApiCallsService} from '../../services/api-calls.service';
import {LoggedUserService} from '../../services/logged-user.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotPasswordComponent ],
      imports: [
        AppMaterialModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        HttpClientTestingModule
      ],
      providers: [
        ApiCallsService,
        LoggedUserService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
