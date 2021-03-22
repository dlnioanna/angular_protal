import {Component, OnInit} from '@angular/core';
import {SocialAuthService, SocialUser} from 'angularx-social-login';
import {AuthService} from '../services/auth.service';
import {TokenStorageService} from '../services/token-storage.service';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {User} from '../models/user';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  selectedFile: File;
  isLoggedIn = false;
  uploadNewImage = false;
  username: string;
  user: User;
  socialUser: SocialUser;
  token: string;

  constructor(private socialAuthService: SocialAuthService, private authService: AuthService,
              private tokenStorage: TokenStorageService, private userService: UserService,
              private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    if (this.tokenStorage.getSocialUser()) {
      this.socialUser = JSON.parse(this.tokenStorage.getSocialUser());
    } else {
      this.userService.getUserByUsername(this.tokenStorage.getUser()).subscribe(
        user => {
          this.user = user;
        });
    }
  }


  onEdit(): void {
    const uploadData = new FormData();
    if (this.uploadNewImage) {
      uploadData.append('imageFile', this.selectedFile, this.selectedFile.name);
    } else {
      uploadData.append('imageFile', this.user.image);
    }
    uploadData.append('id', this.user.id.toString());
    uploadData.append('name', this.user.name);
    uploadData.append('lastName', this.user.lastName);
    uploadData.append('telephone', this.user.telephone.toString());
    uploadData.append('password', this.user.password);
    this.httpClient.post('http://localhost:8080/api/v1/updateUserData', uploadData, {observe: 'response'})
      .subscribe(
        response => {
          this.isSuccessful = true;
          this.isSignUpFailed = false;
          window.location.reload();
        },
        err => {
          this.errorMessage = err.error;
          this.isSignUpFailed = true;
        }
      );
    this.userService.getUserByUsername(this.tokenStorage.getUser()).subscribe(
      user => {
        this.user = user;
      });
  }


  signOut(): void {
    this.socialAuthService.signOut();
    this.tokenStorage.signOut();
    this.isLoggedIn = false;
  }

  public onFileChanged(event): void {
    this.uploadNewImage = true;
    this.selectedFile = event.target.files[0];
  }
}
