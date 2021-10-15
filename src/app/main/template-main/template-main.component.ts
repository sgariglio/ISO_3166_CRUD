import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiLoginService } from 'src/app/services/api-login.service';
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
    _login: ApiLoginService,
    public router: Router,
    _snackBar: MatSnackBar,
  ) {
    super(_login, router, _snackBar)
  }

  ngOnInit(): void {
    this.setUserCaption()
  }

  menuToggle() {

  }

  gotoAbout() {
    this._router.navigate(['aboutThis'])
  }

  doLogout() {
    this.logOut()
    this._router.navigate([''])
  }

  //REDIRECTS
  gotoCountries() {
    this._router.navigate(['main'])
  }

  setUserCaption() {
    //No users for this TSC app.
    this.usuarioCaption = "Sebastián Gariglio"
  }

}
