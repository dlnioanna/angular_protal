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
  GoogleLoginProvider = GoogleLoginProvider;
  token: string;
  formGroup: FormGroup;
  faGoogle = faGoogle;

  constructor(private socialAuthService: SocialAuthService, private authService: AuthService,
              private tokenStorage: TokenStorageService, private router: Router) {
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.role = this.tokenStorage.getUserRole();
      this.username = this.tokenStorage.getUser();
    }
    this.socialAuthService.authState.subscribe((socialUser) => {
      this.socialUser = socialUser;

    });
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
        this.router.navigate(['/index']);
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }

  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.socialAuthService.signOut();
  }
}
