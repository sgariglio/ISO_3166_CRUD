import { Component, OnInit } from '@angular/core';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiCountryService } from '../services/api-country.service';
import { ApiLoginService } from '../services/api-login.service';
import { EncryptTools } from '../shared/tools/encrypt_tools';
import { Server_Config } from '../shared/tools/server-root';
import { User } from './Interfaces/Classes/user';
import { IUser } from './Interfaces/i-user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginInProgress = false

  email = ""
  password = ""

  //TESTER
  // email = "test@domain.com"
  // password = "abc123"

  users: IUser[] = [];

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private _apiCountry: ApiCountryService,
    private _apiLogin: ApiLoginService,
    private _router: Router,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  doLogin() {
    if (this.email.length > 0 && this.password.length > 0) {
      let userLogin = new User(this.email, this.password)

      this._apiLogin.getLogin(userLogin).subscribe(res => {
        let userSuccess = res.data as IUser
        if (res.success) {
          this._apiLogin.setUserLogged(userSuccess)
          this.loginSuccess()
        } else {
          this.openSnackBar("Login", "Incorrecto")
          this.password = ""
        }
      })
    }
  }

  openSnackBar(msg: string, highlight: string) {
    let ref = this._snackBar.open(msg, highlight, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
    ref._dismissAfter(3000)
  }

  loginSuccess() {
    this._router.navigate(['main'])
  }
}
