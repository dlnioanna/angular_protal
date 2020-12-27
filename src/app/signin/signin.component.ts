import {Component, OnInit} from '@angular/core';
import {SocialAuthService, SocialUser} from 'angularx-social-login';
import {GoogleLoginProvider} from 'angularx-social-login';
import {Token} from '@angular/compiler';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {faGoogle} from '@fortawesome/free-brands-svg-icons/faGoogle';
import {Router} from '@angular/router';
import {TokenStorageService} from '../services/token-storage.service';

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


  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[];

  constructor(private socialAuthService: SocialAuthService,
              private authService: AuthService,
              private router: Router,
              private formBuilder: FormBuilder,
              private tokenStorage: TokenStorageService) {
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
    });
    this.formGroup = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.authService.login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.reloadPage();
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
    // let promise = new Promise((resolve=>, reject));
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  refreshGoogleToken(): void {
    this.socialAuthService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.socialAuthService.signOut();
  }


  loginForm(): any {
    const val = this.formGroup.value;
    if (val.email && val.password) {
      this.authService.loginForm(val.email, val.password)
        .subscribe(
          () => this.router.navigateByUrl('/'));
    }
  }
}
