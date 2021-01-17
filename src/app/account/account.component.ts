import {Component, OnInit} from '@angular/core';
import {SocialAuthService, SocialUser} from 'angularx-social-login';
import {AuthService} from '../services/auth.service';
import {TokenStorageService} from '../services/token-storage.service';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {User} from '../models/user';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  errorMessage = '';
  role: string;
  headerToken: string;
  username: string;
  user: User;
  socialUser: SocialUser;
  token: string;
  selectedFile: File;

  constructor(private socialAuthService: SocialAuthService, private authService: AuthService,
              private tokenStorage: TokenStorageService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((socialUser) => {
      this.socialUser = socialUser;
    });
    this.userService.getUserByUsername(this.username).subscribe(
      user => {
        this.user = user;
      });
  }


  onEdit(): void {
    // const uploadData = new FormData();
    // if (this.selectedFile) {
    //   uploadData.append('imageFile', this.selectedFile, this.selectedFile.name);
    // }
    // uploadData.append('name', this.form.name);
    // uploadData.append('lastName', this.form.lastName);
    // uploadData.append('telephone', this.form.telephone);
    // uploadData.append('email', this.form.email);
    // uploadData.append('username', this.form.username);
    // uploadData.append('password', this.form.password);
    // this.httpClient.post('http://localhost:8080/register', uploadData, {observe: 'response'})
    //   .subscribe(
    //     response => {
    //       this.isSuccessful = true;
    //       this.isSignUpFailed = false;
    //     },
    //     err => {
    //       this.errorMessage = err.errorMessage;
    //       this.isSignUpFailed = true;
    //     }
    //   );
  }


  signOut(): void {
    this.socialAuthService.signOut();
    this.tokenStorage.signOut();
    this.isLoggedIn = false;
  }

  public onFileChanged(event): void {
    this.selectedFile = event.target.files[0];
  }
}
