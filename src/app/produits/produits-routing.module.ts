import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProduitsComponent} from "./produits/produits.component";
import {DetailProduitComponent} from "./detail-produit/detail-produit.component";


const routes: Routes = [
  /*{ path: 'produits', component: ProduitsComponent,
      /!*children: [
        {path: ''}
      ]*!/
  },*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProduitsRoutingModule { }
