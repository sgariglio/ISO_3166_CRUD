import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { IUser } from "src/app/login/Interfaces/i-user";
import { ApiLoginService } from "src/app/services/api-login.service";


export class UIMain {

  constructor(
    private _login: ApiLoginService,
    public _router: Router,
    private _snackBar: MatSnackBar) {
  }

  getLoggedUser() {
    return this._login.getLoggedUser();
  }

  userLoggedCheck() {
    if (this.getLoggedUser()?.token == null) {
      this._router.navigate([""])
    }
  }

  logOut() {
    this._login.setUserLogged({} as IUser)
  }

  openSnackBar(msg: string, msgHighlight: string) {
    let ref = this._snackBar.open(msg, msgHighlight, {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
    ref._dismissAfter(4000);
  }
}
