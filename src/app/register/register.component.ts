import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {User} from '../models/user';
import {base64UrlEncode} from 'angular-oauth2-oidc/base64-helper';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  selectedFile: File;

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const uploadData = new FormData();
    if (this.selectedFile) {
      uploadData.append('imageFile', this.selectedFile, this.selectedFile.name);
    }
    uploadData.append('name', this.form.name);
    uploadData.append('lastName', this.form.lastName);
    uploadData.append('telephone', this.form.telephone);
    uploadData.append('email', this.form.email);
    uploadData.append('username', this.form.username);
    uploadData.append('password', this.form.password);
    this.httpClient.post('http://localhost:8080/register', uploadData, {observe: 'response'})
      .subscribe(
        response => {
          this.isSuccessful = true;
          this.isSignUpFailed = false;
        },
        err => {
          this.errorMessage = err.errorMessage;
          this.isSignUpFailed = true;
        }
      );
  }

  public onFileChanged(event): void {
    this.selectedFile = event.target.files[0];
  }

}
