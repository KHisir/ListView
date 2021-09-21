import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HighlightSearchPipe } from './cc-listview/pipes/highlight-search.pipe';
import { CcListviewComponent } from './cc-listview/cc-listview.component';
import { CcPaginatorComponent } from './cc-listview/cc-paginator/cc-paginator.component';
import { PaginatorService } from './cc-listview/cc-paginator/service/paginator.service';

@NgModule({
  declarations: [	
    AppComponent,
    HighlightSearchPipe,
      CcListviewComponent,
      CcPaginatorComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [PaginatorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
