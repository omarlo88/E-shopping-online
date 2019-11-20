import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {select, Store} from "@ngrx/store";
import * as ProduitActions from '../../produits/store/produit.actions';
import * as fromProduitReducer from '../../produits/store/produit.reducer';
import {Produit} from "../../produits/model/produit";
import {Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-edidt-produit',
  templateUrl: './edit-produit.component.html',
  styleUrls: ['./edit-produit.component.css']
})
export class EditProduitComponent implements OnInit {

  produitForm: FormGroup;
  isLoading$: Observable<boolean>;
  error$: Observable<string>;
  private produitId: string;

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromProduitReducer.AppState>,
    private fb: FormBuilder,
    private router: Router
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

    let id = this.route.snapshot.paramMap.get('id');
    this.produitId = id;
    this.store.dispatch(ProduitActions.loadProduit({id}));
    this.isLoading$ = this.store.pipe(select(fromProduitReducer.getIsLoading));
    this.error$ = this.store.pipe(select(fromProduitReducer.getError));
    const produit$: Observable<Produit> =
      this.store.pipe(select(fromProduitReducer.getCurrentProduitByIdBest));
    produit$.subscribe(produit => {
      if (produit){
        this.produitForm.patchValue({
          nom : produit.nom,
          categorieIds: produit.categorieIds[0],
          description: produit.description,
          couleur: produit.couleur,
          prix: produit.prix,
          image:produit.image,
          statut: produit.statut,
          promotion: produit.promotion,
          rabais: produit.rabais,
        });
      }
    })
  }

  updateProduit() {
    const produit: Produit = {
      id : this.produitId,
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
    this.store.dispatch(ProduitActions.updateProduit({produit}));
    this.router.navigateByUrl("/admin/admin-produits");
  }
}
