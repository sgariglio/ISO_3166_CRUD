import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";


export class UIMain {

  /*
  constructor(
    login: ApiPatentesService,
    public router: Router,
    _snackBar: MatSnackBar,
    ) {
    super(login, router,_snackBar)
  }
  */

  constructor(
    public _router: Router,
    private _snackBar: MatSnackBar) {
  }

  logOut() {
    //ToDO
  }

  openSnackBar(msg: string, msgHighlight: string) {
    let ref = this._snackBar.open(msg, msgHighlight, {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
    ref._dismissAfter(3000);
  }
}
