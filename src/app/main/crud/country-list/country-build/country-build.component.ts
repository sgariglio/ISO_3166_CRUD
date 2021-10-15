import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Country } from 'src/app/main/interfaces/classes/country';
import { ICountry } from 'src/app/main/interfaces/i-country';
import { ISubdivision } from 'src/app/main/interfaces/i-subdivision';
import { UIMain } from 'src/app/main/template-main/class/ui-main';
import { ApiCountryService } from 'src/app/services/api-country.service';
import { ApiLoginService } from 'src/app/services/api-login.service';
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

  //SUBDIVISION
  divisionReference?= {} as ISubdivision

  mainFormGroup = new FormGroup({
    nameFormControl: new FormControl(Validators.required),
    alphaCodeFormControl: new FormControl(Validators.pattern('[a-zA-Z0]*'), Validators.required),
    numericCodeFormControl: new FormControl(Validators.required),
  })

  countryId = 0;
  country = {} as ICountry

  //FLAGS
  flagRequestDeleteScreen = false
  flagProviderWasDeleted = false
  flagDivisionScreen: boolean = false
  flagSavedSuccess = false

  constructor(
    private _apiCountry: ApiCountryService,
    _apiLogin: ApiLoginService,
    public router: Router,
    _snackBar: MatSnackBar,
  ) {
    super(_apiLogin, router, _snackBar)
  }

  ngOnInit(): void {
    if (this.countryToEdit != undefined) {
      this.country = this.countryToEdit
      this.fillFields()
    }
    if (this.onlyView) {
      this.mainFormGroup.disable()
    }
  }

  fillFields() {
    this.mainFormGroup.controls['nameFormControl'].patchValue(this.country.name)
    this.mainFormGroup.controls['alphaCodeFormControl'].patchValue(this.country.alpha2Code)
    this.mainFormGroup.controls['numericCodeFormControl'].patchValue(this.country.numericCode)
    if (this.countryToEdit != undefined) {
      this.countryId = this.countryToEdit?.id
    }
  }


  save() {
    if (!this.mainFormGroup.valid) {
      return
    }
    let name = this.mainFormGroup.controls['nameFormControl'].value
    let alphaCode = this.mainFormGroup.controls['alphaCodeFormControl'].value
    let numericCode = this.mainFormGroup.controls['numericCodeFormControl'].value

    this.country.name = name
    this.country.alpha2Code = alphaCode
    this.country.numericCode = numericCode

    if (this.duplicatedValidation() == true) {
      this.serverSave()
    } else {
      this.openSnackBar("Nombre o códigos ya ingresados", "ERROR")
    }
  }

  serverSave() {
    this._apiCountry.addUpdate(this.country).subscribe(res => {
      if (res.success) {
        this.flagSavedSuccess = true
        this.openSnackBar("Formulario guardado", "exito")
        this.gotoBack()
      } else {
        this.flagSavedSuccess = false
        this.openSnackBar(res.data, "ERROR")
      }
    })
  }

  deleteRequest() {
    if (this.country.id == undefined) {
      return
    }
    if (this.country?.id < 1) {
      return
    }
    this._apiCountry.delete(this.country.id).subscribe(res => {
      if (res.success) {
        this.flagProviderWasDeleted = true
      }
    })
  }

  //SUBDIVISION
  gotoDivisionBuild() { this.flagDivisionScreen = true }
  divisionRequestClose(divisionsUpdated: ISubdivision[]) {
    this.country.subdivisions = divisionsUpdated
    this.flagDivisionScreen = false
  }
  requestOpenDisivion(division: ISubdivision) {
    console.log("llega");
    this.divisionReference = division
    this.flagDivisionScreen = true
  }

  //HELPER FUNCTIONS
  duplicatedValidation(): boolean {
    let response = true;
    let duplicated: ICountry[]
    if (this.country.id == 0) {
      duplicated = this.countryList!.filter(f => (f.name.toLowerCase() == this.country.name.toLowerCase() || f.numericCode == this.country.numericCode || f.alpha2Code.toLowerCase() == this.country.alpha2Code.toLowerCase()))
    } else {
      duplicated = this.countryList!.filter(f => (f.name.toLowerCase() == this.country.name.toLowerCase() || f.numericCode == this.country.numericCode || f.alpha2Code.toLowerCase() == this.country.alpha2Code.toLowerCase()) && f.id != this.country.id)
    }
    if (!duplicated) { duplicated = [] }
    if (duplicated.length > 0) {
      response = false;
    }
    return response;
  }

  formReset() {
    this.flagSavedSuccess = false
    this.mainFormGroup.reset()
  }

  gotoBack() {
    this.requestCloseEvent.emit(true);
  }

}


