import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import {select, Store} from "@ngrx/store";
import * as fromProduitReducer from '../../../produits/store/produit.reducer';
import * as ProduitActions from '../../../produits/store/produit.actions';
import {Observable} from "rxjs";
import {Produit} from "../../../produits/model/produit";
import {Router} from "@angular/router";
@Component({
  selector: 'app-admin-produits',
  templateUrl: './admin-produits.component.html',
  styleUrls: ['./admin-produits.component.css']
})
export class AdminProduitsComponent implements OnInit {

  public produits$: Observable<Produit[]>;
  public isLoading$: Observable<boolean>;
  public error$: Observable<string>;

  constructor(
    private store: Store<fromProduitReducer.AppState>,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit() {
    this.store.dispatch(ProduitActions.loadProduits());
    this.isLoading$ = this.store.pipe(select(fromProduitReducer.getIsLoading));
    this.error$ = this.store.pipe(select(fromProduitReducer.getError));
    this.produits$ = this.store.pipe(select(fromProduitReducer.getProduits));
  }

  editProduit(produit: Produit) {
    this.store.dispatch(ProduitActions.updateProduit({produit}));
    this.router.navigate(["/admin/edit-produit", produit.id]);
  }

  deleteProduit(id: string) {
    if (confirm("Vous êtes sûr de vouloir supprimer ?")){
      this.store.dispatch(ProduitActions.deleteProduit({id}));
    }
  }
}
