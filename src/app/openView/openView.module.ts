import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { OpenViewComponent, GenericSelectorComponent} from './components';

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
import { OpenViewReducer } from './reducer';

// Services
import { OpenViewService } from './services';

// eefects
import { OpenViewEffects } from './effects';

// Import Cesium
import { AngularCesiumModule } from 'angular-cesium';

@NgModule({
  declarations: [
    OpenViewComponent,
    GenericSelectorComponent
  ],
  exports: [OpenViewComponent],
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
    EffectsModule.forFeature([OpenViewEffects]),
    StoreModule.forFeature('openView', OpenViewReducer)
  ],
  entryComponents: [OpenViewComponent],
  providers: [OpenViewService]
})
export class OpenViewModule { }
