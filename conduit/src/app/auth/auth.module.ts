import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared';

import { AuthComponent } from './auth.component';

const authRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'login',
    component: AuthComponent
  },
  {
    path: 'register',
    component: AuthComponent
  }
]);

@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    SharedModule,
    authRouting
  ],
  exports: [],
  providers: [],
})
export class AuthModule {}
