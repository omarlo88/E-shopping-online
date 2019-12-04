export interface Produit {
  id?: string;
  categorieIds: string[];
  nom: string;
  description: string;
  couleur: string;
  prix: number;
  image: string;
  statut?: string;
  promotion?: string;
  available?: boolean;
  rabais?: number;
}
