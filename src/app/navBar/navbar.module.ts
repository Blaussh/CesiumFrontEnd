import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NavBarComponent } from './components/';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


// reducer
 import { navBarReducer } from './reducer';

// Services
// import { NavigationService } from './services';

// eefects
import { NavBarEffects } from './effects';
// routed components
import { LoginComponent } from '../login/components/login/login.component';
 // Import Cesium
import { AngularCesiumModule } from 'angular-cesium';
import { CreateMissionComponent, MissionSelectComponent } from '../appComponents';
import { AppComponent } from '../app.component';
import { Routes, RouterModule } from '@angular/router';

const routes = [
  { path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent},
  { path: 'app-root', component: AppComponent,
  children: [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'app-create-mission', component: CreateMissionComponent },
    { path: 'app-mission-select', component: MissionSelectComponent }
  ]
  },
  { path: 'app-create-mission', component: CreateMissionComponent},
  { path: 'app-mission-select', component: MissionSelectComponent}
];

@NgModule({
  declarations: [ NavBarComponent],
  exports: [NavBarComponent, RouterModule],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    AngularCesiumModule.forRoot(),
    EffectsModule.forFeature([NavBarEffects]),
    StoreModule.forFeature('navBar', navBarReducer)
  ],
  entryComponents: [NavBarComponent],
  // providers: [NavigationService]
})
export class NavBarModule { }

export const routingComponents = [LoginComponent];
