import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UIMain } from './class/ui-main';

@Component({
  selector: 'app-template-main',
  templateUrl: './template-main.component.html',
  styleUrls: ['./template-main.component.scss']
})
export class TemplateOperacionesComponent extends UIMain implements OnInit {

  showFiller = true;
  userLoggedName = ""
  ownerId = 0;
  usuarioCaption: string = "";

  constructor(
    public router: Router,
    _snackBar: MatSnackBar,
  ) {
    super(router, _snackBar)
  }

  ngOnInit(): void {
    this.setUserCaption()
  }

  gotoHome() {
    this._router.navigate(['/ihome'])
  }

  doLogout() {
    this.logOut()
    this._router.navigate(['login'])
  }

  //REDIRECTS
  gotoCountries() {
    this._router.navigate(['alertsummary'])
  }

  setUserCaption() {
    //No users for this app.
    this.usuarioCaption = "TSC"
  }

}
