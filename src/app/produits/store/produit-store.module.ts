import { NgModule } from '@angular/core';
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";

import { produitReducersFunction } from './produit.reducer';
import {ProduitEffects} from "./produit.effects";


@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature("produits", produitReducersFunction),
    EffectsModule.forFeature([ProduitEffects])
  ],
  exports: [StoreModule, EffectsModule]
})
export class ProduitStoreModule { }
