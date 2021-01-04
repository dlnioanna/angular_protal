import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {User} from '../models/user';

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
  user: User;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const uploadImageData = new FormData();
    uploadImageData.append('image', this.selectedFile, this.selectedFile.name);
    this.authService.register(this.form, uploadImageData).subscribe(
      response => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        console.log(response);
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
