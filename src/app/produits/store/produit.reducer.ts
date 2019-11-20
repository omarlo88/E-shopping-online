import {Action, createFeatureSelector, createReducer, createSelector, on} from "@ngrx/store";

import * as ProduitActions from './produit.actions';
import * as fromRoot from '../../store/app-state';
import {Produit} from "../model/produit";
import {EntityState, EntityAdapter, createEntityAdapter} from "@ngrx/entity";

import {RouterReducerState} from "@ngrx/router-store";
import {RouterStateUrl} from "../../store";

export interface ProduitState extends EntityState<Produit> {
  isLoading: boolean;
  isLoaded: boolean;
  error: any;
  selectedProduitId: any | null;
  //produits: Produit[]; Avec EntityState on n'a plus besoin de ça
  searchQuery: string;
}

export interface AppState extends fromRoot.AppState {
  produits: ProduitState
}

//export const produitAdapter: EntityAdapter<Produit> = createEntityAdapter<Produit>();
export const produitAdapter: EntityAdapter<Produit> = createEntityAdapter<Produit>({
  selectId: (produit: Produit) => produit.id,
  sortComparer: (produit1 : Produit, produit2: Produit) => produit1.nom.localeCompare(produit2.nom),
});

export const defaultProduit: ProduitState = {
  ids: [],
  entities: {},
  isLoading: false,
  isLoaded: false,
  error: '',
  selectedProduitId: null,
  searchQuery: ''
};

export const produitInitialState = produitAdapter.getInitialState(defaultProduit);


export const produitReducers = createReducer(
  produitInitialState,
 /* on(ProduitActions.loadProduits, state => { // On peut maintenant enlever les action initiales car c'est traité par notre Effects
    return {
      ...state,
      isLoading: true,
      isLoaded: false,
      hasError: false,
      error: null,
      selectedProduitId:undefined
    }
  }),*/
  /*on(ProduitActions.loadProduitsSuccess, (state, action) => {
    return {
      ...state,
      isLoading: true,
      isLoaded: false,
      hasError: false,
      error: null,
      selectedProduitId:undefined,
      produits: action.produits
    }
  })*/
  on(ProduitActions.loadProduitsSuccess, (state, {produits}) => {
    return produitAdapter.addAll(produits, { //Avec EntityAdapter, on utilise l'adapter avec les opérations CRUD
      ...state,
      isLoading: false,
      isLoaded: true,
      hasError: false,
      error: null,
      selectedProduitId:undefined,
    })
  }),
  on(ProduitActions.loadProduitsFail, (state, {error}) =>{
    return {
      ...state,
      isLoading: false,
      isLoaded: false,
      hasError: true,
      error: error,
      selectedProduitId:undefined,
      entities: {}
    }
  }),
  on(ProduitActions.loadProduitSuccess, (state, {produit}) => {
    return produitAdapter.addOne(produit, {
      ...state,
      isLoading: false,
      isLoaded: true,
      hasError: false,
      error: null,
      selectedProduitId:produit.id,
      entities: {}
    })
  }),
  on(ProduitActions.loadProduitFail, (state, {error}) => {
    return {
      ...state,
      isLoading: false,
      isLoaded: false,
      hasError: true,
      error: error,
      selectedProduitId:undefined,
      entities: {}
    }
  }),
  /*on(ProduitActions.createProduitSuccess,(state, {produit}) => {
    return produitAdapter.addOne(produit, {
      ...state,
      hasError: false,
      error: null,
      selectedProduitId:undefined,
      entities: {}
    })
  })*/
  on(ProduitActions.createProduitSuccess,(state, {produit}) => (produitAdapter.addOne(produit, state))),
  on(ProduitActions.createProduitFail, (state, {error}) => ({...state, hasError: true, error: error})),
  on(ProduitActions.updateProduitSuccess, (state, {produit}) => {
    return produitAdapter.updateOne(produit, state)
  }),
  on(ProduitActions.updateProduitFail, (state, {error}) => {
    return {
      ...state,
      hasError: true,
      error: error,
    }
  }),
  on(ProduitActions.deleteProduitSuccess, (state, {id}) => {
    return produitAdapter.removeOne(id, state)
  }),
  on(ProduitActions.deleteProduitFail, (state, {error}) => {
    return {
      ...state,
      hasError: true,
      error: error,
    }
  }),
  on(ProduitActions.searchProduitsSuccess, (state, {produits}) => {
    return produitAdapter.addAll(produits, {
      ...state,
      isLoading: false,
      isLoaded: true,
      hasError: false,
      error: null,
      selectedProduitId:undefined,
      entities: {},
      searchQuery: null
    })
  }),
  on(ProduitActions.searchProduitsFail, (state, {error}) => {
    return {
      ...state,
      hasError: true,
      error: error,
    }
  })
);


export function produitReducersFunction(state: ProduitState | undefined, action: Action) {
  return produitReducers(state, action);
}

const getProduitFeatureState =  createFeatureSelector<ProduitState>("produits");

export const getProduits = createSelector(
  getProduitFeatureState,
  //(state: ProduitState) => state.produis // Avec EntityState cette ligne ne marche plus!!
  produitAdapter.getSelectors().selectAll // retourne un array de produits
);

export const getIsLoading = createSelector(
  getProduitFeatureState,
  (state: ProduitState) => state.isLoading
);

export const getIsLoaded = createSelector(
  getProduitFeatureState,
  (state: ProduitState) => state.isLoaded
);

export const getSearchQuery = createSelector(
  getProduitFeatureState,
  (state: ProduitState) => state.searchQuery
);

export const getError = createSelector(
  getProduitFeatureState,
  (state: ProduitState) => state.error
);

// Reducer selectors
export const selectReducerState = createFeatureSelector<RouterReducerState<RouterStateUrl>>("router");

export const getProduitByIdBestSolution = createSelector( //Pour recupérer l'id depuis le state du router et non dans le component DetailProduit
  getProduitFeatureState,
  selectReducerState,
  (state, router) => router.state && state.entities[router.state.params.id]
);

export const getCurrentProduitId = createSelector(
  getProduitFeatureState,
  (state: ProduitState) => state.selectedProduitId
);

export const getCurrentProduitByIdBest = createSelector(
  getProduitFeatureState,
  state => state.entities[state.selectedProduitId]
);

export const getCurrentProduitByIdGood = (id) => createSelector(
  getProduits,
  produits => produits.find(p => p.id === id)
);

export const getCurrentProduitByIdBad = createSelector(// Bonne solution
  getProduits,
  getCurrentProduitId,
  (produits, id) => produits.find(p => p.id === id)
);

/* ---- Partie à tester ------*/

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = produitAdapter.getSelectors();// get the selectors

// select the array of user ids
export const selectProduitIds = selectIds;

// select the dictionary of user entities
export const selectProduitEntities = selectEntities;

// select the array of users
export const selectAllProduits = selectAll;

// select the total user count
export const selectProduitTotal = selectTotal;

/* ----- A tester aussi -----*/

export const getProduitsList = createSelector( // la liste des produits
  selectEntities,
  entities => Object.keys(entities).map(key => entities[key])
);



