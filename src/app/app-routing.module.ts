import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CountryListComponent } from './main/crud/country-list/country-list.component';
import { TemplateOperacionesComponent } from './main/template-main/template-main.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'main', component: TemplateOperacionesComponent, children: [{ path: '', component: CountryListComponent }] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
