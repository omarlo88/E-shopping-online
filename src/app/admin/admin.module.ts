import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ManageCategoriesComponent } from './manage-categories/manage-categories.component';
import { EditProduitComponent } from './manage-produits/edit-produit.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import {NewProductComponent} from './manage-produits/new-product/new-product.component';
import { AdminProduitsComponent } from './manage-produits/admin-produits/admin-produits.component';
import {MaterialModule} from '../material/material.module';
import { AdminDetailProduitComponent } from './manage-produits/admin-detail-produit/admin-detail-produit.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [AdminComponent,
    AdminDashboardComponent,
    ManageCategoriesComponent,
    EditProduitComponent,
    ManageUsersComponent,
    NewProductComponent,
    AdminProduitsComponent,
    AdminDetailProduitComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ]
})
export class AdminModule { }
