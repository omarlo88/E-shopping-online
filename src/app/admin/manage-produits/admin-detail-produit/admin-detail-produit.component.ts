import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import { Produit } from "../../../produits/model/produit";
import {select, Store} from "@ngrx/store";
import * as ProduitActions from '../../../produits/store/produit.actions';
import * as fromProduitReducer from '../../../produits/store/produit.reducer';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-admin-detail-produit',
  templateUrl: './admin-detail-produit.component.html',
  styleUrls: ['./admin-detail-produit.component.css']
})
export class AdminDetailProduitComponent implements OnInit {

  public isLoading$: Observable<boolean>;
  public error$: Observable<string>;
  public produit$: Observable<Produit>;

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromProduitReducer.AppState>
  ) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.store.dispatch(ProduitActions.loadProduit({id}));
    this.isLoading$ = this.store.pipe(select(fromProduitReducer.getIsLoading));
    this.error$ = this.store.pipe(select(fromProduitReducer.getError));
    this.produit$ = this.store.pipe(select(fromProduitReducer.getProduitByIdBestSolution));
  }

}
