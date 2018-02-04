import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Errors, UserService } from '../shared';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {
  authType: String = '';
  title: String = '';
  errors: Errors = new Errors();
  isSubmitting = false;
  authForm: FormGroup;

  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.authForm = this.fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.url.subscribe(data => {
      this.authType = data[data.length - 1].path;
      this.title = this.authType === 'login' ? 'Sign in' : 'Sign up';

      if (this.authType === 'register') {
        this.authForm.addControl('username', new FormControl('', Validators.required));
      }
    });
  }

  submitForm(): void {
    this.isSubmitting = true;
    this.errors = new Errors();

    const credentials = this.authForm.value;
    this.userService.attemptAuth(this.authType, credentials)
      .subscribe(
        data => this.router.navigateByUrl('/'),
        error => {
          this.errors = error;
          this.isSubmitting = false;
        }
      );
  }
}
