import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subdivision } from 'src/app/main/interfaces/classes/subdivision';
import { ICountry } from 'src/app/main/interfaces/i-country';
import { ISubdivision } from 'src/app/main/interfaces/i-subdivision';
import { UIMain } from 'src/app/main/template-main/class/ui-main';
import { ApiLoginService } from 'src/app/services/api-login.service';
import { LocalStoreTools } from 'src/app/shared/tools/local-store-tools';

@Component({
  selector: 'app-subdivision-build',
  templateUrl: './subdivision-build.component.html',
  styleUrls: ['./subdivision-build.component.scss']
})
export class SubdivisionBuildComponent extends UIMain implements OnInit {

  @Input() countryReferenceId = 0
  @Input() divisions: ISubdivision[] = []
  @Input() divisionToEdit?= {} as ISubdivision
  @Input() onlyView = false
  @Output() requestCloseEvent = new EventEmitter<ISubdivision[]>()


  mainFormGroup = new FormGroup({
    nameFormControl: new FormControl(Validators.required),
    historyFormControl: new FormControl(),
    geographyFormControl: new FormControl(),
    otherFormControl: new FormControl(),
  })


  divisionId = 0;
  division = {} as ISubdivision

  //DELETED
  flagRequestDeleteScreen = false
  flagProviderWasDeleted = false

  constructor(
    _apiLogin: ApiLoginService,
    public router: Router,
    _snackBar: MatSnackBar,
  ) {
    super(_apiLogin, router, _snackBar)
  }

  ngOnInit(): void {
    if (this.divisionToEdit != undefined) {
      this.division = this.divisionToEdit
      this.patchValues()
    }
  }

  patchValues() {
    this.mainFormGroup.controls['nameFormControl'].patchValue(this.division.name)
    this.mainFormGroup.controls['historyFormControl'].patchValue(this.division.history)
    this.mainFormGroup.controls['geographyFormControl'].patchValue(this.division.geography)
    this.mainFormGroup.controls['otherFormControl'].patchValue(this.division.other)
    if (this.divisionToEdit != undefined) {
      this.divisionId = this.divisionToEdit?.id
    }
  }

  save() {
    if (!this.mainFormGroup.valid) { return }
    let name: string = this.mainFormGroup.controls['nameFormControl'].value
    let history: string = this.mainFormGroup.controls['historyFormControl'].value
    let geography: string = this.mainFormGroup.controls['geographyFormControl'].value
    let other: string = this.mainFormGroup.controls['otherFormControl'].value

    this.division = new Subdivision(this.divisionId, this.countryReferenceId, name, history, geography, other)

    if (!this.divisions) { this.divisions = [] }
    this.divisions.push(this.division)
    this.requestCloseEvent.emit(this.divisions)
  }

  deleteDivision() {
    this.divisions = this.divisions.filter(f => f != this.division)
    this.requestCloseEvent.emit(this.divisions)
  }


  gotoBack() {
    this.requestCloseEvent.emit(this.divisions);
  }

}
