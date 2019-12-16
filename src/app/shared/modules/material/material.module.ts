import { NgModule } from '@angular/core';

import {
  MatGridListModule,
  MatCardModule,
  MatButtonModule,
  MatDialogModule,
  MatInputModule
} from '@angular/material';

const modules = [
  MatGridListModule,
  MatCardModule,
  MatButtonModule,
  MatDialogModule,
  MatInputModule
];

@NgModule({
  declarations: [],
  imports: [...modules],
  exports: [...modules],
})
export class MaterialModule { }
