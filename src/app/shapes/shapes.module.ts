import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ShapesComponent, GenericSelectorComponent } from './components';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// angular materials
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

// reducer
import { ShapesReducer } from './reducer';

// Services
import { ShapesService } from './services';

// effects
import { ShapesEffects } from './effects';


@NgModule({
  declarations: [
    ShapesComponent,
    GenericSelectorComponent
  ],
  exports: [ShapesComponent, GenericSelectorComponent],
  imports: [
    BrowserAnimationsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatToolbarModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    EffectsModule.forFeature([ShapesEffects]),
    StoreModule.forFeature('shapes', ShapesReducer)
    // AngularCesiumModule.forRoot(),
    // StoreModule.forFeature('navigate', navigationReducer)
  ],
  entryComponents: [ShapesComponent],
  providers: [ShapesService]
})
export class ShapesModule { }
