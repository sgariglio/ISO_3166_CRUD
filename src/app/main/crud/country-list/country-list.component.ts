import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiLoginService } from 'src/app/services/api-login.service';
import { LocalStoreTools } from 'src/app/shared/tools/local-store-tools';
import { Country } from '../../interfaces/classes/country';
import { ICountry } from '../../interfaces/i-country';
import { UIMain } from '../../template-main/class/ui-main';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss']
})
export class CountryListComponent extends UIMain implements OnInit, AfterViewInit {

  //TABLE
  @ViewChild(MatSort) sort: MatSort | undefined;
  displayedColumns: string[] = ['name', 'alpha2Code', 'numericCode', 'actions'];
  dataSourceItems: MatTableDataSource<ICountry> = new MatTableDataSource;
  selection = new SelectionModel<ICountry>(false, []);

  countryEdit?= {} as ICountry
  requestNewProvider = false
  onlyView = true

  ngSearch = ""
  countries: ICountry[] = [];

  constructor(
    _apiLogin: ApiLoginService,
    public router: Router,
    _snackBar: MatSnackBar,
  ) {
    super(_apiLogin, router, _snackBar)
  }

  ngAfterViewInit() {
    this.dataSourceItems.sort = this.sort!;
  }
  ngOnInit(): void {
    this.userLoggedCheck()
    this.tableLoad()

    this.countryEdit = this.countries[0]
    this.selection.toggle(this.countryEdit);
    this.onlyView = false
  }

  tableLoad() {
    this.countries = LocalStoreTools.readList("countries", Country)
    this.dataSourceItems.data = this.countries;

    // this._apICountry.getClientList(this.ownerId).subscribe(res => {
    //   if (res.exito) {
    //     this.clientes = res.data
    //     this.dataSourceItems.data = this.clientes;
    //     this.searchChange()
    //   }
    // })
  }


  getRecord(country: ICountry) {
    this.selection.toggle(country);
    this.countryEdit = country
  }

  edit(country: ICountry) {
    this.selection.toggle(country);
    this.countryEdit = country
    this.onlyView = false
  }

  view(country: ICountry) {
    this.selection.toggle(country);
    this.countryEdit = country
    this.onlyView = true
  }

  goto_New() {
    this.onlyView = false
    this.requestNewProvider = true
  }

  searchChange() {
    this.dataSourceItems.data = this.countries?.filter(f =>
    (
      f.name?.toLowerCase().indexOf(this.ngSearch) >= 0
      ||
      f.alpha2Code.toLowerCase().indexOf(this.ngSearch) >= 0
      ||
      f.numericCode.toLowerCase().indexOf(this.ngSearch) >= 0
    ))
  }

  requestCloseChild() {
    this.countryEdit = {} as ICountry
    this.selection.clear()
    this.requestNewProvider = false
    this.tableLoad()
  }

  gotoBack() {
    this._router.navigate(['lavado'])
  }
}
