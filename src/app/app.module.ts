import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MissionSelectComponent, CreateMissionComponent } from './appComponents';


import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// angular materials
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Import Cesium
import { AngularCesiumModule, MapEventsManagerService, CesiumService } from 'angular-cesium';

import { ShapesModule } from './shapes/shapes.module';

import { NavModule } from './nav/nav.module';

import { CesiumModule } from './cesium/cesium.module';

import { OpenViewModule } from './openView/openView.module';
import { LoginModule } from './login/login.module';

import { NavBarModule, routingComponents } from './navBar/navBar.module';
import { AuthService } from './login/services';
import { AuthInterceptorService } from './login/services';
import { CesiumEventBuilder } from 'angular-cesium/src/angular-cesium/services/map-events-mananger/cesium-event-builder';
import { CoreModule } from './core/core.module';

const ImportedModules = [NavModule, CesiumModule, ShapesModule, OpenViewModule, NavBarModule,];

@NgModule({
  declarations: [
    AppComponent,
    MissionSelectComponent,
    CreateMissionComponent,
    routingComponents
  ],
  imports: [
    NavModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    CoreModule,
    NgbModule.forRoot(),
    AngularCesiumModule.forRoot(),
    EffectsModule.forRoot([]),
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      maxAge: 10 // number of states to retain
    }),
    ...ImportedModules
  ],
  providers: [AuthService, { provide: MapEventsManagerService, useClass: CesiumEventBuilder, multi: true }, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
