import {Component, OnInit} from '@angular/core';
import {User} from '../models/user';
import {SocialUser} from 'angularx-social-login';
import {UserService} from '../services/user.service';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  form: any = {};
  isSuccessful = false;
  errorMessage = '';
  selectedFile: File;
  editFailed = false;
  user: User;
  userId: any;

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService,
              private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(
      params => {
        this.userId = params.userId;
      });
    this.userService.getUserById(this.userId).subscribe(
      data => {
        this.user = data;
      });
  }


  onEdit(): void {
    const uploadData = new FormData();
    uploadData.append('id', this.user.id.toString());
    uploadData.append('role', this.user.role);
    uploadData.append('username', this.user.username);
    uploadData.append('name', this.user.name);
    uploadData.append('lastName', this.user.lastName);
    uploadData.append('email', this.user.email);
    uploadData.append('telephone', this.user.telephone.toString());
    uploadData.append('password', this.user.password);
    this.httpClient.post('http://localhost:8080/api/v1/editUser', uploadData, {observe: 'response'})
      .subscribe(
        response => {
          this.isSuccessful = true;
        },
        err => {
          this.errorMessage = err.error;
        }
      );
  }

}
