import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {LayoutModule} from '@angular/cdk/layout';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {ShellComponent} from './shell/shell.component';
import {RouterModule} from '@angular/router';

const components = [ShellComponent];

const materialModules = [
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatMenuModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatSnackBarModule
];

const allSharedModules = [
  CommonModule,
  LayoutModule,
  ...materialModules
];

@NgModule({
  declarations: [...components],
  imports: [
    ...allSharedModules,
    RouterModule,
  ],
  exports: [
    ...allSharedModules,
    ...components
  ]
})
export class SharedModule {
}
