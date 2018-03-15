import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CesiumComponent, ContextmenuComponent } from './components';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// angular materials
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';

// reducer
import { CesiumReducer } from './reducer';

// Services
import { CesiumService } from './services';

// eefects
import { CesiumEffects } from './effects';

// Import Cesium
import { AngularCesiumModule } from 'angular-cesium';

@NgModule({
  declarations: [
    CesiumComponent,
    ContextmenuComponent
  ],
  exports: [CesiumComponent],
  imports: [
    BrowserAnimationsModule,
    MatToolbarModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AngularCesiumModule.forRoot(),
    EffectsModule.forFeature([CesiumEffects]),
    StoreModule.forFeature('cesium', CesiumReducer)
  ],
  entryComponents: [CesiumComponent],
  providers: [CesiumService]
})
export class CesiumModule { }
