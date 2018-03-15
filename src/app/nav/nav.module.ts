import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NavigationComponent, GenericSelectorComponent} from './components';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// angular materials
import {MatButtonModule, MatInputModule, MatSelectModule, MatIconModule, MatFormFieldModule, MatCardModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';

// reducer
import { navigationReducer } from './reducer';

// Services
import { NavigationService } from './services';

// eefects
import { NavigationEffects } from './effects';

// Import Cesium
import { AngularCesiumModule } from 'angular-cesium';

@NgModule({
  declarations: [
    NavigationComponent,
    GenericSelectorComponent
  ],
  exports: [NavigationComponent, GenericSelectorComponent],
  imports: [
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AngularCesiumModule.forRoot(),
    EffectsModule.forFeature([NavigationEffects]),
    StoreModule.forFeature('navigate', navigationReducer)
  ],
  entryComponents: [NavigationComponent],
  providers: [NavigationService]
})
export class NavModule { }
