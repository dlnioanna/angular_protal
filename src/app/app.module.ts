import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {IndexComponent} from './index/index.component';
import {RouterModule} from '@angular/router';
import {HttpClientModule, HttpEventType } from '@angular/common/http';
import {OAuthModule} from 'angular-oauth2-oidc';
import {UserComponent} from './user/user.component';
import {UserService} from './services/user.service';
import {SocialLoginModule, SocialAuthServiceConfig} from 'angularx-social-login';
import {GoogleLoginProvider} from 'angularx-social-login';
import {SigninComponent} from './signin/signin.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {AccountComponent} from './account/account.component';
import {MatCardModule} from '@angular/material/card';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { MovieComponent } from './movie/movie.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';


@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    UserComponent,
    SigninComponent,
    HeaderComponent,
    FooterComponent,
    AccountComponent,
    MovieComponent,
    ImageUploadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    OAuthModule.forRoot(),
    SocialLoginModule,
    MDBBootstrapModule.forRoot(),
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [UserService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '495787401556-ri9600efu58daort2k5rn5ass0nc4fe8.apps.googleusercontent.com'
            )
          }
        ]
      } as SocialAuthServiceConfig,
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
