import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../services/token-storage.service';
import {Router} from '@angular/router';
import {SocialAuthService, SocialUser} from 'angularx-social-login';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  role: string;
  showAdminBoard = false;
  showUserBoard = false;
  username: string;
  isLoggedIn = false;
  socialUser: SocialUser;

  constructor(public tokenStorageService: TokenStorageService, private socialAuthService: SocialAuthService,
              private router: Router) {
  }

  ngOnInit(): void {}

  logout(): void {
    this.tokenStorageService.signOut();
    if (this.socialUser) {
      this.socialAuthService.signOut();
      this.isLoggedIn = false;
      this.socialUser = null;
    }
    this.router.navigate(['/index']);
  }
}
