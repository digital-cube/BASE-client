import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { SignupComponent } from './signup.component';
import {AppMaterialModule} from '../../modules/app-material.module';
import {LookupService} from '../../services/lookup.service';
import {ApiCallsService} from '../../services/api-calls.service';
import {LoggedUserService} from '../../services/logged-user.service';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        AppMaterialModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        LookupService,
        ApiCallsService,
        LoggedUserService,
      ],
      declarations: [ SignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create signup', () => {
    expect(component).toBeTruthy();
  });
});
