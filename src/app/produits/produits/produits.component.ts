import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Produit} from "../model/produit";
import {select, Store} from "@ngrx/store";
import * as ProduitActions from '../store/produit.actions';
import * as fromProduitReducer from '../store/produit.reducer';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {


  isLoading$: Observable<boolean>;
  produits$: Observable<Produit[]>;
  error$: Observable<string>;


  //constructor(private service: ProduitStoreService) { }
  constructor(private store: Store<fromProduitReducer.AppState>){}

  ngOnInit(): void {
    this.store.dispatch(ProduitActions.loadProduits());
    this.produits$ = this.store.pipe(select(fromProduitReducer.getProduits));
    this.isLoading$ = this.store.pipe(select(fromProduitReducer.getIsLoading));
    this.error$ = this.store.pipe(select(fromProduitReducer.getError));
  }

  addProductCart(product: Produit) {

  }
}
