
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

import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-ver-afilaidos-seguro',
  templateUrl: './ver-afilaidos-seguro.component.html',
  styleUrls: ['./ver-afilaidos-seguro.component.css']
})


export class VerAfilaidosSeguroComponent implements OnInit {

  displayedColumns: string[] = ['NombresCliente', 'ApellidosCliente', 'Cedula', 'Telefono', 'edad'];
  dataSourceAfiliadoSeguro = new MatTableDataSource<Afiliado>();
  
 
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _afiliadoService: AfiliadoService ,) { }

  ngOnInit(): void {
     
    /*this.mostrarAfiliadosSeguro(idSeguro: number )*/
  }


  ngAfterViewInit() {
    this.dataSourceAfiliadoSeguro.paginator = this.paginator;
  }



  mostrarAfiliadosSeguro(idSeguro: number) {
    this._afiliadoService.getListAfiliadoSeguro(idSeguro).subscribe({
      next: (dataResponse) => {
        console.log(dataResponse);
        this.dataSourceAfiliadoSeguro.data = dataResponse;
        
      },
      error: (e) => {
        console.error('Error fetching afiliados por seguro:', e);
      }
    });
  }

  

}
