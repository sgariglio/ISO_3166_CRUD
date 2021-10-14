import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Country } from 'src/app/main/interfaces/classes/country';
import { ICountry } from 'src/app/main/interfaces/i-country';
import { UIMain } from 'src/app/main/template-main/class/ui-main';
import { LocalStoreTools } from 'src/app/shared/tools/local-store-tools';

@Component({
  selector: 'app-country-build',
  templateUrl: './country-build.component.html',
  styleUrls: ['./country-build.component.scss']
})
export class CountryBuildComponent extends UIMain implements OnInit {

  @Input() countryToEdit?= {} as ICountry
  @Input() countryList?: ICountry[] = []
  @Input() onlyView = false
  @Output() requestCloseEvent = new EventEmitter<boolean>()
  flagSavedSuccess = false

  mainFormGroup = new FormGroup({
    nameFormControl: new FormControl(Validators.required),
    alphaCodeFormControl: new FormControl(Validators.required),
    numericCodeFormControl: new FormControl(Validators.required),
  })

  countryId = 0;
  country = {} as ICountry

  //FLAGS
  //deleted
  flagRequestDeleteScreen = false
  flagProviderWasDeleted = false
  //sub screen
  flagDivisionBuildRequest: boolean = false;

  constructor(
    public router: Router,
    _snackBar: MatSnackBar,
  ) {
    super(router, _snackBar)
  }

  ngOnInit(): void {
    if (this.countryToEdit != undefined) {
      this.country = this.countryToEdit
      this.patchValues()
    }
    if (this.onlyView) {
      console.log("disabled")
      this.mainFormGroup.disable()
    }
  }

  patchValues() {
    this.mainFormGroup.controls['nameFormControl'].patchValue(this.country.name)
    this.mainFormGroup.controls['alphaCodeFormControl'].patchValue(this.country.alpha2Code)
    this.mainFormGroup.controls['numericCodeFormControl'].patchValue(this.country.numericCode)
    if (this.countryToEdit != undefined) {
      this.countryId = this.countryToEdit?.id
    }
  }

  prefixBuild() { }


  save() {
    if (!this.mainFormGroup.valid) {
      return
    }
    let name = this.mainFormGroup.controls['nameFormControl'].value
    let alphaCode = this.mainFormGroup.controls['alphaCodeFormControl'].value
    let numericCode = this.mainFormGroup.controls['numericCodeFormControl'].value

    this.countryId = LocalStoreTools.randomId()
    this.country = new Country(this.countryId, name, alphaCode, numericCode)
    LocalStoreTools.saveList("countries", this.country)

    this.flagSavedSuccess = true
    this.openSnackBar("Formulario guardado", "exito")

    // this._api.usuariosAddUpdate(country).subscribe(res => {
    //   if (res.exito) {
    //     this.openSnackBar("Formulario guardado", "exito")
    //     this.gotoBack()
    //   } else {
    //     this.openSnackBar(res.data, "ERROR")
    //   }
    // })
  }

  deleteThisProvider() {
    if (this.country.id == undefined) {
      return
    }
    if (this.country?.id < 1) {
      return
    }
    // this._api.usuarioDelete(this.country.id).subscribe(res => {
    //   if (res.exito) {
    //     this.flagProviderWasDeleted = true
    //   }
    // })
  }

  //SUBDIVISION
  gotoDivisionBuild() { this.flagDivisionBuildRequest = true }
  divisionRequestClose() { this.flagDivisionBuildRequest = false }

  formReset() {
    this.flagSavedSuccess = false
    this.mainFormGroup.reset()
  }

  //GOTO
  gotoSubdivisiones() { }
  gotoBack() {
    this.requestCloseEvent.emit(true);
  }

}
