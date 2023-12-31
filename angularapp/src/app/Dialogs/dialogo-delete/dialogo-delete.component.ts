
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Afiliado } from 'src/app/Interfaces/afiliado';

@Component({
  selector: 'app-dialogo-delete',
  templateUrl: './dialogo-delete.component.html',
  styleUrls: ['./dialogo-delete.component.css']
})




export class DialogoDeleteComponent implements OnInit {


  constructor(

    private dialogoReferencia: MatDialogRef<DialogoDeleteComponent>,

    @Inject(MAT_DIALOG_DATA) public dataAfiliado: Afiliado

  ) { }

  ngOnInit(): void {

  }


  confirmarEliminar() {
    if (this.dataAfiliado) {
      this.dialogoReferencia.close("Eliminar")
    }
  }

}
