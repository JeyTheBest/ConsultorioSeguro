
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


import { SeguroDialogoComponent } from 'src/app/Dialogs/seguro-dialogo/seguro-dialogo.component';
import { EliminarSeguroComponent } from 'src/app/Dialogs/eliminar-seguro/eliminar-seguro.component';
import { VerAfilaidosSeguroComponent } from 'src/app/Dialogs/ver-afilaidos-seguro/ver-afilaidos-seguro.component';



@Component({
  selector: 'app-lista-seguro',
  templateUrl: './lista-seguro.component.html',
  styleUrls: ['./lista-seguro.component.css']
})

export class ListaSeguroComponent implements OnInit {

  displayedColumns: string[] = ['NombreSeguro', 'CodigoSeguro', 'SumaAseguradora', 'Prima', 'Acciones'];
  dataSourceSeguro = new MatTableDataSource<Seguro>();
  afiliado: any;

  constructor(
    
    private _seguroService: SeguroService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    

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


  mostrarAlerta(msg: string, accion: string) {
    this._snackBar.open(msg, accion, {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 3000
    });
  }

  mostrarSeguros() {
    this._seguroService.getList().subscribe({
      next: (dataResponse) => {
        console.log(dataResponse)
        this.dataSourceSeguro.data = dataResponse;

      }, error: (e) => { }

    })
  }

  DialogoVerAfiliadosSeguro(seguro: Seguro) {
    console.log('Datos del seguro:', seguro); // Imprime los datos del seguro en la consola
    this.dialog.open(VerAfilaidosSeguroComponent, {
      data: { dataAfiliado: seguro }
    });
  }


  //abrirDialogoParaVerAfiliados() {
  //  if (this.afiliado) {
  //    this.dialog.open(VerAfilaidosSeguroComponent, {
  //      data: { dataAfiliado: this.afiliado }
  //    });
  //  } else {
  //    console.error('afiliado is undefined');
  //  }
  //}




  DialogNuevoSeguro() {
    this.dialog.open(SeguroDialogoComponent, {
      disableClose: true,
      width: "350px"

    }).afterClosed().subscribe(resultado => {
      if (resultado === "creado") {
        this.mostrarSeguros();
      }

    })
  }



  dialogoEliminarSeguro(dataSeguro: Seguro) {
    this.dialog.open(EliminarSeguroComponent, {
      disableClose: true,

      data: dataSeguro

    }).afterClosed().subscribe(resultado => {
      if (resultado === "Eliminar") {
        this._seguroService.delete(dataSeguro.id).subscribe({
          next: (data) => {
            this.mostrarAlerta("Seguro fue eliminado", "listo");
            this.mostrarSeguros();
          },
          error: (e) => { console.log(e) }
        })

      }


    })
  }


  dialogoEditarSeguro(dataSeguro: Seguro) {
    this.dialog.open(SeguroDialogoComponent, {
      disableClose: true,
      width: "350px",
      data: dataSeguro

    }).afterClosed().subscribe(resultado => {
      if (resultado === "editado") {
        this.mostrarSeguros();
      }

    })
  }


}
