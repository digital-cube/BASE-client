import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';

import { DashboardComponent } from './dashboard.component';
import {LoggedUserService} from '../../../services/logged-user.service';
import {AppMaterialModule} from '../../../modules/app-material.module';
import {ApiCallsService} from '../../../services/api-calls.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      imports: [
        RouterTestingModule,
        AppMaterialModule,
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
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
