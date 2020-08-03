import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SnackService {

  constructor(private snackBar: MatSnackBar, private router: Router) {
  }

  authError(): void {
    this.snackBar.open('You must be logged in!', 'OK', {
      duration: 5000
    })
      .onAction()
      .pipe(tap(_ => {
        this.router.navigate(['/login']);
      }))
      .subscribe();
  }
}
