import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';


import { Seguro } from './Interfaces/seguro';
import { SeguroService } from './Services/seguro.service';

import { Afiliado } from './Interfaces/afiliado';
import { AfiliadoService } from './Services/afiliado.service';

import { MatSnackBar } from '@angular/material/snack-bar';


import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { DialogAddEditComponent } from "./Dialogs/dialog-add-edit/dialog-add-edit.component";
import { DialogoDeleteComponent } from "./Dialogs/dialogo-delete/dialogo-delete.component";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['NombresCliente', 'ApellidosCliente', 'Cedula', 'Telefono', 'edad', 'NombresSeguro', 'Acciones'];
  dataSource = new MatTableDataSource<Afiliado>();



  constructor(
    private _afiliadoService: AfiliadoService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {

  }

  /*  -------------boton togle para ver lsitas----------------*/

  currentComponent: string = '';

  showComponent(componentName: string) {
    this.currentComponent = componentName;
  }


  ngOnInit(): void {

    this.mostrarAfiliados();

   
  }
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  mostrarAfiliados() {
    this._afiliadoService.getList().subscribe({
      next: (dataResponse) => {
        console.log(dataResponse)
        this.dataSource.data = dataResponse;

      }, error: (e) => { }

    })
  }

  DialogNuevoAfiliado() {
    this.dialog.open(DialogAddEditComponent, {
      disableClose: true,
      width: "350px"

    }).afterClosed().subscribe(resultado => {
      if (resultado === "creado") {
        this.mostrarAfiliados();
      }

    })
  }


  dialogoEditarAfiliado(dataAfiliado: Afiliado) {
    this.dialog.open(DialogAddEditComponent, {
      disableClose: true,
      width: "350px",
      data: dataAfiliado

    }).afterClosed().subscribe(resultado => {
      if (resultado === "editado") {
        this.mostrarAfiliados();

      }

    })
  }


  mostrarAlerta(msg: string, accion: string) {
    this._snackBar.open(msg, accion, {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 3000
    });
  }


  dialogoEliminarAfiliado(dataAfiliado: Afiliado) {
    this.dialog.open(DialogoDeleteComponent, {
      disableClose: true,

      data: dataAfiliado

    }).afterClosed().subscribe(resultado => {
      if (resultado === "Eliminar") {
        this._afiliadoService.delete(dataAfiliado.id).subscribe({
          next: (data) => {
            this.mostrarAlerta("Empleado fue eliminado", "listo");
            this.mostrarAfiliados();
          },
          error: (e) => { console.log(e) }
        })

      }


    })
  }






}
