import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { logout } from './features/auth/state/auth.actions';
import { selectIsAuthenticated } from './features/auth/state/auth.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isAuthenticated$ = this.store.select(selectIsAuthenticated);
  
  constructor(private store: Store) {}
  
  logout(): void {
    this.store.dispatch(logout());
  }
}