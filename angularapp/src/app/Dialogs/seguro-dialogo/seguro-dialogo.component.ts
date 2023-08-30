import { Component, Inject, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from "@angular/material/snack-bar";

import { MAT_DATE_FORMATS } from "@angular/material/core";
import *as moment from 'moment';

import { Afiliado } from 'src/app/Interfaces/afiliado';
import { Seguro } from 'src/app/Interfaces/seguro';
import { AfiliadoService } from 'src/app/Services/afiliado.service';
import { SeguroService } from 'src/app/Services/seguro.service'

import { AbstractControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-seguro-dialogo',
  templateUrl: './seguro-dialogo.component.html',
  styleUrls: ['./seguro-dialogo.component.css']
})
export class SeguroDialogoComponent implements OnInit {

  formSeguro: FormGroup;
  tituloAccion: string = "Nuevo";
  botonAccion: string = "Guardar";
  listaSeguros: Seguro[] = [];


  constructor(

    private dialogoReferencia: MatDialogRef<SeguroDialogoComponent>,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _seguroService: SeguroService,


    @Inject(MAT_DIALOG_DATA) public dataSeguro: Seguro /// trae el id 

  ) {

    this.formSeguro = this.fb.group({
      NombreSeguro: ['', [Validators.required, letrasOnlyValidator()]],
      CodigoSeguro: ['', [Validators.required, numerosOnlyValidator()]],
      SumaAseguradora: ['', [Validators.required, numerosOnlyValidator()]],
      Prima: ['', [Validators.required, numerosOnlyValidator()]],

    })

    /*    -----para recorrer la lista de seguro----*/
    this._seguroService.getList().subscribe({
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

  addEditSeguro() {

    console.log(this.formSeguro)
    console.log(this.formSeguro.value)

    const modelo: Seguro = {
      id: 0,
      NombreSeguro: this.formSeguro.value.NombreSeguro,
      CodigoSeguro: this.formSeguro.value.CodigoSeguro,
      Prima: this.formSeguro.value.Prima,
      SumaAseguradora: this.formSeguro.value.SumaAseguradora,


    }

    if (this.dataSeguro == null) {
      this._seguroService.add(modelo).subscribe({
        next: (data) => {
          this.mostrarAlerta("Nuevo Registro exitoso", "listo");
          this.dialogoReferencia.close("creado");
        }, error: (e) => {
          this.mostrarAlerta("No se pudo crear", "Error");
        }

      })

    } else {
      this._seguroService.update(this.dataSeguro.id, modelo).subscribe({
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

    //if (this.dataSeguro) {
    //  console.log(this.dataSeguro)
    //  this.formSeguro.patchValue({

    //    NombreSeguro: this.dataSeguro.NombreSeguro,
    //    CodigoSeguro: this.dataSeguro.CodigoSeguro,
    //    Prima: this.dataSeguro.Prima,
    //    SumaAseguradora: this.dataSeguro.SumaAseguradora,


    //  })

    //  this.tituloAccion = "Editar";
    //  this.botonAccion = "Actualizar";
    //}

  

  }



}


function numerosOnlyValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const numerosPattern = /^[0-9]*(\.[0-9]*)?$/; // Patrón para números enteros o decimales
    const esValido = numerosPattern.test(control.value);
    return esValido ? null : { 'numerosInvalidos': true };
  };
}


function letrasOnlyValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const letrasPattern = /^[A-Za-z\s]*$/; // Patrón de letras
    const esValido = letrasPattern.test(control.value);
    return esValido ? null : { 'letrasInvalidas': true };
  };
}
