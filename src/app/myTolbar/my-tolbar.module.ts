import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { MyTolbarRoutingModule } from './my-tolbar-routing.module';
import { MyTolbarComponent } from './my-tolbar/my-tolbar.component';
import {MaterialModule} from "../material/material.module";


@NgModule({
  declarations: [MyTolbarComponent],
  exports: [
    MyTolbarComponent
  ],
  imports: [
    CommonModule,
    MyTolbarRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class MyTolbarModule { }
