import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable, throwError} from "rxjs";

import { Produit } from '../model/produit';
import {catchError, tap} from "rxjs/operators";


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json;charset=UTF-8',
    Accept : 'application/json;charset=UTF-8'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  private readonly baseUrl = environment.baseUrl;
  private readonly apiProduits = `${this.baseUrl}/produits`;

  constructor(private http: HttpClient) { }

  getProduits(): Observable<Produit[]> {
    return this.http.get<Produit[]>(this.apiProduits, httpOptions)
      .pipe(
        tap(console.log),
        catchError(err => this.handleError(err))
      );
  }

  getProduit(id: string): Observable<Produit> {
    return this.http.get<Produit>(`${this.apiProduits}/${id}`, httpOptions)
      .pipe(
        tap(data => console.log(data)),
        catchError(err => this.handleError(err))
      );
  }

  searchProduits(item: string): Observable<Produit[]>{
    console.log(item);
    return this.http.get<Produit[]>(`${this.apiProduits}/produitsQuery/byNom?nom=${item}`
      //{params: new HttpParams().set('nom', item)},
      )
      .pipe(
        tap(console.log),
        catchError(err => this.handleError(err))
      );
  }

  createProduit(produit: Produit): Observable<Produit> {
    return this.http.post<Produit>(this.apiProduits, produit, httpOptions)
      .pipe(
        catchError(err => this.handleError(err))
      );
  }

  updateProduit(produit: Produit): Observable<Produit> {
    return this.http.put<Produit>(`${this.apiProduits}/${produit.id}`, produit, httpOptions)
      .pipe(
        catchError(err => this.handleError(err))
      );
  }

  deleteProduit(id: string): Observable<Produit> {
    return this.http.delete<Produit>(`${this.apiProduits}/${id}`, httpOptions)
      .pipe(
        catchError(err => this.handleError(err))
      );
  }

  private handleError(error: HttpErrorResponse){
    if (error.error instanceof ErrorEvent){
      console.error('Erreur survenue: ', error.message);
    } else {
      console.error(`Backend returned code ${error.status}` + `body was: ${error.error}`);
    }
    return throwError("Error: Please try again later! ");
  }
}
