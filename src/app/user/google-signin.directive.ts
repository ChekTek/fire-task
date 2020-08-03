import {Directive, HostListener} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase';

@Directive({
  selector: '[appGoogleSignin]'
})
export class GoogleSigninDirective {

  constructor(private angularFireAuth: AngularFireAuth) {
  }

  @HostListener('click')
  onClick(): void {
    this.angularFireAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
}
