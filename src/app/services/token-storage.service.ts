import {Injectable} from '@angular/core';
import {User} from '../models/user';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const AUTHORITIES_KEY = 'auth-auth';
const SOCIAL_KEY = 'social';
const SOCIAL_EMAIL = 'email';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() {
  }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, user);
  }

  public getUser(): any {
    return sessionStorage.getItem(USER_KEY);
  }

  public saveUserRole(role): void {
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, role);
  }

  public getUserRole(): any {
    return sessionStorage.getItem(AUTHORITIES_KEY);
  }

  public setSocialUser(socialUser: any): void {
    window.sessionStorage.setItem(SOCIAL_KEY, socialUser);
  }
  public saveSocialUserEmail(email: any): void {
    window.sessionStorage.setItem(SOCIAL_EMAIL, email);
  }

  public getSocialUser(): any {
    return sessionStorage.getItem(SOCIAL_KEY);
  }
  public getSocialUserEmail(): any {
    return sessionStorage.getItem(SOCIAL_EMAIL);
  }
}
