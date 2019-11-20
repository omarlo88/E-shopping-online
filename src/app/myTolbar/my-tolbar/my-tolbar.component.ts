import {Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Produit} from "../../produits/model/produit";
import {select, Store} from "@ngrx/store";
import * as ProduitActions from '../../produits/store/produit.actions';
import * as fromProduitReducer from '../../produits/store/produit.reducer';
import {of, Subject} from "rxjs";
import {debounceTime, distinctUntilChanged, filter, switchMap, takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-my-tolbar',
  templateUrl: './my-tolbar.component.html',
  styleUrls: ['./my-tolbar.component.css']
})
export class MyTolbarComponent implements OnInit {

  searchForm: FormGroup;
  //private searchQuery = new Subject<string>();
  destroySub = new Subject();
  searchQuery = '';


  constructor(
    private fb: FormBuilder,
    private store: Store<fromProduitReducer.ProduitState>
  ) { }

  ngOnInit() {
    this.searchForm = this.fb.group({
      item: ['']
    });

  }

  ngOnDestroy() {
    this.destroySub.next(true);
    this.destroySub.complete();
  }

  searchProduits() {
    /*const item = this.searchForm.get('item').value;
    this.store.dispatch(ProduitActions.searchProduits({item}));*/

    of(this.searchForm.get('item').value).pipe(
      debounceTime(2000),
      distinctUntilChanged(),
      filter(item => item.length > 2 || item === ''),
      takeUntil(this.destroySub)
    ).subscribe(item => this.store.dispatch(ProduitActions.searchProduits({item})));

   /* of(this.searchQuery).pipe(
      debounceTime(500),
      distinctUntilChanged(),
      takeUntil(this.destroySub)
    ).subscribe(item => this.store.dispatch(ProduitActions.searchProduits({item})));*/

  }
}
