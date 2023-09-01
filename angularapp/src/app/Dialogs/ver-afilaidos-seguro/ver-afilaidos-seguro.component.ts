
import { AfterViewInit, Component, ViewChild, OnInit, Inject } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';


import { Seguro } from 'src/app/Interfaces/seguro';
import { SeguroService } from 'src/app/Services/seguro.service';

import { Afiliado } from 'src/app/Interfaces/afiliado';
import { AfiliadoService } from 'src/app/Services/afiliado.service';

import { MatSnackBar } from '@angular/material/snack-bar';


import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { ActivatedRoute } from '@angular/router';




@Component({
  selector: 'app-ver-afilaidos-seguro',
  templateUrl: './ver-afilaidos-seguro.component.html',
  styleUrls: ['./ver-afilaidos-seguro.component.css']
})
export class VerAfilaidosSeguroComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['NombresCliente', 'ApellidosCliente', 'Cedula', 'Telefono', 'edad'];
  dataSourceAfiliadoSeguro = new MatTableDataSource<Afiliado>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
    dialog: any;
  afiliado: Afiliado | undefined;
  constructor(
    private _afiliadoService: AfiliadoService,
    @Inject(MAT_DIALOG_DATA) public data: { dataAfiliado: Afiliado }
  ) { }

  


  ngOnInit(): void {
<<<<<<< HEAD
    //if (this.data && this.data.dataAfiliado) {
    //  this.afiliado = {
    //    id: this.data.dataAfiliado.id,
    //    cedula: this.data.dataAfiliado.cedula,
    //    nombresCliente: this.data.dataAfiliado.nombresCliente,
    //    apellidosCliente: this.data.dataAfiliado.apellidosCliente,
    //    telefono: this.data.dataAfiliado.telefono,
    //    edad: this.data.dataAfiliado.edad,
    //    idSeguro: this.data.dataAfiliado.idSeguro,
    //  };
    //}
    this.mostrarAfiliadosSeguro();
=======
    if (this.data && this.data.dataAfiliado) {
      this.afiliado = {
        id: this.data.dataAfiliado.id,
        cedula: this.data.dataAfiliado.cedula,
        nombresCliente: this.data.dataAfiliado.nombresCliente,
        apellidosCliente: this.data.dataAfiliado.apellidosCliente,
        telefono: this.data.dataAfiliado.telefono,
        edad: this.data.dataAfiliado.edad,
        idSeguro: this.data.dataAfiliado.idSeguro,
      };
    } /*this.mostrarAfiliadosSeguro()*/
>>>>>>> fbb8a4ad85c49e30f726ca8432d2f0e0dbde7079
  }



  ngAfterViewInit() {
    this.dataSourceAfiliadoSeguro.paginator = this.paginator;
  }

  mostrarAfiliadosSeguro() {
<<<<<<< HEAD
    /*const id = this.data['dataAfiliado'];*/
    console.log('ID del Seguro:', this.data['dataAfiliado']);
    if (this.data && this.data.dataAfiliado) {
      const id = Number(this.data['dataAfiliado']); // Convierte a número
      console.log('ID del Seguro:', id);

      this._afiliadoService.getListAfiliadoSeguro(id).subscribe({
        next: (afiliados) => {
          console.log('Afiliados:', afiliados);
=======
    if (this.data && this.data.dataAfiliado && this.data.dataAfiliado.idSeguro) {
      const id = this.data.dataAfiliado.idSeguro;
      console.log('ID del Seguro:', id); // Paso 1: Imprimir el ID del seguro

      this._afiliadoService.getListAfiliadoSeguro(id).subscribe({
        next: (afiliados) => {
          console.log('Afiliados:', afiliados); // Paso 2: Imprimir la respuesta del servicio
>>>>>>> fbb8a4ad85c49e30f726ca8432d2f0e0dbde7079
          this.dataSourceAfiliadoSeguro.data = afiliados;
        },
        error: (error) => {
          console.error('Error fetching afiliados por seguro:', error);
        }
      });
    } else {
      console.error('dataAfiliado is undefined or has no idSeguro');
    }
<<<<<<< HEAD

  }


=======
  }



>>>>>>> fbb8a4ad85c49e30f726ca8432d2f0e0dbde7079

}
