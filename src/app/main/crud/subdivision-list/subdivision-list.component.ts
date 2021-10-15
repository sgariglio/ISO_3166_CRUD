import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiLoginService } from 'src/app/services/api-login.service';
import { LocalStoreTools } from 'src/app/shared/tools/local-store-tools';
import { Country } from '../../interfaces/classes/country';
import { ICountry } from '../../interfaces/i-country';
import { ISubdivision } from '../../interfaces/i-subdivision';
import { UIMain } from '../../template-main/class/ui-main';

@Component({
  selector: 'app-subdivision-list',
  templateUrl: './subdivision-list.component.html',
  styleUrls: ['./subdivision-list.component.scss']
})
export class SubdivisionListComponent extends UIMain implements OnInit, OnChanges {

  @Input() divisions?: ISubdivision[] = []
  @Output() requestEdit = new EventEmitter<ISubdivision>();
  @Output() requestView = new EventEmitter<ISubdivision>();

  //TABLE
  @ViewChild(MatSort) sort: MatSort | undefined;
  displayedColumns: string[] = ['name', 'actions'];
  dataSourceItems: MatTableDataSource<ISubdivision> = new MatTableDataSource;
  selection = new SelectionModel<ISubdivision>(false, []);

  divisionEdit?= {} as ISubdivision
  requestNewProvider = false
  onlyView = true

  ngSearch = ""
  countries: ISubdivision[] = [];

  constructor(
    _apiLogin: ApiLoginService,
    public router: Router,
    _snackBar: MatSnackBar,
  ) {
    super(_apiLogin, router, _snackBar)
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.divisions);

    if (this.divisions) {
      this.dataSourceItems.data = this.divisions
    } else {
      this.dataSourceItems.data = []
    }
  }

  ngAfterViewInit() {
    this.dataSourceItems.sort = this.sort!;
  }
  ngOnInit(): void {

  }

  // tableLoad() {
  //   this.countries = LocalStoreTools.readList("subdivision", Country)
  //   this.dataSourceItems.data = this.countries;
  //   // this._apISubdivision.getClientList(this.ownerId).subscribe(res => {
  //   //   if (res.exito) {
  //   //     this.clientes = res.data
  //   //     this.dataSourceItems.data = this.clientes;
  //   //     this.searchChange()
  //   //   }
  //   // })
  // }


  getRecord(division: ISubdivision) {
    this.selection.toggle(division);
    this.divisionEdit = division
  }

  edit(division: ISubdivision) {
    this.requestEdit.emit(division)
  }

  view(division: ISubdivision) {
    this.requestEdit.emit(division)
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
    this.divisionEdit = {} as ISubdivision
    this.selection.clear()
    this.requestNewProvider = false
  }

  gotoBack() {
    this._router.navigate(['lavado'])
  }
}
function Ouput() {
  throw new Error('Function not implemented.');
}

