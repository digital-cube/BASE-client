import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {ResetPasswordComponent} from './reset-password.component';
import {AppMaterialModule} from '../../modules/app-material.module';
import {ApiCallsService} from '../../services/api-calls.service';
import {LoggedUserService} from '../../services/logged-user.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResetPasswordComponent],
      imports: [
        RouterTestingModule,
        AppMaterialModule,
        FormsModule,
        ReactiveFormsModule,
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
    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
