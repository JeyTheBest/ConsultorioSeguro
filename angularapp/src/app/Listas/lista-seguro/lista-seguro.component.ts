
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';


import { Seguro } from 'src/app/Interfaces/seguro';
import { SeguroService } from 'src/app/Services/seguro.service';

import { Afiliado } from 'src/app/Interfaces/afiliado';
import { AfiliadoService } from 'src/app/Services/afiliado.service';

import { MatSnackBar } from '@angular/material/snack-bar';


import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { DialogAddEditComponent } from "src/app/Dialogs/dialog-add-edit/dialog-add-edit.component";
import { DialogoDeleteComponent } from "src/app/Dialogs/dialogo-delete/dialogo-delete.component";
import { SeguroDialogoComponent } from 'src/app/Dialogs/seguro-dialogo/seguro-dialogo.component';

@Component({
  selector: 'app-lista-seguro',
  templateUrl: './lista-seguro.component.html',
  styleUrls: ['./lista-seguro.component.css']
})

export class ListaSeguroComponent implements OnInit {

  displayedColumns: string[] = ['NombreSeguro', 'CodigoSeguro', 'SumaAseguradora', 'Prima', 'Acciones'];
  dataSourceSeguro = new MatTableDataSource<Seguro>();

  constructor(
    private _afiliadoService: AfiliadoService,
    private _seguroService: SeguroService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {

  }

  ngOnInit(): void {

    this.mostrarSeguros();
  }


  @ViewChild(MatPaginator) paginator!: MatPaginator;



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceSeguro.filter = filterValue.trim().toLowerCase();
  }


  ngAfterViewInit() {
    this.dataSourceSeguro.paginator = this.paginator;
  }

  mostrarSeguros() {
    this._seguroService.getList().subscribe({
      next: (dataResponse) => {
        console.log(dataResponse)
        this.dataSourceSeguro.data = dataResponse;

      }, error: (e) => { }

    })
  }


}
