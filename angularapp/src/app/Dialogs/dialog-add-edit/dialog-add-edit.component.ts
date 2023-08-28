import { Component, Inject, OnInit} from '@angular/core';

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from "@angular/material/snack-bar";

import { MAT_DATE_FORMATS } from "@angular/material/core";
import *as moment from 'moment';

import { Afiliado } from 'src/app/Interfaces/afiliado';
import { Seguro } from 'src/app/Interfaces/seguro';
import { AfiliadoService } from 'src/app/Services/afiliado.service';
import { SeguroService } from 'src/app/Services/seguro.service';

@Component({
  selector: 'app-dialog-add-edit',
  templateUrl: './dialog-add-edit.component.html',
  styleUrls: ['./dialog-add-edit.component.css']
})
export class DialogAddEditComponent implements OnInit {

  formAfiliado: FormGroup;
  tituloAccion: string = "Nuevo";
  botonAccion: string = "Guardar";
  listaSeguros: Seguro[] = [];                                                                            
  constructor(

    private dialogoReferencia: MatDialogRef<DialogAddEditComponent>,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _seguroService: SeguroService,
    private _afiliadoSerive: AfiliadoService,
    @Inject(MAT_DIALOG_DATA) public dataAfiliado: Afiliado
      
  ) {

    this.formAfiliado = this.fb.group({
      Cedula: ['', Validators.required],
      NombresCliente: ['', Validators.required],
      ApellidosCliente: ['', Validators.required],
      Telefono: ['', Validators.required],
      edad: ['', Validators.required],
      idSeguro: ['', Validators.required],
     
      

    })
   
    this. _seguroService.getList().subscribe({
      next: (data) => {
        this.listaSeguros = data;
        console.log(this.listaSeguros);
      }, error: (e) => { }


    })
      
  }
  

  mostrarAlerta(msg: string, accion: string) {
    this._snackBar.open(msg, accion, {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 3000
    });
  }


  addEditAfiliado() {

    console.log(this.formAfiliado)
    console.log(this.formAfiliado.value)

    const modelo : Afiliado ={
      id: 0,
      Cedula: this.formAfiliado.value.Cedula,
      NombresCliente: this.formAfiliado.value.NombresCliente,
      ApellidosCliente: this.formAfiliado.value.ApellidosCliente,
      Telefono: this.formAfiliado.value.Telefono,
      edad: this.formAfiliado.value.edad,
      idSeguro: this.formAfiliado.value.idSeguro,
     
    }

    if (this.dataAfiliado == null) {
      this._afiliadoSerive.add(modelo).subscribe({
        next: (data) => {
          this.mostrarAlerta("Nuevo Registro exitoso", "listo");
          this.dialogoReferencia.close("creado");
        }, error: (e) => {
          this.mostrarAlerta("No se pudo crear", "Error");
        }

      })

    } else {
      this._afiliadoSerive.update(this.dataAfiliado.id,modelo).subscribe({
        next: (data) => {
          this.mostrarAlerta("Afiliado fue editado", "listo");
          this.dialogoReferencia.close("Editado");
        }, error: (e) => {
          this.mostrarAlerta("No se pudo editar", "Error");
        }

      })

    }
    
  }

  ngOnInit(): void {

    if (this.dataAfiliado) {
      console.log(this.dataAfiliado)
      this.formAfiliado.patchValue({

          Cedula: this.dataAfiliado.Cedula,
          NombresCliente: this.dataAfiliado.NombresCliente,
          ApellidosCliente: this.dataAfiliado.ApellidosCliente,
          Telefono: this.dataAfiliado.Telefono,
          edad: this.dataAfiliado.edad,
          idSeguro: this.dataAfiliado.idSeguro,
        })

      this.tituloAccion = "Editar";
      this.botonAccion = "Actualizar";
    }

  }

}

