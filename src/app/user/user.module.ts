import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserRoutingModule} from './user-routing.module';
import {LoginPageComponent} from './login-page/login-page.component';
import {GoogleSigninDirective} from './google-signin.directive';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {ReactiveFormsModule} from '@angular/forms';
import { EmailLoginComponent } from './email-login/email-login.component';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [LoginPageComponent, GoogleSigninDirective, EmailLoginComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [AngularFireAuthModule]
})
export class UserModule {
}
