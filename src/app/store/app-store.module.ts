import { NgModule } from '@angular/core';
import {StoreModule} from "@ngrx/store";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {environment} from "../../environments/environment";
import {EffectsModule} from "@ngrx/effects";
import {
  NavigationActionTiming,
  RouterState,
  StoreRouterConnectingModule
} from "@ngrx/router-store";

import {CustomSerializer} from "./index";
import {reducers} from "./index";


@NgModule({
  declarations: [],
  imports: [
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot({
      serializer: CustomSerializer,
      navigationActionTiming: NavigationActionTiming.PostActivation,
      routerState: RouterState.Full,
      //routerState: RouterState.Minimal,
    }),
    !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 50 }) : []
  ],
  exports: [StoreModule]
})
export class AppStoreModule { }
