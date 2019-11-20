import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import * as ProduitActions from '../../../produits/store/produit.actions';
import * as fromProduitReducer from '../../../produits/store/produit.reducer';
import {Produit} from "../../../produits/model/produit";

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  produitForm: FormGroup;

  constructor(
    private store: Store<fromProduitReducer.AppState>,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.produitForm = this.fb.group({
      nom:['', Validators.required],
      categorieIds:['', Validators.required],
      description:[''],
      couleur:['', Validators.required],
      prix:['', Validators.required],
      image:[''],
      statut: [''],
      promotion: [''],
      rabais: ['']

    });
  }

  save() {
    const produit: Produit = {
      nom : this.produitForm.get("nom").value,
      categorieIds: [this.produitForm.get("categorieIds").value],
      description: this.produitForm.get("description").value,
      couleur: this.produitForm.get("couleur").value,
      prix: this.produitForm.get("prix").value,
      image:this.produitForm.get("image").value,
      statut: this.produitForm.get("statut").value,
      promotion: this.produitForm.get("promotion").value,
      rabais: this.produitForm.get("rabais").value,
    };
    this.store.dispatch(ProduitActions.createProduit({produit}));
    this.produitForm.reset();
  }
}
