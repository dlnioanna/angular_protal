import {Component, OnInit} from '@angular/core';
import {SocialAuthService, SocialUser} from 'angularx-social-login';
import {GoogleLoginProvider} from 'angularx-social-login';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  user: SocialUser;
  GoogleLoginProvider = GoogleLoginProvider;

  constructor(private authService: SocialAuthService) {
  }
  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
    });
  }
F
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  refreshGoogleToken(): void {
    this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }
  signOut(): void {
    this.authService.signOut();
  }



}
