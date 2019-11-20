import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EditProduitComponent} from './manage-produits/edit-produit.component';
import {NewProductComponent} from './manage-produits/new-product/new-product.component';
import {AdminComponent} from './admin/admin.component';
import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component';
import {AdminProduitsComponent} from './manage-produits/admin-produits/admin-produits.component';
import {AdminDetailProduitComponent} from './manage-produits/admin-detail-produit/admin-detail-produit.component';


const routes: Routes = [
  {
    path: '', component: AdminComponent,
    children: [
      {
        path: '',
        children: [
          {path: 'edit-produit/:id', component: EditProduitComponent},
          {path: 'admin-produits', component: AdminProduitsComponent},
          {path: 'produits/:id', component: AdminDetailProduitComponent},
          {path: 'admin-add-produit', component: NewProductComponent},
          {path: '', component: AdminDashboardComponent}
        ]
      }
    ]
  }
];






@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
