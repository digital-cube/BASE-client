import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

import {ApiCallsService} from '../../services/api-calls.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {

  resetForm = new FormGroup({
    'new_password': new FormControl('', Validators.required),
    'repeat-password': new FormControl('', Validators.required)
  });
  apiError: string;
  apiHash: string;

  paramsSubscription: Subscription;

  constructor(private apiSvc: ApiCallsService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.paramsSubscription = this.activatedRoute.params.subscribe(
      _params => {
        this.apiHash = _params.hash;
      }
    );
  }

  ngOnDestroy() {
    if (this.paramsSubscription) {
      this.paramsSubscription.unsubscribe();
    }
  }

  reset() {
    console.log('RSET);', this.resetForm.value, this.apiHash);
    if (this.resetForm.get('new_password').value !== this.resetForm.get('repeat-password').value) {
      this.apiError = 'Passwords do not match';
      return;
    }

    delete this.apiError;

    this.apiSvc.svcPost(`/user/password/change/${this.apiHash}`, this.resetForm.value).subscribe(
      r => {
        this.router.navigate(['/login']);
      },
      err => {
        console.log('Error reset password', err);
        this.apiError = 'Error reset password';
      }
    );

  }

}
