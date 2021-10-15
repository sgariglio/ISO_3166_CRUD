import { Component, OnInit } from '@angular/core';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
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

  // usuario = ""
  // password = ""

  //TESTER
  email = "test@domain.com"
  password = "abc123"

  users: IUser[] = [];

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private _apiLogin: ApiLoginService, private _router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.runningMode();
  }


  runningMode() {
    if (Server_Config.runningOnProd) {
      this.email = ""
      this.password = ""
    } else {
      this.doLogin()
    }
  }

  doLogin() {

    if (this.email.length > 0 && this.password.length > 0) {
      let userLogin = new User(this.email, this.password)
      let result = this._apiLogin.getLogin(userLogin).subscribe(res => {

        let userSuccess = res.data as IUser

        if (res.success) {
          this._apiLogin.setUserLogged(userSuccess)
          this.loginSuccess()
        } else {
          this.openSnackBar("Login", "Incorrecto")
          this.password = ""
        }
      })
      console.log(result);
    } else {
      //this.openSnackBar("Completar los campos", "ERROR")
    }

    setTimeout(() => {
      this.loginInProgress = false
    }, 5000)
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
