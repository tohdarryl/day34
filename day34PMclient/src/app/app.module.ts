import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
// must manually import HttpClientModule
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import { NewsDisplayComponent } from './components/news-display.component';
import { NewsService } from './news.service';

@NgModule({
  declarations: [
    AppComponent,
    NewsDisplayComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  // Add Service into providers[]
  providers: [NewsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
