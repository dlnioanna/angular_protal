import {Component, OnInit} from '@angular/core';
import {SocialAuthService, SocialUser} from 'angularx-social-login';
import {GoogleLoginProvider} from 'angularx-social-login';
import {Token} from '@angular/compiler';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {faGoogle} from '@fortawesome/free-brands-svg-icons/faGoogle';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  user: SocialUser;
  GoogleLoginProvider = GoogleLoginProvider;
  token: string;
  formGroup: FormGroup;
  faGoogle = faGoogle;

  constructor(public socialAuthService: SocialAuthService, public authService: AuthService ) {
  }

  ngOnInit(): void {
    this.initForm();
    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
    });
  }

  signInWithGoogle(): void {
    // let promise = new Promise((resolve=>, reject));
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  refreshGoogleToken(): void {
    this.socialAuthService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.socialAuthService.signOut();
  }

  // tslint:disable-next-line:typedef
  initForm() {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }


  loginProccess(): void {
    if (this.formGroup.valid) {
      this.authService.login(this.formGroup.value)
        .subscribe(result => {
          if (result.success) {
            console.log(result);
            alert(result.message);
          } else {
            alert(result.message);
          }
        });
    }
  }
}
