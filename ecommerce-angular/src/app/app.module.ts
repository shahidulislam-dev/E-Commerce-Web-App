import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch } from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { FeaturedModule } from './modules/featured/featured.module';
import { AdminModule } from './modules/admin/admin.module';
import { SharedModule } from './modules/shared/shared.module';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FeaturedModule,
    AdminModule,
    SharedModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
