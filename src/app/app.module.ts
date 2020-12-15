import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {IndexComponent} from './index/index.component';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {OAuthModule} from 'angular-oauth2-oidc';
import { UserComponent } from './user/user.component';
import {UserService} from './user.service';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    OAuthModule.forRoot()
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
