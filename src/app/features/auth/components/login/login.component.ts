import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { login, logout } from '../../state/auth.actions';
import { selectIsAuthenticated } from '../../state/auth.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  isAuthenticated$ = this.store.select(selectIsAuthenticated);

  constructor(private fb: FormBuilder, private store: Store) {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      if (email) {
        this.store.dispatch(login({ email }));
      }
    }
  }

  logout(): void {
    this.store.dispatch(logout());
  }
}