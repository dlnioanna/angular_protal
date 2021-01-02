import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {TokenStorageService} from '../services/token-storage.service';
import jwt_decode from 'jwt-decode';
import {JwtHelperService} from '@auth0/angular-jwt';

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


  constructor(private authService: AuthService, private tokenStorage: TokenStorageService) {
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.role = this.tokenStorage.getUserRole();
      this.username = this.tokenStorage.getUser();
    }
  }

  onSubmit(): void {
    this.authService.login(this.form).subscribe(
      response => {
        console.log('header ' + response.headers.get('Authorization'));
        this.headerToken = response.headers.get('Authorization').replace('Bearer', '');
        console.log('headerToken ' + this.headerToken);
        const decodedToken = atob(this.headerToken.split('.')[1]);
        console.log('atob ' + decodedToken);
        const tokenJson = JSON.parse(decodedToken);
        console.log('tokenJson ' + tokenJson);
        this.username = tokenJson.sub;
        this.role = tokenJson.authorities[0].authority;
        console.log('sub is ' + this.username);
        console.log('auth is ' + this.role);
        this.tokenStorage.saveToken(this.headerToken);
        this.tokenStorage.saveUser(this.username);
        this.tokenStorage.saveUserRole(this.role);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
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
}
