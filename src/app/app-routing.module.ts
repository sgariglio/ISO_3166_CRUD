import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryBuildComponent } from './main/crud/country-list/country-build/country-build.component';
import { CountryListComponent } from './main/crud/country-list/country-list.component';
import { TemplateOperacionesComponent } from './main/template-main/template-main.component';


const routes: Routes = [
  { path: '', component: TemplateOperacionesComponent, children: [{ path: '', component: CountryListComponent }] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
