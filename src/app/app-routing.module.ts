import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {ProduitsComponent} from "./produits/produits/produits.component";
import {DetailProduitComponent} from "./produits/detail-produit/detail-produit.component";


const routes: Routes = [
  {path: 'home' , component: HomeComponent},
  {path: 'produits', component: ProduitsComponent
    //loadChildren: () => import('src/app/produits/produits.module').then(mod => mod.ProduitsModule)
  },
  { path: 'produits/:id', component: DetailProduitComponent },
  {path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule)
  },
  {path: '', redirectTo: '/produits', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
