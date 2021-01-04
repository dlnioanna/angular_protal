import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../services/token-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private role: string;
  showAdminBoard = false;
  showUserBoard = false;
  username: string;
  isLoggedIn = false;

  constructor(public tokenStorageService: TokenStorageService) {
  }

  ngOnInit(): void {
    // this.isLoggedIn = !!this.tokenStorageService.getToken();
    // if (this.isLoggedIn) {
    //   this.role = this.tokenStorageService.getUserRole();
    //   this.username = this.tokenStorageService.getUser();
    //   this.showAdminBoard = this.role === 'ROLE_ADMIN';
    //   this.showUserBoard = this.role === 'ROLE_USER';
    // }
  }

  logout(): void {
    this.tokenStorageService.signOut();
  }

}
