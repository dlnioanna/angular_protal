import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {TokenStorageService} from '../services/token-storage.service';
import {SocialAuthService, SocialUser, GoogleLoginProvider} from 'angularx-social-login';
import jwt_decode from 'jwt-decode';
import {JwtHelperService} from '@auth0/angular-jwt';
import {faGoogle} from '@fortawesome/free-brands-svg-icons/faGoogle';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  role: string;
  headerToken: string;
  username: string;
  socialUser: SocialUser;
  token: string;

  constructor(private socialAuthService: SocialAuthService, private authService: AuthService,
              public tokenStorage: TokenStorageService, private router: Router) {
  }

  ngOnInit(): void {
    // if (this.tokenStorage.getToken()) {
    //   this.isLoggedIn = true;
    //   this.role = this.tokenStorage.getUserRole();
    //   this.username = this.tokenStorage.getUser();
    // }
    // if (this.socialUser) {
    //   this.socialAuthService.authState.subscribe((socialUser) => {
    //     this.socialUser = socialUser;
    //   });
    // }
  }

  onSubmit(): void {
    this.authService.login(this.form).subscribe(
      response => {
        this.headerToken = response.headers.get('Authorization').replace('Bearer', '');
        const decodedToken = atob(this.headerToken.split('.')[1]);
        const tokenJson = JSON.parse(decodedToken);
        this.username = tokenJson.sub;
        this.role = tokenJson.authorities[0].authority;
        this.tokenStorage.saveToken(this.headerToken);
        this.tokenStorage.saveUser(this.username);
        this.tokenStorage.saveUserRole(this.role);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.router.navigate(['/index']);
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        this.isLoggedIn = false;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }

  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.socialAuthService.authState.subscribe((socialUser) => {
        this.socialUser = socialUser;
        this.headerToken = this.socialUser.idToken;
        this.tokenStorage.saveToken(this.headerToken);
        this.tokenStorage.saveUser(this.socialUser.firstName);
        this.tokenStorage.saveUserRole('USER');
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.router.navigate(['/index']);
      },
      error => {
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
        this.isLoggedIn = false;
      });
  }

  // signOut(): void {
  //   if (this.socialUser) {
  //     this.socialAuthService.signOut();
  //     this.socialUser = null;
  //   }
  //   this.tokenStorage.signOut();
  //   this.isLoggedIn = false;
  //   this.router.navigate(['/index']);
  //
  // }
}
