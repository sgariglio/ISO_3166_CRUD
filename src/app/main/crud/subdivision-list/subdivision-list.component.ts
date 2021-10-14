import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { LocalStoreTools } from 'src/app/shared/tools/local-store-tools';
import { Country } from '../../interfaces/classes/country';
import { ISubdivision } from '../../interfaces/i-subdivision';
import { UIMain } from '../../template-main/class/ui-main';

@Component({
  selector: 'app-subdivision-list',
  templateUrl: './subdivision-list.component.html',
  styleUrls: ['./subdivision-list.component.scss']
})
export class SubdivisionListComponent extends UIMain implements OnInit {

  //TABLE
  @ViewChild(MatSort) sort: MatSort | undefined;
  displayedColumns: string[] = ['name'];
  dataSourceItems: MatTableDataSource<ISubdivision> = new MatTableDataSource;
  selection = new SelectionModel<ISubdivision>(false, []);

  countryEdit?= {} as ISubdivision
  requestNewProvider = false
  onlyView = true

  ngSearch = ""
  countries: ISubdivision[] = [];

  constructor(
    public router: Router,
    _snackBar: MatSnackBar,
  ) {
    super(router, _snackBar)
  }

  ngAfterViewInit() {
    this.dataSourceItems.sort = this.sort!;
  }
  ngOnInit(): void {
    this.tableLoad()
  }

  tableLoad() {
    this.countries = LocalStoreTools.readList("countries", Country)
    this.dataSourceItems.data = this.countries;
    // this._apISubdivision.getClientList(this.ownerId).subscribe(res => {
    //   if (res.exito) {
    //     this.clientes = res.data
    //     this.dataSourceItems.data = this.clientes;
    //     this.searchChange()
    //   }
    // })
  }


  getRecord(country: ISubdivision) {
    this.selection.toggle(country);
    this.countryEdit = country
  }

  edit(country: ISubdivision) {
    this.selection.toggle(country);
    this.countryEdit = country
    this.onlyView = false
  }

  view(country: ISubdivision) {
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
    ))
  }

  requestCloseChild() {
    this.countryEdit = {} as ISubdivision
    this.selection.clear()
    this.requestNewProvider = false
    this.tableLoad()
  }

  gotoBack() {
    this._router.navigate(['lavado'])
  }
}
