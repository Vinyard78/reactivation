import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/* Material */
import { 
  MatListModule,
  MatIconModule,
  MatButtonModule,
  MatExpansionModule,
  MatTableModule,
  MatSortModule } from '@angular/material';

/* Page */
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    MatTableModule,
    MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
