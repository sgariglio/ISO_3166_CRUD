import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subdivision } from 'src/app/main/interfaces/classes/subdivision';
import { ICountry } from 'src/app/main/interfaces/i-country';
import { ISubdivision } from 'src/app/main/interfaces/i-subdivision';
import { UIMain } from 'src/app/main/template-main/class/ui-main';
import { LocalStoreTools } from 'src/app/shared/tools/local-store-tools';

@Component({
  selector: 'app-subdivision-build',
  templateUrl: './subdivision-build.component.html',
  styleUrls: ['./subdivision-build.component.scss']
})
export class SubdivisionBuildComponent extends UIMain implements OnInit {

  @Input() countryReference?= {} as ICountry
  @Input() divisionToEdit?= {} as ISubdivision
  @Input() onlyView = false
  @Output() requestCloseEvent = new EventEmitter()


  mainFormGroup = new FormGroup({
    nameFormControl: new FormControl(Validators.required),
    historyFormControl: new FormControl(),
    geographyCodeFormControl: new FormControl(),
    otherCodeFormControl: new FormControl(),
  })


  divisionId = 0;
  division = {} as ISubdivision

  //DELETED
  flagRequestDeleteScreen = false
  flagProviderWasDeleted = false

  constructor(
    public router: Router,
    _snackBar: MatSnackBar,
  ) {
    super(router, _snackBar)
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
    this.mainFormGroup.controls['geographyCodeFormControl'].patchValue(this.division.geography)
    this.mainFormGroup.controls['otherCodeFormControl'].patchValue(this.division.other)
    if (this.divisionToEdit != undefined) {
      this.divisionId = this.divisionToEdit?.id
    }
  }

  save() {
    let name: string = this.mainFormGroup.controls['nameFormControl'].value
    let history: string = this.mainFormGroup.controls['historyFormControl'].value
    let geography: string = this.mainFormGroup.controls['geographyCodeFormControl'].value
    let other: string = this.mainFormGroup.controls['otherCodeFormControl'].value

    this.division = new Subdivision(this.divisionId, this.countryReference!.id, name, history, geography, other)
    LocalStoreTools.saveList("subdivision", this.division)
    this.requestCloseEvent.emit()
    // this._api.usuariosAddUpdate(division).subscribe(res => {
    //   if (res.exito) {
    //     this.openSnackBar("Formulario guardado", "exito")
    //     this.gotoBack()
    //   } else {
    //     this.openSnackBar(res.data, "ERROR")
    //   }
    // })
  }

  deleteThisProvider() {
    if (this.division.id == undefined) {
      return
    }
    if (this.division?.id < 1) {
      return
    }
    // this._api.usuarioDelete(this.division.id).subscribe(res => {
    //   if (res.exito) {
    //     this.flagProviderWasDeleted = true
    //   }
    // })
  }


  gotoBack() {
    this.requestCloseEvent.emit(true);
  }

}
