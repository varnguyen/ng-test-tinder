import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { SwingModule } from 'angular2-swing';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {
    HeaderComponent,
    FooterComponent
} from './pages/master';
import {
    HomeComponent,
    FavoriteListComponent
} from './pages/components';
import { MouseoverCatcher } from './directives';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        MouseoverCatcher,
        HomeComponent,
        FavoriteListComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        SwingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
