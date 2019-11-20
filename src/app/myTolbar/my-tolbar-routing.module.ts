import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "../home/home.component";


const routes: Routes = [
  { path: 'homet', component: HomeComponent },
  { path: '', redirectTo: 'homet', pathMatch: 'full' },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyTolbarRoutingModule { }
