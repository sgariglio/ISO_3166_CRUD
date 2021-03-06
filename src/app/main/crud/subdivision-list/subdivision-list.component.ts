import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiLoginService } from 'src/app/services/api-login.service';
import { ISubdivision } from '../../interfaces/i-subdivision';
import { UIMain } from '../../template-main/class/ui-main';

@Component({
  selector: 'app-subdivision-list',
  templateUrl: './subdivision-list.component.html',
  styleUrls: ['./subdivision-list.component.scss']
})
export class SubdivisionListComponent extends UIMain implements OnInit, OnChanges {

  @Input() onlyView = false
  @Input() divisions?: ISubdivision[] = []
  @Output() requestOpenEvent = new EventEmitter<ISubdivision>();

  //TABLE
  @ViewChild(MatSort) sort: MatSort | undefined;
  displayedColumns: string[] = ['name', 'actions'];
  dataSourceItems: MatTableDataSource<ISubdivision> = new MatTableDataSource;
  selection = new SelectionModel<ISubdivision>(false, []);

  divisionEdit?= {} as ISubdivision
  requestNewProvider = false

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

  getRecord(division: ISubdivision) {
    this.selection.toggle(division);
    this.divisionEdit = division
  }

  requestOpen(division: ISubdivision) {
    this.requestOpenEvent.emit(division)
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


