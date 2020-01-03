import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InputQueryFormComponent } from './_components/input-query-form/input-query-form.component';

const routes: Routes = [{
  path: '',
  component: InputQueryFormComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
