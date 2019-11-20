import {createAction, props} from "@ngrx/store";
import {Produit} from "../model/produit";
import {Update} from "@ngrx/entity";


export const loadProduits = createAction('[Produit] LOAD Produits');
export const loadProduitsSuccess = createAction('[Produit] LOAD Produits Success', props<{produits: Produit[]}>());
export const loadProduitsFail = createAction('[Produit] LOAD Produits Fail', props<{error: string}>());

export const loadProduit = createAction('[Produit] LOAD Produit', props<{id: string}>());
export const loadProduitSuccess = createAction('[Produit] LOAD Produit Success', props<{produit: Produit}>());
export const loadProduitFail = createAction('[Produit] LOAD Produit Fail', props<{error: string}>());

export const createProduit = createAction('[Produit] CREATE Produit', props<{produit: Produit}>());
export const createProduitSuccess = createAction('[Produit] CREATE Produit Success', props<{produit: Produit}>());
export const createProduitFail = createAction('[Produit] CREATE Produit Fail', props<{error: string}>());

export const updateProduit = createAction('[Produit] UPDATE Produit', props<{produit: Produit}>());
export const updateProduitSuccess = createAction('[Produit] UPDATE Produit Success', props<{ produit: Update<Produit> }>());
export const updateProduitFail = createAction('[Produit] UPDATE Produit Fail', props<{error: string}>());

export const deleteProduit = createAction('[Produit] DELETE Produit', props<{id: string}>());
export const deleteProduitSuccess = createAction('[Produit] DELETE Produit Success', props<{id?: string}>());
export const deleteProduitFail = createAction('[Produit] DELETE Produit Fail', props<{error: string}>());

export const searchProduits = createAction('[Produit] SEARCH Produit', props<{item: string}>());
export const searchProduitsSuccess = createAction('[Produit] SEARCH Produit Success', props<{produits: Produit[]}>());
export const searchProduitsFail = createAction('[Produit] SEARCH Produit Fail', props<{error: string}>());
