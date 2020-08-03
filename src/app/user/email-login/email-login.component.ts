import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-email-login',
  templateUrl: './email-login.component.html',
  styleUrls: ['./email-login.component.scss']
})
export class EmailLoginComponent implements OnInit {
  formGroup: FormGroup;

  type: 'login' | 'signup' | 'reset' = 'signup';
  loading = false;

  serverMessage: string;

  constructor(private firebaseAuth: AngularFireAuth, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', null]
    });
  }

  changeType(type: 'login' | 'signup' | 'reset'): void {
    this.type = type;
  }

  get isLogin(): boolean {
    return this.type === 'login';
  }

  get isSignup(): boolean {
    return this.type === 'signup';
  }

  get isPasswordReset(): boolean {
    return this.type === 'reset';
  }

  get email(): AbstractControl {
    return this.formGroup.get('email');
  }

  get password(): AbstractControl {
    return this.formGroup.get('password');
  }

  get passwordConfirm(): AbstractControl {
    return this.formGroup.get('passwordConfirm');
  }

  get passwordDoesMatch(): boolean {
    if (this.type !== 'signup') {
      return true;
    } else {
      return this.password.value === this.passwordConfirm.value;
    }
  }

  async onSubmit(): Promise<void> {
    this.loading = true;
    console.log('yo')
    const email = this.email.value;
    const password = this.password.value;

    try {
      if (this.isLogin) {
        await this.firebaseAuth.signInWithEmailAndPassword(email, password);
      }
      if (this.isSignup) {
        await this.firebaseAuth.createUserWithEmailAndPassword(email, password);
      }
      if (this.isPasswordReset) {
        await this.firebaseAuth.sendPasswordResetEmail(email);
        this.serverMessage = 'Check your email';
      }
    } catch (err) {
      this.serverMessage = err;
    }

    this.loading = false;
  }
}
