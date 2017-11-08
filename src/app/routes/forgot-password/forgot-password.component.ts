import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {ApiCallsService} from '../../services/api-calls.service';
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotForm = new FormGroup({
    'username': new FormControl('', [Validators.required, Validators.email])
  });
  apiError: string;

  constructor(private apiSvc: ApiCallsService, private router: Router, private sb: MatSnackBar) { }

  ngOnInit() {
  }

  forgot() {
    console.log('FORGOT', this.forgotForm.value);
    delete this.apiError;
    this.apiSvc.svcPut('/user/forgot', this.forgotForm.value).subscribe(
      r => {
        const sbRef = this.sb.open('Check mail! We sent you the link for reset password', null,
          {duration: 2000});
        sbRef.afterDismissed().subscribe( () => {
            this.router.navigate(['/login']);
        });
      },
      err => {
        console.log('Error save forgot password', err);
        this.apiError = 'Error save request';
      }
    );
  }

}
