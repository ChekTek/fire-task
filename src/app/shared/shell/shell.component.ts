import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map, shareReplay} from 'rxjs/operators';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent {

  isMobile$: Observable<boolean> = this.breakPointObserver.observe([Breakpoints.Handset])
    .pipe(map(result => result.matches), shareReplay());

  constructor(private readonly breakPointObserver: BreakpointObserver) {
  }

}
