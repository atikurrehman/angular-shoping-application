import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core.module';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from './share/shared.module';
import { StoreModule } from '@ngrx/store';
import { ShopingListReducer } from './shoping-list/store/shoping-list.reducer';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    //as we are loading this module lazzy way we should not import it here
    // RecipesModule,
    // ShopingListModule,
    // AuthModule,
    SharedModule,
    CoreModule,
    StoreModule.forRoot({ shopingList: ShopingListReducer })
  ],
  //as we are using core module for providing services
  //   providers: [
  //  ],
  bootstrap: [AppComponent],
  //only needed if using angular8 and below and creating component in code 
  // entryComponents: [
  //   AlertComponent
  // ]
})
export class AppModule { }
