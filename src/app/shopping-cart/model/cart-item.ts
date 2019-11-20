import {Produit} from "../../produits/model/produit";

export class CartItem {
  //private produit: Produit;
  //private qte: number;

  constructor(public produit: Produit, public qte: number){}
  prixTotal(): number { return this.produit.prix * this.qte; }

}
