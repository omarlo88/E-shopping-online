import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyTolbarModule } from './myTolbar/my-tolbar.module';
import {MatCarouselModule} from '@ngmodule/material-carousel';
import {MaterialModule} from "./material/material.module";
import {HomeComponent} from "./home/home.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {HttpClientModule} from "@angular/common/http";
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';
import {ProduitsModule} from "./produits/produits.module";
import {AppStoreModule} from "./store/app-store.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MyTolbarModule,
    MaterialModule,
    MatCarouselModule.forRoot(),
    HttpClientModule,
    AppStoreModule,
    ProduitsModule,
    AdminModule,
    AuthModule,
    CategoriesModule,
    ShoppingCartModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
