import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {ProduitService} from "../services/produit.service";
import * as ProduitActions from './produit.actions';
import { Produit } from "../model/produit";
import {catchError, exhaustMap, map, mergeMap} from "rxjs/operators";
import {of} from "rxjs";


@Injectable()
export class ProduitEffects {

  constructor(
    private actions$: Actions,
    private produitService: ProduitService
  ) { }
/*
  loadProduits0$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProduitActions.loadProduits),
      exhaustMap(() =>
        this.produitService.getProduits().pipe(
          map((produits: Produit[]) => ProduitActions.loadProduitsSuccess({produits})),
          catchError(err => this.handleError(err))
        ))
    )
  );*/

  loadProduits$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProduitActions.loadProduits),
      mergeMap(() =>
      this.produitService.getProduits().pipe(
        map(produits => ProduitActions.loadProduitsSuccess({produits})),
        //map((produits: Produit[]) => ProduitActions.loadProduitsSuccess({produits})),
        catchError(err => of(ProduitActions.loadProduitsFail(err)))
      ))
    )
  );

  /*loadProduit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProduitActions.loadProduit),
      mergeMap(action => this.produitService.getProduit(action.id).pipe(
        map((produit: Produit) => ProduitActions.loadProduitSuccess({produit})),
        catchError(err => this.handleError(err))
      ))
    )
  );*/

  loadProduit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProduitActions.loadProduit),
      exhaustMap(action =>
        this.produitService.getProduit(action.id).pipe(
        map((produit: Produit) => ProduitActions.loadProduitSuccess({produit})),
        catchError(err => of(ProduitActions.loadProduitFail(err)))
      ))
    )
  );

  /*createProduit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProduitActions.createProduit),
      map(action => action.produit),
      mergeMap(newProduit => this.produitService.createProduit(newProduit).pipe(
        map((produit: Produit) => ProduitActions.createProduitSuccess({produit})),
        catchError(err => this.handleError(err))
      ))
    )
  );*/

  createProduit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProduitActions.createProduit),
      exhaustMap(action => this.produitService.createProduit(action.produit).pipe(
        map(produit => ProduitActions.createProduitSuccess({produit})),
        catchError(err => of(ProduitActions.createProduitFail(err)))
      ))
    )
  );

  updateProduit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProduitActions.updateProduit),
      exhaustMap(action => this.produitService.updateProduit(action.produit).pipe(
        map((produit: Produit) => ProduitActions.updateProduitSuccess({
          produit: {
            id: produit.id,
            changes: produit
          },
        })),
        catchError(err => of(ProduitActions.updateProduitFail(err)))
      ))
    )
  );

  deleteProduit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProduitActions.deleteProduit),
      exhaustMap(action => this.produitService.deleteProduit(action.id).pipe(
        map(() => {
            const id = action.id;
            return ProduitActions.deleteProduitSuccess({id});
          }
        ),
        catchError(err => of(ProduitActions.deleteProduitFail(err)))
      ))
    )
  );

  searchProduits$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProduitActions.searchProduits),
      exhaustMap(action => this.produitService.searchProduits(action.item).pipe(
        map(produits => ProduitActions.searchProduitsSuccess({produits})),
        catchError(err => of(ProduitActions.searchProduitsFail(err)))
        )
      )
    )
  );




  /*private handleError(error) {
    return of(ProduitActions.loadProduitsFail(error));
  }*/
}
