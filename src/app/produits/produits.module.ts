import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProduitsRoutingModule } from './produits-routing.module';
import { ProduitsComponent } from './produits/produits.component';
import {ProduitStoreModule} from "./store/produit-store.module";
import {MaterialModule} from "../material/material.module";
import { DetailProduitComponent } from './detail-produit/detail-produit.component';


@NgModule({
  declarations: [ProduitsComponent, DetailProduitComponent],
  imports: [
    CommonModule,
    ProduitsRoutingModule,
    MaterialModule,
    ProduitStoreModule
  ],
})
export class ProduitsModule { }
