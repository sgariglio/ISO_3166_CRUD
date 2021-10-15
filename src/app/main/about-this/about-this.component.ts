import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IUser } from 'src/app/login/Interfaces/i-user';
import { ApiLoginService } from 'src/app/services/api-login.service';
import { UIMain } from '../template-main/class/ui-main';

@Component({
  selector: 'app-about-this',
  templateUrl: './about-this.component.html',
  styleUrls: ['./about-this.component.scss']
})
export class AboutThisComponent extends UIMain implements OnInit {

  user = {} as IUser

  constructor(
    _apiLogin: ApiLoginService,
    public router: Router,
    _snackBar: MatSnackBar,
  ) {
    super(_apiLogin, router, _snackBar)
  }

  ngOnInit(): void {
    this.userLoggedCheck();
    this.user = this.getLoggedUser()
  }

}

