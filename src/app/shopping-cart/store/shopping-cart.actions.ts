import {createAction, props} from "@ngrx/store";
import {Produit} from "../../produits/model/produit";


export const addProduitToCart = createAction(
  '[CART] ADD_TO_PRODUIT_CART', props<{produit: Produit}>()
);

export const addProduitToCartSuccess = createAction(
  '[CART] ADD_TO_PRODUIT_CART_SUCCESS', props<{produit: Produit}>()
);
export const addProduitToCartFail = createAction(
  '[CART] ADD_TO_PRODUIT_CART_FAIL', props<{error: string}>()
);
