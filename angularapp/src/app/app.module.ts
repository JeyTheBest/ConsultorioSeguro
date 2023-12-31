import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { RouterModule } from '@angular/router';

import { MatSnackBarModule } from '@angular/material/snack-bar'

import { MatIconModule } from '@angular/material/icon'

import { MatDialogModule } from '@angular/material/dialog'

import { MatGridListModule } from '@angular/material/grid-list'
import { MatButtonToggleModule } from '@angular/material/button-toggle';


import { AfiliadoService } from './Services/afiliado.service';
import { DialogAddEditComponent } from './Dialogs/dialog-add-edit/dialog-add-edit.component';
import { DialogoDeleteComponent } from './Dialogs/dialogo-delete/dialogo-delete.component';
import { SeguroDialogoComponent } from './Dialogs/seguro-dialogo/seguro-dialogo.component';
import { ListaSeguroComponent } from './Listas/lista-seguro/lista-seguro.component';
import { EliminarSeguroComponent } from './Dialogs/eliminar-seguro/eliminar-seguro.component';
import { VerAfilaidosSeguroComponent } from './Dialogs/ver-afilaidos-seguro/ver-afilaidos-seguro.component';



@NgModule({
  declarations: [
    AppComponent,
    DialogAddEditComponent,
    DialogoDeleteComponent,
    SeguroDialogoComponent,
    ListaSeguroComponent,
    EliminarSeguroComponent,
    VerAfilaidosSeguroComponent
      
   
  ],
 

  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatIconModule,
    MatDialogModule,
    MatGridListModule,
    MatButtonToggleModule,
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
