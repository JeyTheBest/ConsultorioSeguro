import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Seguro } from 'src/app/Interfaces/seguro'


@Component({
  selector: 'app-eliminar-seguro',
  templateUrl: './eliminar-seguro.component.html',
  styleUrls: ['./eliminar-seguro.component.css']
})


export class EliminarSeguroComponent implements OnInit {


  constructor(

    private dialogoReferencia: MatDialogRef<EliminarSeguroComponent>,

    @Inject(MAT_DIALOG_DATA) public dataSeguro: Seguro

  ) { }

  ngOnInit(): void {

  }

  confirmarEliminar() {
    if (this.dataSeguro) {
      this.dialogoReferencia.close("Eliminar")
    }
  }


}
