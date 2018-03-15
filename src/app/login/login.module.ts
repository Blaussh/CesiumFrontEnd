import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { LoginComponent } from './components/login/login.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './services/auth.service';

// // reducer
// import { ShapesReducer } from './reducer';

// // Services
// import { ShapesService } from './services';

// // effects
// import { ShapesEffects } from './effects';


@NgModule({
  declarations: [
    LoginComponent
  ],
  exports: [LoginComponent],
  imports: [
    NgbModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    // EffectsModule.forFeature([ShapesEffects]),
    // StoreModule.forFeature('shapes', ShapesReducer)
    // AngularCesiumModule.forRoot(),
    // StoreModule.forFeature('navigate', navigationReducer)
  ],
  entryComponents: [LoginComponent],
  providers: [AuthService]
})
export class LoginModule { }
