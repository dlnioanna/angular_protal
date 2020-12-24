import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {IndexComponent} from './index/index.component';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
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
import {MovieComponent} from './movie/movie.component';
import {ImageUploadComponent} from './image-upload/image-upload.component';
import {RoomComponent} from './room/room.component';
import {PurchaseComponent} from './purchase/purchase.component';
import {TicketComponent} from './ticket/ticket.component';
import {MovieShowComponent} from './movie-show/movie-show.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {enableProdMode} from '@angular/core';
import {MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {DatepickerComponent} from './datepicker/datepicker.component';
import {MaterialModule} from './material/material.module';


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
    ImageUploadComponent,
    RoomComponent,
    PurchaseComponent,
    TicketComponent,
    MovieShowComponent,
    DatepickerComponent
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
    FontAwesomeModule,
    MatFormFieldModule,
    MaterialModule,
    BrowserAnimationsModule,
    MatNativeDateModule
  ],
  entryComponents: [DatepickerComponent],
  providers: [UserService,
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}},
    {provide: MAT_DATE_LOCALE, useValue: 'gr-GR'},
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
  bootstrap: [AppComponent, DatepickerComponent]
})
export class AppModule {
}
