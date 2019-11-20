import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Produit} from "../model/produit";
import {select, Store} from "@ngrx/store";
import * as ProduitActions from '../store/produit.actions';
import * as fromProduitReducer from '../store/produit.reducer';
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-detail-produit',
  templateUrl: './detail-produit.component.html',
  styleUrls: ['./detail-produit.component.css']
})
export class DetailProduitComponent implements OnInit {

  public isLoading$: Observable<boolean>;
  public error$: Observable<string>;
  public produit$: Observable<Produit>;

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromProduitReducer.AppState>
  ) { }

  ngOnInit() {
    //let id = this.route.snapshot.paramMap.get('id');
    //this.store.dispatch(ProduitActions.loadProduit({id})); // Avec la fonction getProduitByIdBestSolution
                                                              //on n'a plus besoin de dispatcher l'id
                                                              // Mais on n'aura plus l'action Load Produit sur la console de Redux

    //this.produit$ = this.store.pipe(select(fromProduitReducer.getCurrentProduitByIdBest));// ici on utilise id qui est dispatcher par loadProduit

    this.produit$ = this.store.pipe(select(fromProduitReducer.getProduitByIdBestSolution));// Avec cette solution le composant n'a pas besoin
                                                                                          // de dispatcher l'id, c'est le routerReducer
                                                                                          // qui le fournit car il connait l'état de chaque route

    //this.produit$ = this.store.pipe(select(fromProduitReducer.getProduitByIdBestSolution));
    //this.produit$ = this.store.pipe(select(fromProduitReducer.getCurrentProduitByIdGood(id)))
    //this.produit$ = this.store.pipe(select(fromProduitReducer.getCurrentProduitByIdBad));

    this.isLoading$ = this.store.pipe(select(fromProduitReducer.getIsLoading));
    this.error$ = this.store.pipe(select(fromProduitReducer.getError));

  }

  addProductCart(product: Produit) {

  }
}
